import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { Debt, DebtMetrics, calculateDebtMetrics, validateDebt } from '../utils/debtCalculations';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { DEMO_DATA, calculateDemoMetrics } from '../utils/demoData';
import { toast } from 'sonner@2.0.3';

export interface CloudDebtStoreState {
  debts: Debt[];
  metrics: DebtMetrics;
  isLoading: boolean;
  isSyncing: boolean;
  error: string | null;
  lastSyncTime: Date;
  hasUnsyncedChanges: boolean;
}

export interface CloudDebtStoreActions {
  addDebt: (debt: Omit<Debt, 'id'>) => Promise<boolean>;
  updateDebt: (id: string, debt: Partial<Debt>) => Promise<boolean>;
  deleteDebt: (id: string) => Promise<boolean>;
  addPayment: (debtId: string, amount: number, date?: Date) => Promise<boolean>;
  syncWithCloud: () => Promise<void>;
  importLocalData: (localDebts: any[]) => Promise<boolean>;
  exportData: () => void;
  clearError: () => void;
}

const LOCAL_STORAGE_KEY = 'crushDebtsLocal';
const LAST_SYNC_KEY = 'crushLastCloudSync';

export const useCloudDebtStore = (): [CloudDebtStoreState, CloudDebtStoreActions] => {
  const [authState] = useAuth();
  const isDemoMode = localStorage.getItem('crushDemoMode') === 'true';
  
  const [state, setState] = useState<CloudDebtStoreState>({
    debts: [],
    metrics: calculateDebtMetrics([]),
    isLoading: false,
    isSyncing: false,
    error: null,
    lastSyncTime: new Date(),
    hasUnsyncedChanges: false
  });

  // API helper function
  const apiCall = useCallback(async (endpoint: string, options: RequestInit = {}) => {
    if (!authState.session?.access_token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e41c7639${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authState.session.access_token}`,
        ...options.headers
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API call failed: ${response.status}`);
    }

    return response.json();
  }, [authState.session?.access_token]);

  // Load debts from cloud
  const loadDebtsFromCloud = useCallback(async () => {
    if (!authState.isAuthenticated) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const data = await apiCall('/debts');
      const cloudDebts = data.debts.map((debt: any) => ({
        id: debt.id,
        name: debt.name,
        type: debt.type,
        remaining: debt.remaining,
        original: debt.original,
        monthlyPayment: debt.monthly_payment,
        interestRate: debt.interest_rate,
        nextPayment: debt.next_payment,
        color: debt.color
      }));

      const metrics = calculateDebtMetrics(cloudDebts);
      setState(prev => ({
        ...prev,
        debts: cloudDebts,
        metrics,
        isLoading: false,
        lastSyncTime: new Date(),
        hasUnsyncedChanges: false
      }));

      localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
    } catch (error: any) {
      console.error('Failed to load debts from cloud:', error);
      setState(prev => ({
        ...prev,
        error: error.message,
        isLoading: false
      }));

      // Try to load from local storage as fallback
      await loadLocalBackup();
    }
  }, [authState.isAuthenticated, apiCall]);

  // Load local backup data
  const loadLocalBackup = useCallback(async () => {
    try {
      const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (localData) {
        const debts = JSON.parse(localData);
        const metrics = calculateDebtMetrics(debts);
        setState(prev => ({
          ...prev,
          debts,
          metrics,
          isLoading: false,
          hasUnsyncedChanges: true
        }));
        toast.warning('Loaded local backup data. Sync when online.');
      }
    } catch (error) {
      console.error('Failed to load local backup:', error);
    }
  }, []);

  // Save local backup
  const saveLocalBackup = useCallback((debts: Debt[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(debts));
    } catch (error) {
      console.error('Failed to save local backup:', error);
    }
  }, []);

  // Update state and backup locally
  const updateDebtsState = useCallback((newDebts: Debt[], hasUnsyncedChanges = true) => {
    const metrics = calculateDebtMetrics(newDebts);
    setState(prev => ({
      ...prev,
      debts: newDebts,
      metrics,
      isLoading: false,
      hasUnsyncedChanges
    }));
    saveLocalBackup(newDebts);
  }, [saveLocalBackup]);

  // Add debt
  const addDebt = useCallback(async (debtData: Omit<Debt, 'id'>): Promise<boolean> => {
    // Block modifications in demo mode
    if (isDemoMode) {
      toast.error('Cannot modify debts in demo mode. Disable demo mode to add real debts.');
      return false;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const validation = validateDebt(debtData);
      if (!validation.isValid) {
        throw new Error(validation.errors[0]);
      }

      if (authState.isAuthenticated) {
        const response = await apiCall('/debts', {
          method: 'POST',
          body: JSON.stringify({
            name: debtData.name,
            type: debtData.type,
            remaining: debtData.remaining,
            original: debtData.original,
            monthly_payment: debtData.monthlyPayment,
            interest_rate: debtData.interestRate,
            next_payment: debtData.nextPayment,
            color: debtData.color
          })
        });

        const newDebt: Debt = {
          id: response.debt.id,
          name: response.debt.name,
          type: response.debt.type,
          remaining: response.debt.remaining,
          original: response.debt.original,
          monthlyPayment: response.debt.monthly_payment,
          interestRate: response.debt.interest_rate,
          nextPayment: response.debt.next_payment,
          color: response.debt.color
        };

        updateDebtsState([...state.debts, newDebt], false);
        toast.success(`${newDebt.name} added successfully!`);
      } else {
        // Offline mode - add locally
        const newDebt: Debt = {
          ...debtData,
          id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        };
        updateDebtsState([...state.debts, newDebt], true);
        toast.success(`${newDebt.name} added locally. Will sync when online.`);
      }

      return true;
    } catch (error: any) {
      console.error('Failed to add debt:', error);
      setState(prev => ({
        ...prev,
        error: error.message,
        isLoading: false
      }));
      toast.error(error.message);
      return false;
    }
  }, [state.debts, authState.isAuthenticated, apiCall, updateDebtsState]);

  // Update debt
  const updateDebt = useCallback(async (id: string, updates: Partial<Debt>): Promise<boolean> => {
    // Block modifications in demo mode
    if (isDemoMode) {
      toast.error('Cannot modify debts in demo mode. Disable demo mode to edit real debts.');
      return false;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const debtIndex = state.debts.findIndex(debt => debt.id === id);
      if (debtIndex === -1) {
        throw new Error('Debt not found');
      }

      const updatedDebt = { ...state.debts[debtIndex], ...updates };
      const validation = validateDebt(updatedDebt);
      if (!validation.isValid) {
        throw new Error(validation.errors[0]);
      }

      if (authState.isAuthenticated && !id.startsWith('local_')) {
        await apiCall(`/debts/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            name: updatedDebt.name,
            type: updatedDebt.type,
            remaining: updatedDebt.remaining,
            original: updatedDebt.original,
            monthly_payment: updatedDebt.monthlyPayment,
            interest_rate: updatedDebt.interestRate,
            next_payment: updatedDebt.nextPayment,
            color: updatedDebt.color
          })
        });
      }

      const newDebts = [...state.debts];
      newDebts[debtIndex] = updatedDebt;
      updateDebtsState(newDebts, !authState.isAuthenticated || id.startsWith('local_'));
      toast.success(`${updatedDebt.name} updated successfully!`);
      return true;
    } catch (error: any) {
      console.error('Failed to update debt:', error);
      setState(prev => ({
        ...prev,
        error: error.message,
        isLoading: false
      }));
      toast.error(error.message);
      return false;
    }
  }, [state.debts, authState.isAuthenticated, apiCall, updateDebtsState]);

  // Delete debt
  const deleteDebt = useCallback(async (id: string): Promise<boolean> => {
    // Block modifications in demo mode
    if (isDemoMode) {
      toast.error('Cannot delete debts in demo mode. Disable demo mode to delete real debts.');
      return false;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const debtToDelete = state.debts.find(debt => debt.id === id);
      if (!debtToDelete) {
        throw new Error('Debt not found');
      }

      if (authState.isAuthenticated && !id.startsWith('local_')) {
        await apiCall(`/debts/${id}`, { method: 'DELETE' });
      }

      const newDebts = state.debts.filter(debt => debt.id !== id);
      updateDebtsState(newDebts, !authState.isAuthenticated || id.startsWith('local_'));
      toast.success(`${debtToDelete.name} deleted successfully!`);
      return true;
    } catch (error: any) {
      console.error('Failed to delete debt:', error);
      setState(prev => ({
        ...prev,
        error: error.message,
        isLoading: false
      }));
      toast.error(error.message);
      return false;
    }
  }, [state.debts, authState.isAuthenticated, apiCall, updateDebtsState]);

  // Add payment
  const addPayment = useCallback(async (debtId: string, amount: number, date: Date = new Date()): Promise<boolean> => {
    // Allow payments in demo mode but show different message
    if (isDemoMode) {
      toast.success('Demo payment added! (This is just for demonstration)');
      return true;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      if (amount <= 0) {
        throw new Error('Payment amount must be greater than zero');
      }

      const debtIndex = state.debts.findIndex(debt => debt.id === debtId);
      if (debtIndex === -1) {
        throw new Error('Debt not found');
      }

      const debt = state.debts[debtIndex];
      const newRemaining = Math.max(0, debt.remaining - amount);

      if (authState.isAuthenticated && !debtId.startsWith('local_')) {
        await apiCall('/payments', {
          method: 'POST',
          body: JSON.stringify({
            debt_id: debtId,
            amount,
            payment_date: date.toISOString(),
            payment_type: 'manual'
          })
        });
      }

      const newDebts = [...state.debts];
      newDebts[debtIndex] = { ...debt, remaining: newRemaining };
      updateDebtsState(newDebts, !authState.isAuthenticated || debtId.startsWith('local_'));

      if (newRemaining === 0) {
        toast.success(`🎉 Congratulations! You've paid off ${debt.name}!`);
      } else {
        toast.success(`$${amount} payment added to ${debt.name}`);
      }
      return true;
    } catch (error: any) {
      console.error('Failed to add payment:', error);
      setState(prev => ({
        ...prev,
        error: error.message,
        isLoading: false
      }));
      toast.error(error.message);
      return false;
    }
  }, [state.debts, authState.isAuthenticated, apiCall, updateDebtsState]);

  // Sync with cloud
  const syncWithCloud = useCallback(async () => {
    if (!authState.isAuthenticated) {
      toast.error('Sign in to sync your data');
      return;
    }

    setState(prev => ({ ...prev, isSyncing: true, error: null }));

    try {
      await loadDebtsFromCloud();
      toast.success('Data synced successfully!');
    } catch (error: any) {
      console.error('Sync failed:', error);
      setState(prev => ({
        ...prev,
        error: error.message,
        isSyncing: false
      }));
      toast.error('Failed to sync data');
    } finally {
      setState(prev => ({ ...prev, isSyncing: false }));
    }
  }, [authState.isAuthenticated, loadDebtsFromCloud]);

  // Import local data to cloud
  const importLocalData = useCallback(async (localDebts: any[]): Promise<boolean> => {
    if (!authState.isAuthenticated) {
      toast.error('Sign in to import data');
      return false;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      await apiCall('/sync/import', {
        method: 'POST',
        body: JSON.stringify({ debts: localDebts })
      });

      // Reload from cloud to get the imported data
      await loadDebtsFromCloud();
      toast.success('Local data imported successfully!');
      return true;
    } catch (error: any) {
      console.error('Failed to import local data:', error);
      setState(prev => ({
        ...prev,
        error: error.message,
        isLoading: false
      }));
      toast.error('Failed to import local data');
      return false;
    }
  }, [authState.isAuthenticated, apiCall, loadDebtsFromCloud]);

  // Export data
  const exportData = useCallback(() => {
    try {
      const data = {
        debts: state.debts,
        metrics: state.metrics,
        exportDate: new Date().toISOString(),
        version: '2.0'
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `crush-debt-data-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success('Data exported successfully!');
    } catch (error) {
      console.error('Failed to export data:', error);
      toast.error('Failed to export data');
    }
  }, [state.debts, state.metrics]);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Load demo data if demo mode is enabled
  const loadDemoData = useCallback(() => {
    const demoDebts = DEMO_DATA.debts.map(debt => ({
      id: debt.id,
      name: debt.name,
      type: debt.type,
      remaining: debt.remaining,
      original: debt.original,
      monthlyPayment: debt.monthlyPayment,
      interestRate: debt.interestRate,
      nextPayment: debt.nextPayment,
      color: debt.color
    }));
    
    const metrics = calculateDemoMetrics(DEMO_DATA.debts);
    setState(prev => ({
      ...prev,
      debts: demoDebts,
      metrics: {
        totalDebt: metrics.totalDebt,
        totalOriginal: metrics.totalOriginal,
        totalPaid: metrics.totalPaid,
        totalMonthlyPayments: metrics.totalMonthlyPayments,
        overallProgress: metrics.overallProgress,
        avgInterestRate: metrics.avgInterestRate,
        totalInterest: metrics.totalInterest
      },
      isLoading: false,
      hasUnsyncedChanges: false
    }));
  }, []);

  // Load data when authenticated or demo mode changes
  useEffect(() => {
    if (isDemoMode) {
      loadDemoData();
    } else if (authState.isAuthenticated) {
      loadDebtsFromCloud();
    } else {
      loadLocalBackup();
    }
  }, [isDemoMode, authState.isAuthenticated, loadDemoData, loadDebtsFromCloud, loadLocalBackup]);

  // Auto-sync periodically when online
  useEffect(() => {
    if (!authState.isAuthenticated || !navigator.onLine) return;

    const syncInterval = setInterval(() => {
      if (state.hasUnsyncedChanges) {
        syncWithCloud();
      }
    }, 30000); // Sync every 30 seconds if there are changes

    return () => clearInterval(syncInterval);
  }, [authState.isAuthenticated, state.hasUnsyncedChanges, syncWithCloud]);

  return [
    state,
    {
      addDebt,
      updateDebt,
      deleteDebt,
      addPayment,
      syncWithCloud,
      importLocalData,
      exportData,
      clearError
    }
  ];
};
import { useState, useEffect, useCallback } from 'react';
import { Debt, DebtMetrics, calculateDebtMetrics, validateDebt } from '../utils/debtCalculations';
import { toast } from 'sonner@2.0.3';

export interface DebtStoreState {
  debts: Debt[];
  metrics: DebtMetrics;
  isLoading: boolean;
  error: string | null;
  lastSyncTime: Date;
}

export interface DebtStoreActions {
  addDebt: (debt: Omit<Debt, 'id'>) => Promise<boolean>;
  updateDebt: (id: string, debt: Partial<Debt>) => Promise<boolean>;
  deleteDebt: (id: string) => Promise<boolean>;
  addPayment: (debtId: string, amount: number, date?: Date) => Promise<boolean>;
  loadDebts: () => Promise<void>;
  exportData: () => void;
  clearError: () => void;
}

const STORAGE_KEY = 'crushDebts';
const SYNC_KEY = 'crushLastSync';
const PAYMENT_HISTORY_KEY = 'crushPaymentHistory';

const defaultDebtData: Debt[] = [
  {
    id: '1',
    name: 'Car Dreams',
    type: 'Auto Loan',
    remaining: 18500,
    original: 28500,
    monthlyPayment: 485,
    interestRate: 4.2,
    nextPayment: 'Dec 15',
    color: 'blue'
  },
  {
    id: '2',
    name: 'Wedding Memories',
    type: 'Credit Card',
    remaining: 4250,
    original: 5000,
    monthlyPayment: 125,
    interestRate: 18.9,
    nextPayment: 'Dec 22',
    color: 'red'
  },
  {
    id: '3',
    name: 'Home Improvement',
    type: 'Personal Loan',
    remaining: 2000,
    original: 10000,
    monthlyPayment: 180,
    interestRate: 7.5,
    nextPayment: 'Dec 18',
    color: 'green'
  }
];

export const useDebtStore = (): [DebtStoreState, DebtStoreActions] => {
  const [state, setState] = useState<DebtStoreState>({
    debts: defaultDebtData,
    metrics: calculateDebtMetrics(defaultDebtData),
    isLoading: false,
    error: null,
    lastSyncTime: new Date()
  });

  // Generate unique ID for new debts
  const generateId = useCallback(() => {
    return `debt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Save to localStorage with error handling
  const saveToStorage = useCallback((debts: Debt[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(debts));
      localStorage.setItem(SYNC_KEY, new Date().toISOString());
      
      setState(prev => ({
        ...prev,
        lastSyncTime: new Date(),
        error: null
      }));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      setState(prev => ({
        ...prev,
        error: 'Failed to save data locally'
      }));
      toast.error('Failed to save your data');
    }
  }, []);

  // Update state with new debts and recalculate metrics
  const updateDebtsState = useCallback((newDebts: Debt[]) => {
    const metrics = calculateDebtMetrics(newDebts);
    setState(prev => ({
      ...prev,
      debts: newDebts,
      metrics,
      isLoading: false
    }));
    saveToStorage(newDebts);
  }, [saveToStorage]);

  // Load debts from localStorage
  const loadDebts = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const lastSync = localStorage.getItem(SYNC_KEY);
      
      if (saved) {
        const parsedDebts = JSON.parse(saved) as Debt[];
        
        // Validate the loaded data
        const validDebts = parsedDebts.filter(debt => {
          const validation = validateDebt(debt);
          if (!validation.isValid) {
            console.warn(`Invalid debt data for ${debt.name}:`, validation.errors);
            return false;
          }
          return true;
        });
        
        if (validDebts.length !== parsedDebts.length) {
          toast.warning('Some debt data was corrupted and has been removed');
        }
        
        const metrics = calculateDebtMetrics(validDebts);
        setState(prev => ({
          ...prev,
          debts: validDebts,
          metrics,
          isLoading: false,
          lastSyncTime: lastSync ? new Date(lastSync) : new Date()
        }));
      } else {
        // First time user - use default data
        updateDebtsState(defaultDebtData);
      }
    } catch (error) {
      console.error('Failed to load saved debts:', error);
      setState(prev => ({
        ...prev,
        error: 'Failed to load saved data',
        isLoading: false
      }));
      toast.error('Failed to load your debt data');
      
      // Fallback to default data
      updateDebtsState(defaultDebtData);
    }
  }, [updateDebtsState]);

  // Add new debt
  const addDebt = useCallback(async (debtData: Omit<Debt, 'id'>): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Validate the debt data
      const validation = validateDebt(debtData);
      if (!validation.isValid) {
        setState(prev => ({
          ...prev,
          error: validation.errors.join(', '),
          isLoading: false
        }));
        toast.error(validation.errors[0]);
        return false;
      }
      
      const newDebt: Debt = {
        ...debtData,
        id: generateId()
      };
      
      const newDebts = [...state.debts, newDebt];
      updateDebtsState(newDebts);
      toast.success(`${newDebt.name} added successfully!`);
      return true;
    } catch (error) {
      console.error('Failed to add debt:', error);
      setState(prev => ({
        ...prev,
        error: 'Failed to add debt',
        isLoading: false
      }));
      toast.error('Failed to add debt');
      return false;
    }
  }, [state.debts, generateId, updateDebtsState]);

  // Update existing debt
  const updateDebt = useCallback(async (id: string, updates: Partial<Debt>): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const debtIndex = state.debts.findIndex(debt => debt.id === id);
      if (debtIndex === -1) {
        setState(prev => ({
          ...prev,
          error: 'Debt not found',
          isLoading: false
        }));
        toast.error('Debt not found');
        return false;
      }
      
      const updatedDebt = { ...state.debts[debtIndex], ...updates };
      
      // Validate the updated debt
      const validation = validateDebt(updatedDebt);
      if (!validation.isValid) {
        setState(prev => ({
          ...prev,
          error: validation.errors.join(', '),
          isLoading: false
        }));
        toast.error(validation.errors[0]);
        return false;
      }
      
      const newDebts = [...state.debts];
      newDebts[debtIndex] = updatedDebt;
      updateDebtsState(newDebts);
      toast.success(`${updatedDebt.name} updated successfully!`);
      return true;
    } catch (error) {
      console.error('Failed to update debt:', error);
      setState(prev => ({
        ...prev,
        error: 'Failed to update debt',
        isLoading: false
      }));
      toast.error('Failed to update debt');
      return false;
    }
  }, [state.debts, updateDebtsState]);

  // Delete debt
  const deleteDebt = useCallback(async (id: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const debtToDelete = state.debts.find(debt => debt.id === id);
      if (!debtToDelete) {
        setState(prev => ({
          ...prev,
          error: 'Debt not found',
          isLoading: false
        }));
        toast.error('Debt not found');
        return false;
      }
      
      const newDebts = state.debts.filter(debt => debt.id !== id);
      updateDebtsState(newDebts);
      toast.success(`${debtToDelete.name} deleted successfully!`);
      return true;
    } catch (error) {
      console.error('Failed to delete debt:', error);
      setState(prev => ({
        ...prev,
        error: 'Failed to delete debt',
        isLoading: false
      }));
      toast.error('Failed to delete debt');
      return false;
    }
  }, [state.debts, updateDebtsState]);

  // Add payment to a debt
  const addPayment = useCallback(async (debtId: string, amount: number, date: Date = new Date()): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      if (amount <= 0) {
        setState(prev => ({
          ...prev,
          error: 'Payment amount must be greater than zero',
          isLoading: false
        }));
        toast.error('Payment amount must be greater than zero');
        return false;
      }
      
      const debtIndex = state.debts.findIndex(debt => debt.id === debtId);
      if (debtIndex === -1) {
        setState(prev => ({
          ...prev,
          error: 'Debt not found',
          isLoading: false
        }));
        toast.error('Debt not found');
        return false;
      }
      
      const debt = state.debts[debtIndex];
      const newRemaining = Math.max(0, debt.remaining - amount);
      
      // Store payment history
      try {
        const history = JSON.parse(localStorage.getItem(PAYMENT_HISTORY_KEY) || '[]');
        history.push({
          id: generateId(),
          debtId,
          debtName: debt.name,
          amount,
          date: date.toISOString(),
          previousBalance: debt.remaining,
          newBalance: newRemaining
        });
        localStorage.setItem(PAYMENT_HISTORY_KEY, JSON.stringify(history));
      } catch (historyError) {
        console.warn('Failed to save payment history:', historyError);
      }
      
      const newDebts = [...state.debts];
      newDebts[debtIndex] = { ...debt, remaining: newRemaining };
      updateDebtsState(newDebts);
      
      if (newRemaining === 0) {
        toast.success(`🎉 Congratulations! You've paid off ${debt.name}!`);
      } else {
        toast.success(`$${amount} payment added to ${debt.name}`);
      }
      return true;
    } catch (error) {
      console.error('Failed to add payment:', error);
      setState(prev => ({
        ...prev,
        error: 'Failed to add payment',
        isLoading: false
      }));
      toast.error('Failed to add payment');
      return false;
    }
  }, [state.debts, generateId, updateDebtsState]);

  // Export data
  const exportData = useCallback(() => {
    try {
      const data = {
        debts: state.debts,
        metrics: state.metrics,
        paymentHistory: JSON.parse(localStorage.getItem(PAYMENT_HISTORY_KEY) || '[]'),
        exportDate: new Date().toISOString(),
        version: '1.0'
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

  // Load data on mount
  useEffect(() => {
    loadDebts();
  }, [loadDebts]);

  return [
    state,
    {
      addDebt,
      updateDebt,
      deleteDebt,
      addPayment,
      loadDebts,
      exportData,
      clearError
    }
  ];
};
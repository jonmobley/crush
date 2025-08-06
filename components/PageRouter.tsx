import React from 'react';
import { Dashboard } from './pages/Dashboard';
import { Strategies } from './pages/Strategies';
import { Schedule } from './pages/Schedule';
import { Profile } from './pages/Profile';
import { Analytics } from './pages/Analytics';
import { EditDebt } from './pages/EditDebt';
import { AddNewDebt } from './pages/AddNewDebt';
import { PaymentSimulator } from './pages/PaymentSimulator';
import { ReminderSettings } from './pages/ReminderSettings';
import { AddPayment } from './pages/AddPayment';
import { OnboardingHints, FeatureMarkers } from './onboarding/OnboardingHints';
import { DebtMetrics } from '../utils/debtCalculations';
import { DebtStoreActions } from '../hooks/useDebtStore';

interface PageRouterProps {
  currentPage: string;
  debts: any[];
  metrics: DebtMetrics;
  isLoading: boolean;
  onPageChange: (page: string, debtId?: string) => void;
  onDebtsUpdate: (debts: any[]) => void; // Deprecated - use debtActions instead
  debtActions: DebtStoreActions;
  editingDebtId?: string;
}

export function PageRouter({ 
  currentPage, 
  debts, 
  metrics,
  isLoading,
  onPageChange, 
  debtActions,
  editingDebtId
}: PageRouterProps) {
  const pageProps = {
    debts,
    metrics,
    isLoading,
    onPageChange,
    debtActions
  };

  // Handle add payment page
  if (currentPage === 'add-payment') {
    return (
      <AddPayment
        debts={debts}
        isLoading={isLoading}
        onSave={async (payment) => {
          const success = await debtActions.addPayment(payment.debtId, payment.amount, payment.date);
          if (success) {
            FeatureMarkers.markPaymentAdded();
            onPageChange('dashboard');
          }
        }}
        onCancel={() => onPageChange('dashboard')}
      />
    );
  }

  // Handle reminder settings page
  if (currentPage === 'reminder-settings') {
    return (
      <ReminderSettings
        debts={debts}
        onSave={(settings) => {
          // Settings are handled by the component itself via localStorage
          onPageChange('profile');
        }}
        onCancel={() => onPageChange('profile')}
      />
    );
  }

  // Handle payment simulator page
  if (currentPage === 'payment-simulator') {
    // Mark simulator as used for onboarding hints
    FeatureMarkers.markSimulatorUsed();
    
    return (
      <>
        <OnboardingHints page={currentPage} debts={debts} onPageChange={onPageChange} />
        <PaymentSimulator
          debts={debts}
          onApplyPlan={(strategy, extraPayment, debtOrder) => {
            // In a real implementation, this would apply the strategy
            // For now, just show success and return to strategies
            onPageChange('strategies');
          }}
          onCancel={() => onPageChange('strategies')}
        />
      </>
    );
  }

  // Handle add new debt page
  if (currentPage === 'add-new-debt') {
    return (
      <AddNewDebt
        isLoading={isLoading}
        onSave={async (newDebt) => {
          const success = await debtActions.addDebt(newDebt);
          if (success) {
            onPageChange('dashboard');
          }
        }}
        onCancel={() => onPageChange('dashboard')}
      />
    );
  }

  // Handle edit debt page
  if (currentPage === 'edit-debt' && editingDebtId) {
    const debtToEdit = debts.find(debt => debt.id === editingDebtId);
    
    if (debtToEdit) {
      return (
        <EditDebt
          debt={debtToEdit}
          isLoading={isLoading}
          onSave={async (updatedDebt) => {
            const success = await debtActions.updateDebt(updatedDebt.id, updatedDebt);
            if (success) {
              onPageChange('dashboard');
            }
          }}
          onDelete={async (debtId) => {
            const success = await debtActions.deleteDebt(debtId);
            if (success) {
              onPageChange('dashboard');
            }
          }}
          onCancel={() => onPageChange('dashboard')}
        />
      );
    } else {
      // Debt not found, redirect to dashboard
      onPageChange('dashboard');
      return null;
    }
  }

  switch (currentPage) {
    case 'dashboard':
      return (
        <>
          <OnboardingHints page={currentPage} debts={debts} onPageChange={onPageChange} />
          <Dashboard {...pageProps} />
        </>
      );
    case 'strategies':
      FeatureMarkers.markStrategiesViewed();
      return (
        <>
          <OnboardingHints page={currentPage} debts={debts} onPageChange={onPageChange} />
          <Strategies {...pageProps} />
        </>
      );
    case 'schedule':
      return (
        <>
          <OnboardingHints page={currentPage} debts={debts} onPageChange={onPageChange} />
          <Schedule {...pageProps} />
        </>
      );
    case 'analytics':
      FeatureMarkers.markAnalyticsViewed();
      return (
        <>
          <OnboardingHints page={currentPage} debts={debts} onPageChange={onPageChange} />
          <Analytics {...pageProps} />
        </>
      );
    case 'profile':
      return <Profile {...pageProps} />;
    default:
      return (
        <>
          <OnboardingHints page="dashboard" debts={debts} onPageChange={onPageChange} />
          <Dashboard {...pageProps} />
        </>
      );
  }
}
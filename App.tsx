import React, { useState, useEffect, Suspense } from 'react';
import svgPaths from "./imports/svg-yz7hb5e6vm";
import { Button } from "./components/ui/button";
import { Progress } from "./components/ui/progress";
import { Badge } from "./components/ui/badge";
import { LoadingOverlay, LoadingSpinner, SkeletonCard } from "./components/ui/loading";
import { PageRouter } from "./components/PageRouter";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AuthForm } from "./components/auth/AuthForm";
import { OnboardingFlow } from "./components/onboarding/OnboardingFlow";
import { GuidedDebtSetup } from "./components/onboarding/GuidedDebtSetup";
import { FirstDebtCelebration } from "./components/onboarding/FirstDebtCelebration";
import { FeatureTour } from "./components/onboarding/FeatureTour";
import { useAuth } from "./hooks/useAuth";
import { useCloudDebtStore } from "./hooks/useCloudDebtStore";
import { getPageConfig, NAVIGATION_TABS, PWA_ACTIONS } from "./utils/pageConfig";
import { formatPayoffTime, calculatePayoffMonths } from "./utils/debtCalculations";
import { 
  Calendar, Bell, Settings, Home, TrendingUp, User, WifiOff, CheckCircle, 
  AlertCircle, Cloud, CloudOff, RefreshCw, LogOut, Upload, PlayCircle
} from "lucide-react";
import { toast } from 'sonner@2.0.3';

export default function App() {
  const [authState, authActions] = useAuth();
  const [debtState, debtActions] = useCloudDebtStore();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [editingDebtId, setEditingDebtId] = useState<string | undefined>();
  const [isOnline, setIsOnline] = useState(navigator.onlineStatus);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [showMigrationPrompt, setShowMigrationPrompt] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showGuidedSetup, setShowGuidedSetup] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showFeatureTour, setShowFeatureTour] = useState(false);
  const [celebrationDebtName, setCelebrationDebtName] = useState('');
  const isDemoMode = localStorage.getItem('crushDemoMode') === 'true';

  const pageConfig = getPageConfig(currentPage);

  // Check for local data that needs migration
  useEffect(() => {
    const hasLocalData = localStorage.getItem('crushDebts');
    if (authState.isAuthenticated && hasLocalData && !showMigrationPrompt) {
      setShowMigrationPrompt(true);
    }
  }, [authState.isAuthenticated, showMigrationPrompt]);

  // Check for first-time user experience
  useEffect(() => {
    const onboardingCompleted = localStorage.getItem('crushOnboardingCompleted');
    const hasDebts = debtState.debts.length > 0;
    const isDemo = localStorage.getItem('crushDemoMode') === 'true';
    
    // Show onboarding for truly new users (no demo mode, no debts, no completion flag)
    // Don't show if any onboarding flow is already active
    if (!onboardingCompleted && !hasDebts && !isDemo && 
        !showOnboarding && !showGuidedSetup && !showCelebration && !showFeatureTour) {
      setShowOnboarding(true);
    }
  }, [debtState.debts.length, showOnboarding, showGuidedSetup, showCelebration, showFeatureTour]);

  // PWA and offline functionality
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (authState.isAuthenticated && debtState.hasUnsyncedChanges) {
        debtActions.syncWithCloud();
      }
    };
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [authState.isAuthenticated, debtState.hasUnsyncedChanges, debtActions]);

  // Handle PWA shortcuts and URL actions
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');
    
    if (action && PWA_ACTIONS[action as keyof typeof PWA_ACTIONS]) {
      setCurrentPage(PWA_ACTIONS[action as keyof typeof PWA_ACTIONS]);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const handlePageChange = (page: string, debtId?: string) => {
    if (debtState.error) {
      debtActions.clearError();
    }
    
    setCurrentPage(page);
    if (page === 'edit-debt' && debtId) {
      setEditingDebtId(debtId);
    } else {
      setEditingDebtId(undefined);
    }
  };

  const handleMigrateLocalData = async () => {
    try {
      const localData = localStorage.getItem('crushDebts');
      if (localData) {
        const debts = JSON.parse(localData);
        const success = await debtActions.importLocalData(debts);
        if (success) {
          localStorage.removeItem('crushDebts');
          setShowMigrationPrompt(false);
          toast.success('Your local data has been migrated to the cloud!');
        }
      }
    } catch (error) {
      console.error('Migration failed:', error);
      toast.error('Failed to migrate local data');
    }
  };

  // Onboarding handlers
  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setShowGuidedSetup(true);
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
    localStorage.setItem('crushOnboardingCompleted', 'true');
  };

  const handleGuidedSetupComplete = async (debtData: any) => {
    const success = await debtActions.addDebt(debtData);
    if (success) {
      setShowGuidedSetup(false);
      setCelebrationDebtName(debtData.name);
      setShowCelebration(true);
    }
  };

  const handleGuidedSetupBack = () => {
    setShowGuidedSetup(false);
    setShowOnboarding(true);
  };

  const handleCelebrationExplore = () => {
    setShowCelebration(false);
    setShowFeatureTour(true);
  };

  const handleCelebrationDashboard = () => {
    setShowCelebration(false);
    setCurrentPage('dashboard');
  };

  const handleFeatureTourComplete = () => {
    setShowFeatureTour(false);
    setCurrentPage('dashboard');
  };

  const handleFeatureTourSkip = () => {
    setShowFeatureTour(false);
    setCurrentPage('dashboard');
  };

  // Helper function to restart onboarding (used by dashboard "Get Started" button)
  const restartOnboarding = () => {
    // Clear all onboarding state
    localStorage.removeItem('crushOnboardingCompleted');
    localStorage.removeItem('crushDemoMode');
    localStorage.removeItem('crushPreferredStrategy');
    
    // Reset all onboarding flow states
    setShowOnboarding(false);
    setShowGuidedSetup(false);
    setShowCelebration(false);
    setShowFeatureTour(false);
    
    // Trigger onboarding detection
    setTimeout(() => {
      setShowOnboarding(true);
    }, 100);
  };

  const calculateOverallPayoffTime = () => {
    if (debtState.debts.length === 0) return '0';
    
    const payoffMonths = Math.max(...debtState.debts.map(calculatePayoffMonths));
    return formatPayoffTime(payoffMonths);
  };

  const getConnectionStatus = () => {
    if (!authState.isAuthenticated) return { icon: CloudOff, text: 'Local Only', color: 'text-gray-500' };
    if (!isOnline) return { icon: WifiOff, text: 'Offline', color: 'text-amber-500' };
    if (debtState.isSyncing) return { icon: RefreshCw, text: 'Syncing...', color: 'text-blue-500' };
    if (debtState.hasUnsyncedChanges) return { icon: Upload, text: 'Pending Sync', color: 'text-orange-500' };
    return { icon: Cloud, text: 'Synced', color: 'text-green-500' };
  };

  const renderMigrationPrompt = () => {
    if (!showMigrationPrompt) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-background rounded-lg p-6 max-w-md w-full">
          <div className="text-center mb-4">
            <Upload className="w-12 h-12 text-blue-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground">Migrate Your Data</h3>
            <p className="text-muted-foreground text-sm mt-2">
              We found local debt data on this device. Would you like to migrate it to your cloud account?
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowMigrationPrompt(false)}
              className="flex-1"
            >
              Skip
            </Button>
            <Button
              onClick={handleMigrateLocalData}
              className="flex-1 bg-[#667eea] hover:bg-[#5a6fd8] text-white"
              disabled={debtState.isLoading}
            >
              {debtState.isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
              Migrate
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderHeader = () => {
    if (!pageConfig.hasHeader) return null;

    const { totalDebt, overallProgress, totalPaid, totalMonthlyPayments, totalOriginal } = debtState.metrics;
    const isDashboard = currentPage === 'dashboard';

    // Calculate milestone celebrations for Dashboard
    const getMilestoneMessage = () => {
      if (overallProgress >= 75) return { message: "Almost there! 🏁", color: "text-purple-200" };
      if (overallProgress >= 50) return { message: "Halfway point! 🎯", color: "text-blue-200" };
      if (overallProgress >= 25) return { message: "Great momentum! 🚀", color: "text-green-200" };
      if (overallProgress >= 10) return { message: "Building progress! 💪", color: "text-orange-200" };
      return { message: "Getting started! ⭐", color: "text-gray-200" };
    };

    const milestone = getMilestoneMessage();

    return (
      <div className={`bg-gradient-to-r from-[#667eea] to-[#764ba2] ${isDashboard ? 'min-h-[180px]' : 'min-h-[100px]'} relative overflow-hidden pt-safe`}>
        {/* Enhanced background decoration for Dashboard */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-6 w-6 h-6 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 left-8 w-4 h-4 bg-white rounded-full animate-pulse delay-1000"></div>
          {isDashboard && (
            <>
              <div className="absolute top-8 left-12 w-3 h-3 bg-white rounded-full animate-pulse delay-500"></div>
              <div className="absolute bottom-8 right-12 w-5 h-5 bg-white rounded-full animate-pulse delay-1500"></div>
            </>
          )}
        </div>
        
        <div className={`px-4 ${isDashboard ? 'py-6' : 'py-4'} h-full flex flex-col justify-center`}>
          {/* Clean header with app name and demo indicator */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <h1 className="text-white font-bold text-lg">Crush</h1>
            {isDemoMode && (
              <Badge className="bg-white/20 text-white border-white/30 text-xs">
                <PlayCircle className="w-3 h-3 mr-1" />
                Demo
              </Badge>
            )}
          </div>
          
          <LoadingOverlay isLoading={debtState.isLoading} loadingText="Loading...">
            <div className="text-center">
              {totalDebt > 0 && (
                <div className="space-y-3">
                  {/* Main debt amount */}
                  <div>
                    <h2 className="text-white text-2xl font-bold leading-none mb-1">
                      ${totalDebt.toLocaleString()}
                    </h2>
                    <p className="text-white/80 text-sm">
                      Free in {calculateOverallPayoffTime()}
                    </p>
                  </div>

                  {/* Enhanced progress section for Dashboard only */}
                  {isDashboard ? (
                    <div className="space-y-3">
                      {/* Milestone badge */}
                      <div className="flex justify-center">
                        <Badge className={`bg-white/20 text-white border-white/30 text-sm px-3 py-1 ${milestone.color}`}>
                          {milestone.message}
                        </Badge>
                      </div>

                      {/* Main progress bar */}
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-32 flex-shrink-0">
                          <Progress 
                            value={overallProgress} 
                            className="h-2 bg-white/20"
                            aria-label={`${overallProgress.toFixed(0)}% complete`}
                          />
                        </div>
                        <span className="text-white text-sm font-semibold">
                          {overallProgress.toFixed(0)}%
                        </span>
                      </div>

                      {/* Financial breakdown */}
                      <div className="grid grid-cols-3 gap-4 pt-2">
                        <div className="text-center">
                          <p className="text-white/70 text-xs mb-1">Paid Off</p>
                          <p className="text-white font-semibold text-sm">
                            ${totalPaid.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-white/70 text-xs mb-1">Remaining</p>
                          <p className="text-white font-semibold text-sm">
                            ${totalDebt.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-white/70 text-xs mb-1">Monthly</p>
                          <p className="text-white font-semibold text-sm">
                            ${totalMonthlyPayments.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Simple progress for other pages */
                    <div className="flex items-center justify-center gap-3">
                      <p className="text-white/80 text-xs whitespace-nowrap">
                        {overallProgress.toFixed(0)}% complete
                      </p>
                      <div className="w-16 flex-shrink-0">
                        <Progress 
                          value={overallProgress} 
                          className="h-1 bg-white/20"
                          aria-label={`${overallProgress.toFixed(0)}% complete`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </LoadingOverlay>
        </div>
      </div>
    );
  };

  const renderBottomNav = () => {
    if (!pageConfig.hasFooter) return null;

    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border safe-area-pb z-40">
        <div className="flex">
          {NAVIGATION_TABS.map(tab => {
            const IconComponent = { Home, TrendingUp, Calendar, User }[tab.icon as 'Home' | 'TrendingUp' | 'Calendar' | 'User'];
            const isActive = currentPage === tab.id;

            return (
              <button
                key={tab.id}
                data-tab={tab.id}
                className={`flex-1 flex flex-col items-center justify-center py-2 px-1 transition-colors duration-150 ${
                  isActive 
                    ? 'text-[#007AFF]' // Apple blue
                    : 'text-muted-foreground'
                }`}
                onClick={() => handlePageChange(tab.id)}
                aria-label={`Navigate to ${tab.label}`}
              >
                <IconComponent className={`w-6 h-6 mb-1 ${
                  isActive ? 'stroke-[1.5]' : 'stroke-[1.25]'
                }`} />
                <span className={`text-[10px] leading-none ${
                  isActive ? 'font-medium' : 'font-normal'
                }`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  };

  const renderError = () => {
    const error = debtState.error || authState.error;
    if (!error) return null;

    return (
      <div className="mx-4 mb-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-red-800 text-sm font-medium">Error</p>
            <p className="text-red-700 text-xs">{error}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              debtActions.clearError();
              authActions.clearError();
            }}
            className="text-red-500 hover:text-red-700 hover:bg-red-100 h-6 w-6 p-0"
          >
            ×
          </Button>
        </div>
      </div>
    );
  };

  // Show onboarding flows
  if (showOnboarding) {
    return (
      <OnboardingFlow 
        onComplete={handleOnboardingComplete}
        onSkip={handleOnboardingSkip}
      />
    );
  }

  if (showGuidedSetup) {
    return (
      <GuidedDebtSetup
        onComplete={handleGuidedSetupComplete}
        onBack={handleGuidedSetupBack}
        isFirstDebt={debtState.debts.length === 0}
      />
    );
  }

  // Show auth form if not authenticated and trying to access protected features
  if (!authState.isAuthenticated && showAuthForm) {
    return (
      <AuthForm onComplete={() => setShowAuthForm(false)} />
    );
  }

  return (
    <ErrorBoundary>
      <div className={`min-h-screen bg-background relative ${
        pageConfig.hasBottomPadding ? 'pb-20' : ''
      }`}>
        {renderHeader()}
        {renderError()}
        {renderMigrationPrompt()}
        
        <Suspense 
          fallback={
            <div className="px-4 space-y-4">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          }
        >
          <PageRouter 
            currentPage={currentPage}
            debts={debtState.debts}
            metrics={debtState.metrics}
            isLoading={debtState.isLoading}
            onPageChange={handlePageChange}
            onDebtsUpdate={() => {
              console.warn('Direct debt updates should use cloud debt store actions');
            }}
            debtActions={debtActions}
            editingDebtId={editingDebtId}
          />
        </Suspense>
        
        {renderBottomNav()}

        {/* Onboarding Overlays */}
        {showCelebration && (
          <FirstDebtCelebration
            debtName={celebrationDebtName}
            onExploreFeatures={handleCelebrationExplore}
            onGoToDashboard={handleCelebrationDashboard}
          />
        )}

        {showFeatureTour && (
          <FeatureTour
            onComplete={handleFeatureTourComplete}
            onSkip={handleFeatureTourSkip}
          />
        )}

        {pageConfig.showPWAPrompt && <PWAInstallPrompt />}
      </div>
    </ErrorBoundary>
  );
}
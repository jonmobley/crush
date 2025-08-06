import React, { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { useAuth } from "../../hooks/useAuth";
import { useCloudDebtStore } from "../../hooks/useCloudDebtStore";
import { useDarkMode } from "../../hooks/useDarkMode";
import { toast } from "sonner@2.0.3";
import { 
  User, Settings, Bell, Shield, HelpCircle, LogOut, 
  CreditCard, Award, ChevronRight, Smartphone, Moon, 
  Globe, Download, RefreshCw, Cloud, CloudOff, WifiOff, Upload, 
  PlayCircle, Info, AlertTriangle
} from "lucide-react";

interface ProfileProps {
  debts: any[];
  onDebtsUpdate: (debts: any[]) => void;
  onPageChange: (page: string) => void;
  totalDebt: number;
  totalMonthlyPayments: number;
}

export function Profile({ debts, onPageChange, totalDebt, totalMonthlyPayments }: ProfileProps) {
  const [authState, authActions] = useAuth();
  const [debtState, debtActions] = useCloudDebtStore();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onlineStatus);
  const [isDemoMode, setIsDemoMode] = useState(() => {
    return localStorage.getItem('crushDemoMode') === 'true';
  });
  const [showDemoWarning, setShowDemoWarning] = useState(false);

  // PWA install prompt
  useEffect(() => {
    const checkInstallable = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstallable(false);
      } else {
        setIsInstallable(true);
      }
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    checkInstallable();
    window.addEventListener('beforeinstallprompt', () => setIsInstallable(true));
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const calculateProgress = () => {
    if (debts.length === 0) return 0;
    const totalOriginal = debts.reduce((sum: number, debt: any) => sum + debt.original, 0);
    const totalRemaining = debts.reduce((sum: number, debt: any) => sum + debt.remaining, 0);
    return ((totalOriginal - totalRemaining) / totalOriginal) * 100;
  };

  const getCompletedDebts = () => {
    return debts.filter(debt => debt.remaining === 0).length;
  };

  const getConnectionStatus = () => {
    if (!authState.isAuthenticated) return { icon: CloudOff, text: 'Local Only', color: 'text-gray-600', description: 'Data stored locally only' };
    if (!isOnline) return { icon: WifiOff, text: 'Offline', color: 'text-amber-600', description: 'No internet connection' };
    if (debtState.isSyncing) return { icon: RefreshCw, text: 'Syncing...', color: 'text-blue-600', description: 'Syncing your data' };
    if (debtState.hasUnsyncedChanges) return { icon: Upload, text: 'Pending Sync', color: 'text-orange-600', description: 'Changes waiting to sync' };
    return { icon: Cloud, text: 'Synced', color: 'text-green-600', description: 'All data is up to date' };
  };

  const handleInstallApp = () => {
    toast.success('App installation started!');
  };

  const handleExportData = () => {
    debtActions.exportData();
  };

  const handleSyncNow = async () => {
    if (!authState.isAuthenticated) {
      toast.error('Sign in to sync your data');
      return;
    }
    await debtActions.syncWithCloud();
  };

  const handleDemoModeToggle = (enabled: boolean) => {
    if (enabled && debts.length > 0 && !showDemoWarning) {
      setShowDemoWarning(true);
      return;
    }
    
    localStorage.setItem('crushDemoMode', enabled.toString());
    setIsDemoMode(enabled);
    setShowDemoWarning(false);
    
    if (enabled) {
      toast.success('Demo mode enabled! Showing sample data');
      // Trigger a page refresh to load demo data
      window.location.reload();
    } else {
      toast.success('Demo mode disabled! Showing your real data');
      window.location.reload();
    }
  };

  const confirmDemoMode = () => {
    localStorage.setItem('crushDemoMode', 'true');
    setIsDemoMode(true);
    setShowDemoWarning(false);
    toast.info('Demo mode enabled. Your real data is safely stored.');
    window.location.reload();
  };

  const renderUserSection = () => {
    const connectionStatus = getConnectionStatus();
    
    return (
      <Card className="mx-4 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              {authState.isAuthenticated ? (
                <>
                  <h2 className="font-semibold text-foreground">
                    {authState.user?.user_metadata?.full_name || 'User'}
                  </h2>
                  <p className="text-sm text-muted-foreground">{authState.user?.email}</p>
                </>
              ) : (
                <>
                  <h2 className="font-semibold text-foreground">Welcome to Crush</h2>
                  <p className="text-sm text-muted-foreground">Sign in to sync your data</p>
                </>
              )}
              <div className="flex items-center gap-2 mt-1">
                <connectionStatus.icon className={`w-3 h-3 ${connectionStatus.color} ${
                  debtState.isSyncing ? 'animate-spin' : ''
                }`} />
                <p className="text-xs text-muted-foreground">{connectionStatus.description}</p>
              </div>
            </div>
            {debts.length > 0 && (
              <Badge className="bg-green-100 text-green-800">
                {calculateProgress().toFixed(0)}% Complete
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderStatsCards = () => (
    <div className="mx-4 grid grid-cols-2 gap-3">
      <Card className="shadow-sm">
        <CardContent className="p-3 text-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-lg font-semibold text-foreground">{debts.length}</p>
          <p className="text-xs text-muted-foreground">Active Debts</p>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm">
        <CardContent className="p-3 text-center">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Award className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-lg font-semibold text-foreground">{getCompletedDebts()}</p>
          <p className="text-xs text-muted-foreground">Paid Off</p>
        </CardContent>
      </Card>
    </div>
  );

  const renderAccountSection = () => (
    <Card className="mx-4 shadow-sm">
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground mb-3">Account</h3>
        
        <div className="space-y-1">
          {!authState.isAuthenticated ? (
            <div
              className="flex items-center justify-between p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
              onClick={() => onPageChange('auth')}
            >
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Sign In</p>
                  <p className="text-sm text-muted-foreground">Sync your data across devices</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          ) : (
            <>
              {/* Sync Status and Action */}
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors">
                <div className="flex items-center gap-3">
                  <Cloud className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Cloud Sync</p>
                    <p className="text-sm text-muted-foreground">{getConnectionStatus().text}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSyncNow}
                  disabled={debtState.isSyncing || !isOnline}
                  className="h-8"
                >
                  {debtState.isSyncing ? (
                    <RefreshCw className="w-3 h-3 animate-spin" />
                  ) : (
                    <RefreshCw className="w-3 h-3" />
                  )}
                </Button>
              </div>

              {/* Sign Out */}
              <div
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                onClick={authActions.signOut}
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-4 h-4 text-red-600" />
                  <div>
                    <p className="font-medium text-red-600">Sign Out</p>
                    <p className="text-sm text-muted-foreground">Sign out of your account</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderSettingsSection = () => (
    <Card className="mx-4 shadow-sm">
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground mb-3">Settings</h3>
        
        <div className="space-y-1">
          {/* Reminder Settings */}
          <div
            className="flex items-center justify-between p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
            onClick={() => onPageChange('reminder-settings')}
          >
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Reminder Settings</p>
                <p className="text-sm text-muted-foreground">Manage payment notifications</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
          
          {/* Notifications Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Get notified about payments</p>
              </div>
            </div>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>
          
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg">
            <div className="flex items-center gap-3">
              <Moon className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Switch to dark theme</p>
              </div>
            </div>
            <Switch
              checked={isDarkMode}
              onCheckedChange={(checked) => {
                toggleDarkMode();
                toast.success(checked ? 'Dark mode enabled' : 'Light mode enabled');
              }}
            />
          </div>

          {/* Demo Mode Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg">
            <div className="flex items-center gap-3">
              <PlayCircle className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Demo Mode</p>
                <p className="text-sm text-muted-foreground">
                  {isDemoMode ? 'Using sample data' : 'Try the app with sample data'}
                </p>
              </div>
            </div>
            <Switch
              checked={isDemoMode}
              onCheckedChange={handleDemoModeToggle}
            />
          </div>
          
          {/* Privacy & Security */}
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Privacy & Security</p>
                <p className="text-sm text-muted-foreground">Manage your data and privacy</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          {/* Export Data */}
          <div
            className="flex items-center justify-between p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
            onClick={handleExportData}
          >
            <div className="flex items-center gap-3">
              <Download className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Export Data</p>
                <p className="text-sm text-muted-foreground">Download your debt data</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderAppSection = () => (
    <Card className="mx-4 shadow-sm">
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground mb-3">App</h3>
        
        <div className="space-y-1">
          {/* Install App (if not installed) */}
          {isInstallable && (
            <div
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={handleInstallApp}
            >
              <div className="flex items-center gap-3">
                <Smartphone className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Install App</p>
                  <p className="text-sm text-muted-foreground">Add to home screen</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          )}
          
          {/* Help & Support */}
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Help & Support</p>
                <p className="text-sm text-muted-foreground">Get help and send feedback</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
          
          {/* App Version */}
          <div className="flex items-center justify-between p-3 rounded-lg">
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">App Version</p>
                <p className="text-sm text-muted-foreground">2.0.0</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderDemoWarning = () => {
    if (!showDemoWarning) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-background rounded-lg p-6 max-w-md w-full">
          <div className="text-center mb-4">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground">Enable Demo Mode?</h3>
            <p className="text-muted-foreground text-sm mt-2">
              You have existing debt data. Demo mode will temporarily show sample data instead of your real debts.
              Your actual data will be safely preserved and restored when you disable demo mode.
            </p>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3 mb-4">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-blue-800 dark:text-blue-200 font-medium">What Demo Mode Does:</p>
                <ul className="text-blue-700 dark:text-blue-300 mt-1 space-y-1">
                  <li>• Shows realistic sample debts and data</li>
                  <li>• Great for exploring app features</li>
                  <li>• Your real data stays completely safe</li>
                  <li>• Switch back anytime to see your data</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowDemoWarning(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDemoMode}
              className="flex-1 bg-[#667eea] hover:bg-[#5a6fd8] text-white"
            >
              Enable Demo Mode
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 pb-6">
      {renderDemoWarning()}
      {renderUserSection()}
      {renderStatsCards()}
      {renderAccountSection()}
      {renderSettingsSection()}
      {renderAppSection()}
    </div>
  );
}
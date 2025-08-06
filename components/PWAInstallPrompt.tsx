import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Download, X, Smartphone, Monitor, Wifi, WifiOff } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface PWAInstallPromptProps {
  onInstall?: () => void;
}

export function PWAInstallPrompt({ onInstall }: PWAInstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onlineStatus);

  useEffect(() => {
    // Check if app is already installed
    const checkInstalled = () => {
      const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
      const isInWebAppMode = (window.navigator as any).standalone === true;
      setIsInstalled(isInStandaloneMode || isInWebAppMode);
    };

    checkInstalled();

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show prompt after user has used app for a bit
      setTimeout(() => {
        if (!isInstalled && !localStorage.getItem('pwa-install-dismissed')) {
          setShowPrompt(true);
        }
      }, 10000);
    };

    // Listen for app installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      toast.success('Crush installed successfully! 🎉');
      onInstall?.();
    };

    // Listen for online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isInstalled, onInstall]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      toast.success('Installing Crush... Please wait!');
    } else {
      toast.info('Installation cancelled');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
    toast.info('You can install Crush later from your browser menu');
  };

  // Show online/offline status
  if (!isOnline) {
    return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <Badge className="bg-amber-100 text-amber-800 flex items-center gap-2 px-3 py-2">
          <WifiOff className="w-4 h-4" />
          Offline Mode - Your data is saved locally
        </Badge>
      </div>
    );
  }

  // Don't show if already installed or dismissed
  if (!showPrompt || isInstalled) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 animate-in slide-in-from-bottom-5">
      <Card className="shadow-lg border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
              <Download className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                Install Crush App
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Get faster access and work offline! Add to your home screen.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline" className="text-xs">
                  <Smartphone className="w-3 h-3 mr-1" />
                  Mobile Friendly
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Monitor className="w-3 h-3 mr-1" />
                  Desktop Ready
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Wifi className="w-3 h-3 mr-1" />
                  Works Offline
                </Badge>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleInstallClick}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Install Now
                </Button>
                <Button 
                  onClick={handleDismiss}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500"
                >
                  Maybe Later
                </Button>
              </div>
            </div>
            <Button
              onClick={handleDismiss}
              variant="ghost"
              size="icon"
              className="flex-shrink-0 h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
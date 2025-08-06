import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Lightbulb, X, ArrowRight, CheckCircle, Target, 
  BarChart3, Calculator, Calendar, TrendingUp
} from 'lucide-react';

interface OnboardingHint {
  id: string;
  title: string;
  description: string;
  action?: {
    label: string;
    callback: () => void;
  };
  dismissible?: boolean;
  priority?: 'low' | 'medium' | 'high';
}

interface OnboardingHintsProps {
  page: string;
  debts: any[];
  onPageChange: (page: string) => void;
}

export function OnboardingHints({ page, debts, onPageChange }: OnboardingHintsProps) {
  const [dismissedHints, setDismissedHints] = useState<string[]>(() => {
    const saved = localStorage.getItem('crushDismissedHints');
    return saved ? JSON.parse(saved) : [];
  });

  const saveDismissedHints = (hints: string[]) => {
    setDismissedHints(hints);
    localStorage.setItem('crushDismissedHints', JSON.stringify(hints));
  };

  const dismissHint = (hintId: string) => {
    const newDismissed = [...dismissedHints, hintId];
    saveDismissedHints(newDismissed);
  };

  const getHintsForPage = (): OnboardingHint[] => {
    const hasCompletedOnboarding = localStorage.getItem('crushOnboardingCompleted');
    const hasDebts = debts.length > 0;
    const isDemoMode = localStorage.getItem('crushDemoMode') === 'true';

    const hints: OnboardingHint[] = [];

    switch (page) {
      case 'dashboard':
        if (!hasCompletedOnboarding && !hasDebts && !isDemoMode) {
          hints.push({
            id: 'welcome-dashboard',
            title: '👋 Welcome to Crush!',
            description: 'Let\'s get you set up with your first debt to start tracking your progress.',
            action: {
              label: 'Get Started',
              callback: () => {
                localStorage.removeItem('crushOnboardingCompleted');
                window.location.reload();
              }
            },
            priority: 'high'
          });
        }

        if (hasDebts && debts.length === 1) {
          hints.push({
            id: 'first-debt-added',
            title: '🎉 Great start!',
            description: 'You\'ve added your first debt. Now explore the Analytics page to see powerful insights.',
            action: {
              label: 'View Analytics',
              callback: () => onPageChange('analytics')
            },
            dismissible: true,
            priority: 'medium'
          });
        }

        if (hasDebts && !localStorage.getItem('crushSimulatorUsed')) {
          hints.push({
            id: 'try-simulator',
            title: '💡 Try the Payment Simulator',
            description: 'Test different payment scenarios to see how extra payments affect your payoff timeline.',
            action: {
              label: 'Simulate Payments',
              callback: () => onPageChange('payment-simulator')
            },
            dismissible: true,
            priority: 'low'
          });
        }
        break;

      case 'analytics':
        if (hasDebts && debts.length < 3) {
          hints.push({
            id: 'add-more-debts',
            title: '📊 Get Better Insights',
            description: 'Add more of your debts to get a complete picture and more powerful analytics.',
            action: {
              label: 'Add Another Debt',
              callback: () => onPageChange('add-new-debt')
            },
            dismissible: true,
            priority: 'medium'
          });
        }
        break;

      case 'payment-simulator':
        if (!localStorage.getItem('crushSimulatorUsed')) {
          hints.push({
            id: 'simulator-guide',
            title: '🎯 How to Use the Simulator',
            description: 'Try different extra payment amounts to see how much time and interest you can save.',
            dismissible: true,
            priority: 'medium'
          });
        }
        break;

      case 'schedule':
        if (hasDebts && !localStorage.getItem('crushPaymentAdded')) {
          hints.push({
            id: 'track-payments',
            title: '💳 Track Your Payments',
            description: 'Log payments as you make them to keep your progress accurate and celebrate milestones.',
            action: {
              label: 'Add Payment',
              callback: () => onPageChange('add-payment')
            },
            dismissible: true,
            priority: 'medium'
          });
        }
        break;
    }

    // Filter out dismissed hints
    return hints.filter(hint => !dismissedHints.includes(hint.id));
  };

  const hintsToShow = getHintsForPage();

  if (hintsToShow.length === 0) return null;

  const renderHint = (hint: OnboardingHint) => {
    const priorityColors = {
      high: 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30',
      medium: 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30',
      low: 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30'
    };

    const priorityIconColors = {
      high: 'text-red-600',
      medium: 'text-blue-600',
      low: 'text-green-600'
    };

    return (
      <Card key={hint.id} className={`${priorityColors[hint.priority || 'medium']} border`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className={`p-1 rounded-full ${hint.priority === 'high' ? 'bg-red-100' : hint.priority === 'low' ? 'bg-green-100' : 'bg-blue-100'}`}>
                <Lightbulb className={`w-4 h-4 ${priorityIconColors[hint.priority || 'medium']}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-foreground">{hint.title}</h4>
                  {hint.priority === 'high' && (
                    <Badge variant="outline" className="text-xs">Important</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{hint.description}</p>
                
                <div className="flex items-center gap-2">
                  {hint.action && (
                    <Button
                      size="sm"
                      onClick={hint.action.callback}
                      className="bg-[#667eea] hover:bg-[#5a6fd8] text-white h-8 text-xs"
                    >
                      {hint.action.label}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  )}
                  
                  {hint.dismissible && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissHint(hint.id)}
                      className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
                    >
                      Got it
                    </Button>
                  )}
                </div>
              </div>
            </div>
            
            {hint.dismissible && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissHint(hint.id)}
                className="p-1 h-auto text-muted-foreground hover:text-foreground ml-2"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="mx-4 mb-4 space-y-3">
      {hintsToShow.map(renderHint)}
    </div>
  );
}

// Utility function to mark features as used
export const markFeatureUsed = (feature: string) => {
  localStorage.setItem(`crush${feature}Used`, 'true');
};

// Common feature markers
export const FeatureMarkers = {
  markSimulatorUsed: () => markFeatureUsed('Simulator'),
  markPaymentAdded: () => markFeatureUsed('PaymentAdded'),
  markAnalyticsViewed: () => markFeatureUsed('AnalyticsViewed'),
  markStrategiesViewed: () => markFeatureUsed('StrategiesViewed')
};
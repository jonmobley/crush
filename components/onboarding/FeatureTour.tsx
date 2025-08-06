import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  ArrowRight, ArrowLeft, X, BarChart3, Calculator, 
  Calendar, TrendingUp, Target, Lightbulb, Eye
} from 'lucide-react';

interface FeatureTourProps {
  onComplete: () => void;
  onSkip: () => void;
}

interface TourStep {
  id: string;
  title: string;
  description: string;
  highlight: string;
  icon: React.ComponentType<any>;
  position: 'top' | 'bottom' | 'center';
  action?: {
    label: string;
    callback: () => void;
  };
}

export function FeatureTour({ onComplete, onSkip }: FeatureTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const tourSteps: TourStep[] = [
    {
      id: 'dashboard',
      title: 'Your Debt Dashboard',
      description: 'Get a quick overview of all your debts, total balance, and progress. This is your command center for debt management.',
      highlight: 'The main header shows your total debt and progress percentage.',
      icon: BarChart3,
      position: 'top'
    },
    {
      id: 'analytics',
      title: 'Visual Analytics',
      description: 'Dive deep into your debt data with interactive charts, progress trends, and payment breakdowns.',
      highlight: 'Tap "Analytics" in the bottom navigation to explore detailed insights.',
      icon: TrendingUp,
      position: 'bottom',
      action: {
        label: 'Preview Analytics',
        callback: () => {
          // Highlight the analytics tab
          const analyticsTab = document.querySelector('[data-tab="analytics"]');
          if (analyticsTab) {
            analyticsTab.classList.add('pulse-highlight');
            setTimeout(() => {
              analyticsTab.classList.remove('pulse-highlight');
            }, 3000);
          }
        }
      }
    },
    {
      id: 'simulator',
      title: 'Payment Simulator',
      description: 'Test different payment scenarios to see how extra payments or strategy changes affect your payoff timeline.',
      highlight: 'Found in the main menu - experiment with "what if" scenarios.',
      icon: Calculator,
      position: 'center'
    },
    {
      id: 'schedule',
      title: 'Payment Tracking',
      description: 'Keep track of due dates, payment history, and upcoming payments. Never miss a payment again!',
      highlight: 'The Schedule tab helps you stay organized and on track.',
      icon: Calendar,
      position: 'bottom'
    },
    {
      id: 'insights',
      title: 'Smart Recommendations',
      description: 'Get personalized advice based on your debt portfolio. Learn optimization strategies and celebrate milestones.',
      highlight: 'Look for insight cards throughout the app with actionable tips.',
      icon: Lightbulb,
      position: 'center'
    }
  ];

  const currentStepData = tourSteps[currentStep];
  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem('crushFeatureTourCompleted', 'true');
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('crushFeatureTourCompleted', 'true');
    onSkip();
  };

  if (!isVisible) return null;

  const IconComponent = currentStepData.icon;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-50" />
      
      {/* Tour Card */}
      <div 
        className={`fixed z-[60] left-4 right-4 ${
          currentStepData.position === 'top' ? 'top-24' :
          currentStepData.position === 'bottom' ? 'bottom-24' :
          'top-1/2 -translate-y-1/2'
        }`}
      >
        <Card className="max-w-sm mx-auto shadow-xl border-2 border-[#667eea]">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-lg flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{currentStepData.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {currentStep + 1} of {tourSteps.length}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="p-1 h-auto text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-muted rounded-full h-1.5">
                <div 
                  className="bg-gradient-to-r from-[#667eea] to-[#764ba2] h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3 mb-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {currentStepData.description}
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Eye className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Look for:</strong> {currentStepData.highlight}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              {currentStepData.action && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={currentStepData.action.callback}
                  className="w-full text-xs"
                >
                  {currentStepData.action.label}
                </Button>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-1 text-xs"
              >
                <ArrowLeft className="w-3 h-3" />
                Previous
              </Button>

              <div className="flex gap-1">
                {tourSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStep 
                        ? 'bg-[#667eea]' 
                        : index < currentStep 
                          ? 'bg-green-400'
                          : 'bg-muted'
                    }`}
                  />
                ))}
              </div>

              <Button
                size="sm"
                onClick={handleNext}
                className="bg-[#667eea] hover:bg-[#5a6fd8] text-white flex items-center gap-1 text-xs"
              >
                {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
                <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Highlight specific UI elements */}
      <style jsx>{`
        .pulse-highlight {
          animation: pulse-blue 2s infinite;
          border-radius: 8px;
        }
        
        @keyframes pulse-blue {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(102, 126, 234, 0);
          }
        }
      `}</style>
    </>
  );
}
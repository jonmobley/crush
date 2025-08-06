import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  ArrowRight, ArrowLeft, Target, TrendingDown, DollarSign, 
  Calculator, BarChart3, Calendar, CheckCircle, Zap, 
  Snowflake, Mountain, PlayCircle, Lightbulb, Trophy,
  CreditCard, Home, GraduationCap, Car, Building
} from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
  onSkip: () => void;
}

interface OnboardingStep {
  id: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
  showProgress?: boolean;
}

export function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to Crush!',
      subtitle: 'Your journey to debt freedom starts here',
      showProgress: false,
      content: (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center mx-auto">
            <Target className="w-10 h-10 text-white" />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">Take Control of Your Debt</h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Crush helps you create a personalized debt payoff plan, track your progress, 
              and stay motivated on your path to financial freedom.
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-800">What you'll learn:</span>
            </div>
            <div className="space-y-2 text-sm text-blue-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>Proven debt payoff strategies</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>How to track and visualize progress</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>Smart payment planning tools</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'strategies',
      title: 'Choose Your Strategy',
      subtitle: 'Different approaches for different personalities',
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground text-center mb-6">
            There are two proven methods for paying off debt. Choose the one that motivates you most:
          </p>

          <div className="space-y-3">
            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedStrategy === 'snowball' 
                  ? 'border-[#667eea] bg-blue-50' 
                  : 'border-border hover:border-muted-foreground'
              }`}
              onClick={() => setSelectedStrategy('snowball')}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Snowflake className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">Debt Snowball</h3>
                    <Badge variant="outline" className="text-xs">Most Popular</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Pay minimums on all debts, then put extra money toward the <strong>smallest balance first</strong>.
                  </p>
                  <div className="text-xs text-green-600">
                    ✓ Quick wins build momentum  ✓ Great for motivation  ✓ Psychological boost
                  </div>
                </div>
              </div>
            </div>

            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedStrategy === 'avalanche' 
                  ? 'border-[#667eea] bg-blue-50' 
                  : 'border-border hover:border-muted-foreground'
              }`}
              onClick={() => setSelectedStrategy('avalanche')}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Mountain className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">Debt Avalanche</h3>
                    <Badge variant="outline" className="text-xs">Saves Most Money</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Pay minimums on all debts, then put extra money toward the <strong>highest interest rate first</strong>.
                  </p>
                  <div className="text-xs text-purple-600">
                    ✓ Saves most on interest  ✓ Mathematically optimal  ✓ Faster payoff time
                  </div>
                </div>
              </div>
            </div>
          </div>

          {selectedStrategy && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="font-medium text-foreground">Great choice!</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {selectedStrategy === 'snowball' 
                  ? "The Snowball method is perfect for building confidence and staying motivated. You'll see debts disappearing quickly!"
                  : "The Avalanche method will save you the most money in interest over time. You're optimizing for maximum savings!"
                }
              </p>
            </div>
          )}
        </div>
      )
    },
    {
      id: 'features',
      title: 'Powerful Tools at Your Fingertips',
      subtitle: 'Everything you need to succeed',
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground text-center mb-6">
            Crush gives you professional-grade tools to plan, track, and optimize your debt payoff:
          </p>

          <div className="grid gap-4">
            <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">Visual Analytics</h4>
                <p className="text-sm text-muted-foreground">See your progress with beautiful charts and insights</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">Payment Simulator</h4>
                <p className="text-sm text-muted-foreground">Test different payment scenarios instantly</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">Smart Insights</h4>
                <p className="text-sm text-muted-foreground">Get personalized recommendations and tips</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">Payment Tracking</h4>
                <p className="text-sm text-muted-foreground">Never miss a payment with smart reminders</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'demo',
      title: 'Try Before You Start',
      subtitle: 'Explore with realistic sample data',
      content: (
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto">
            <PlayCircle className="w-8 h-8 text-white" />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Want to Explore First?</h2>
            <p className="text-muted-foreground">
              Not ready to add your real debts yet? No problem! You can explore all of Crush's features 
              using our demo mode with realistic sample data.
            </p>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <h4 className="font-medium text-orange-800 mb-2">Demo Mode Includes:</h4>
            <div className="space-y-2 text-sm text-orange-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>6 realistic sample debts (credit cards, loans, etc.)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Full analytics with charts and insights</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Payment simulator with real scenarios</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>All features unlocked for exploration</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                localStorage.setItem('crushDemoMode', 'true');
                localStorage.setItem('crushOnboardingCompleted', 'true');
                window.location.reload();
              }}
              className="flex-1"
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              Try Demo Mode
            </Button>
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="flex-1 bg-[#667eea] hover:bg-[#5a6fd8] text-white"
            >
              Add Real Debts
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )
    },
    {
      id: 'ready',
      title: 'Ready to Get Started!',
      subtitle: 'Let\'s add your first debt',
      content: (
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">You're All Set!</h2>
            <p className="text-muted-foreground">
              Now let's add your first debt. Don't worry - we'll guide you through every step 
              and you can always edit or remove debts later.
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium text-green-800 mb-3">Quick Tips for Success:</h4>
            <div className="space-y-2 text-sm text-green-700 text-left">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Start with one debt to get familiar with the app</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Have your latest statement handy for accurate numbers</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Remember: {selectedStrategy === 'snowball' ? 'smallest balance first!' : 'highest interest rate first!'}</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Store the selected strategy for later use
      if (selectedStrategy) {
        localStorage.setItem('crushPreferredStrategy', selectedStrategy);
      }
      localStorage.setItem('crushOnboardingCompleted', 'true');
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    if (currentStepData.id === 'strategies') {
      return selectedStrategy !== null;
    }
    return true;
  };

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="min-h-screen flex flex-col">
        {/* Header with progress */}
        <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] px-4 py-6">
          <div className="max-w-md mx-auto">
            {currentStepData.showProgress !== false && (
              <div className="mb-4">
                <div className="flex justify-between text-white/80 text-sm mb-2">
                  <span>Step {currentStep + 1} of {steps.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-white/20" />
              </div>
            )}
            
            <div className="text-center text-white">
              <h1 className="text-2xl font-bold mb-1">{currentStepData.title}</h1>
              <p className="text-white/90">{currentStepData.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 py-6">
          <div className="max-w-md mx-auto">
            <Card>
              <CardContent className="p-6">
                {currentStepData.content}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-4 py-6 bg-background border-t">
          <div className="max-w-md mx-auto flex justify-between gap-4">
            <div className="flex gap-3">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={onSkip}
                className="text-muted-foreground"
              >
                Skip Setup
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-[#667eea] hover:bg-[#5a6fd8] text-white flex items-center gap-2"
              >
                {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
                {currentStep < steps.length - 1 && <ArrowRight className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Trophy, Sparkles, Target, TrendingUp, Calendar, 
  BarChart3, ArrowRight, CheckCircle
} from 'lucide-react';

interface FirstDebtCelebrationProps {
  debtName: string;
  onExploreFeatures: () => void;
  onGoToDashboard: () => void;
}

export function FirstDebtCelebration({ 
  debtName, 
  onExploreFeatures, 
  onGoToDashboard 
}: FirstDebtCelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Hide confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'View detailed charts and progress tracking',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      icon: Target,
      title: 'Payment Simulator',
      description: 'Test different payment scenarios',
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      icon: Calendar,
      title: 'Payment Schedule',
      description: 'Track due dates and payment history',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      icon: TrendingUp,
      title: 'Smart Insights',
      description: 'Get personalized recommendations',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <div 
                className={`w-2 h-2 rounded-full ${
                  ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500'][Math.floor(Math.random() * 5)]
                }`}
              />
            </div>
          ))}
        </div>
      )}

      <Card className="max-w-md w-full">
        <CardContent className="p-6 text-center space-y-6">
          {/* Celebration Header */}
          <div className="space-y-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Congratulations! 🎉</h2>
              <p className="text-muted-foreground">
                You've successfully added <strong>"{debtName}"</strong> to your debt tracking!
              </p>
            </div>

            <Badge className="bg-green-100 text-green-800 border-green-200">
              <CheckCircle className="w-3 h-3 mr-1" />
              First Debt Added
            </Badge>
          </div>

          {/* Motivation Message */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">You're on your way to debt freedom!</h3>
            <p className="text-sm text-muted-foreground">
              The hardest part is getting started, and you just did it. Every payment from now on 
              brings you closer to your goal.
            </p>
          </div>

          {/* Next Steps */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Explore what Crush can do:</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className={`w-8 h-8 ${feature.bgColor} rounded-lg flex items-center justify-center mb-2`}>
                      <IconComponent className={`w-4 h-4 ${feature.color}`} />
                    </div>
                    <h4 className="font-medium text-foreground text-sm">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onExploreFeatures}
              className="w-full bg-[#667eea] hover:bg-[#5a6fd8] text-white"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Take a Quick Tour
            </Button>
            
            <Button
              onClick={onGoToDashboard}
              variant="outline"
              className="w-full"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Encouragement */}
          <div className="text-xs text-muted-foreground">
            🚀 Tip: You can add more debts anytime to get a complete picture of your finances
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
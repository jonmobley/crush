import React, { useState } from 'react';
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { 
  Calculator, Zap, Target, ArrowRight, TrendingUp, 
  DollarSign, Clock, CheckCircle, Info
} from "lucide-react";

interface StrategiesProps {
  debts: any[];
  onDebtsUpdate: (debts: any[]) => void;
  onPageChange: (page: string) => void;
  totalDebt: number;
  totalMonthlyPayments: number;
}

export function Strategies({ debts, onPageChange, totalDebt, totalMonthlyPayments }: StrategiesProps) {
  const [selectedStrategy, setSelectedStrategy] = useState<'avalanche' | 'snowball' | null>(null);

  const calculatePayoffTime = (strategy: 'avalanche' | 'snowball') => {
    if (debts.length === 0) return { time: '0', savings: 0 };
    
    // Simple calculation for demonstration
    const avgInterestRate = debts.reduce((sum: number, debt: any) => sum + debt.interestRate, 0) / debts.length;
    const monthlyRate = avgInterestRate / 100 / 12;
    const months = Math.log(1 + (totalDebt * monthlyRate) / totalMonthlyPayments) / Math.log(1 + monthlyRate);
    
    const baseTime = months / 12;
    const strategyTime = strategy === 'avalanche' ? baseTime * 0.85 : baseTime * 0.90; // Avalanche is more efficient
    const savings = strategy === 'avalanche' ? totalDebt * 0.15 : totalDebt * 0.10;
    
    return {
      time: strategyTime.toFixed(1),
      savings: Math.round(savings)
    };
  };

  const avalancheResults = calculatePayoffTime('avalanche');
  const snowballResults = calculatePayoffTime('snowball');

  const renderQuickStart = () => (
    <Card className="mx-6 shadow-lg">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Payment Simulator</h2>
          <p className="text-gray-600">
            Run scenarios to see how different strategies and extra payments can accelerate your debt freedom
          </p>
        </div>
        
        <Button 
          onClick={() => onPageChange('payment-simulator')}
          className="w-full h-14 bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:from-[#5a6fd8] to-[#6b4397] text-white rounded-xl"
        >
          <Calculator className="w-5 h-5 mr-2" />
          Run Payment Simulation
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );

  const renderStrategyCard = (
    type: 'avalanche' | 'snowball',
    title: string,
    description: string,
    icon: React.ReactNode,
    results: { time: string; savings: number },
    pros: string[],
    isRecommended?: boolean
  ) => (
    <Card className={`shadow-lg hover:shadow-xl transition-all duration-300 ${
      selectedStrategy === type ? 'ring-2 ring-[#667eea] ring-offset-2' : ''
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              type === 'avalanche' ? 'bg-orange-100' : 'bg-green-100'
            }`}>
              {icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                {title}
                {isRecommended && (
                  <Badge className="bg-blue-100 text-blue-800 text-xs">
                    Recommended
                  </Badge>
                )}
              </h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-[#667eea]">{results.time} years</p>
              <p className="text-xs text-gray-500">Estimated payoff time</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">${results.savings.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Potential savings</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <h4 className="text-sm font-medium text-gray-900">Benefits:</h4>
          {pros.map((pro, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600">{pro}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button 
            variant={selectedStrategy === type ? "default" : "outline"}
            onClick={() => setSelectedStrategy(selectedStrategy === type ? null : type)}
            className={`flex-1 ${
              selectedStrategy === type 
                ? 'bg-[#667eea] hover:bg-[#5a6fd8]' 
                : 'hover:bg-gray-50'
            }`}
          >
            {selectedStrategy === type ? 'Selected' : 'Select Strategy'}
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-[#667eea] hover:bg-blue-50"
            onClick={() => onPageChange('payment-simulator')}
          >
            <Calculator className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderCurrentStrategy = () => {
    if (debts.length === 0) return null;
    
    // Determine current strategy based on debt order
    const highestInterestDebt = debts.reduce((prev: any, current: any) => 
      prev.interestRate > current.interestRate ? prev : current
    );
    
    const lowestBalanceDebt = debts.reduce((prev: any, current: any) => 
      prev.remaining < current.remaining ? prev : current
    );
    
    // Smart recommendation based on debt portfolio
    const highInterestCount = debts.filter(debt => debt.interestRate > 15).length;
    const smallBalanceCount = debts.filter(debt => debt.remaining < debt.monthlyPayment * 6).length;
    
    const recommendedStrategy = highInterestCount > smallBalanceCount ? 'avalanche' : 'snowball';
    const recommendedDebt = recommendedStrategy === 'avalanche' ? highestInterestDebt : lowestBalanceDebt;
    
    return (
      <Card className="mx-6 shadow-lg border-l-4 border-l-blue-500">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Info className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Smart Recommendation</h3>
              <p className="text-sm text-gray-600">Based on your debt portfolio analysis</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-800 mb-2">
                <strong>Strategy:</strong> {recommendedStrategy === 'avalanche' ? 'Debt Avalanche' : 'Debt Snowball'}
              </p>
              <p className="text-sm text-blue-800 mb-2">
                <strong>Focus on:</strong> "{recommendedDebt.name}"
              </p>
              <p className="text-xs text-blue-600">
                {recommendedStrategy === 'avalanche' 
                  ? `Highest interest rate at ${recommendedDebt.interestRate}% - saves most money`
                  : `Smallest balance at ${recommendedDebt.remaining.toLocaleString()} - builds momentum`
                }
              </p>
            </div>
            
            {/* Portfolio insights */}
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold text-gray-900">{highInterestCount}</p>
                <p className="text-xs text-gray-600">High-interest debts (&gt;15%)</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold text-gray-900">{smallBalanceCount}</p>
                <p className="text-xs text-gray-600">Small balances (&lt;6 months)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderComparisonChart = () => (
    <Card className="mx-6 shadow-lg">
      <CardContent className="p-6">
        <h3 className="font-semibold text-gray-900 mb-6">Strategy Comparison</h3>
        
        <div className="space-y-6">
          {/* Avalanche Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-900">Debt Avalanche</span>
              <span className="text-sm text-orange-600">{avalancheResults.time} years</span>
            </div>
            <Progress value={85} className="h-2 bg-orange-100">
              <div className="h-full bg-orange-500 rounded-full" style={{ width: '85%' }} />
            </Progress>
            <p className="text-xs text-gray-500 mt-1">Most mathematically efficient</p>
          </div>
          
          {/* Snowball Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-900">Debt Snowball</span>
              <span className="text-sm text-green-600">{snowballResults.time} years</span>
            </div>
            <Progress value={90} className="h-2 bg-green-100">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '90%' }} />
            </Progress>
            <p className="text-xs text-gray-500 mt-1">Quick psychological wins</p>
          </div>
          
          {/* Current Plan */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-900">Current Plan</span>
              <span className="text-sm text-gray-600">5.5 years</span>
            </div>
            <Progress value={100} className="h-2 bg-gray-100">
              <div className="h-full bg-gray-400 rounded-full" style={{ width: '100%' }} />
            </Progress>
            <p className="text-xs text-gray-500 mt-1">Minimum payments only</p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="font-medium text-green-800">Potential Impact</span>
          </div>
          <p className="text-sm text-green-700">
            Either strategy could save you <strong>1-2 years</strong> and <strong>$2,000-4,000</strong> in interest!
          </p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 pb-6">
      {renderQuickStart()}
      {renderCurrentStrategy()}
      
      <div className="px-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Strategy</h2>
      </div>
      
      <div className="px-6 space-y-6">
        {renderStrategyCard(
          'avalanche',
          'Debt Avalanche',
          'Pay highest interest rates first',
          <Zap className="w-6 h-6 text-orange-500" />,
          avalancheResults,
          [
            'Saves the most money in interest',
            'Mathematically optimal approach',
            'Faster debt elimination overall'
          ],
          true
        )}
        
        {renderStrategyCard(
          'snowball',
          'Debt Snowball',
          'Pay smallest balances first',
          <Target className="w-6 h-6 text-green-500" />,
          snowballResults,
          [
            'Quick psychological victories',
            'Builds momentum and motivation',
            'Easier to stick with long-term'
          ]
        )}
      </div>
      
      {renderComparisonChart()}
      
      {selectedStrategy && (
        <div className="mx-6">
          <Button 
            onClick={() => onPageChange('payment-simulator')}
            className="w-full h-14 bg-[#667eea] hover:bg-[#5a6fd8] text-white rounded-xl"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Simulate {selectedStrategy === 'avalanche' ? 'Avalanche' : 'Snowball'} Strategy
          </Button>
        </div>
      )}
    </div>
  );
}
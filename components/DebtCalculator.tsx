import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Calculator, TrendingDown, TrendingUp, DollarSign } from "lucide-react";

interface DebtCalculatorProps {
  debt: {
    id: string;
    name: string;
    remaining: number;
    monthlyPayment: number;
    interestRate: number;
  };
  onScenarioCalculated: (scenario: PayoffScenario) => void;
}

interface PayoffScenario {
  current: {
    months: number;
    totalInterest: number;
    totalPaid: number;
  };
  optimized: {
    months: number;
    totalInterest: number;
    totalPaid: number;
    extraPayment: number;
  };
  savings: {
    months: number;
    interest: number;
    percentage: number;
  };
}

export function DebtCalculator({ debt, onScenarioCalculated }: DebtCalculatorProps) {
  const [extraPayment, setExtraPayment] = useState('50');
  const [scenario, setScenario] = useState<PayoffScenario | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculatePayoffScenario = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
      const monthlyRate = debt.interestRate / 100 / 12;
      const extra = parseFloat(extraPayment) || 0;
      
      // Current scenario
      const currentMonths = Math.ceil(
        Math.log(1 + (debt.remaining * monthlyRate) / debt.monthlyPayment) / 
        Math.log(1 + monthlyRate)
      );
      const currentTotalPaid = currentMonths * debt.monthlyPayment;
      const currentInterest = currentTotalPaid - debt.remaining;
      
      // Optimized scenario with extra payment
      const newPayment = debt.monthlyPayment + extra;
      const optimizedMonths = Math.ceil(
        Math.log(1 + (debt.remaining * monthlyRate) / newPayment) / 
        Math.log(1 + monthlyRate)
      );
      const optimizedTotalPaid = optimizedMonths * newPayment;
      const optimizedInterest = optimizedTotalPaid - debt.remaining;
      
      // Savings calculation
      const monthsSaved = currentMonths - optimizedMonths;
      const interestSaved = currentInterest - optimizedInterest;
      const percentageSaved = (interestSaved / currentInterest) * 100;
      
      const newScenario: PayoffScenario = {
        current: {
          months: currentMonths,
          totalInterest: currentInterest,
          totalPaid: currentTotalPaid
        },
        optimized: {
          months: optimizedMonths,
          totalInterest: optimizedInterest,
          totalPaid: optimizedTotalPaid,
          extraPayment: extra
        },
        savings: {
          months: monthsSaved,
          interest: interestSaved,
          percentage: percentageSaved
        }
      };
      
      setScenario(newScenario);
      onScenarioCalculated(newScenario);
      setIsCalculating(false);
    }, 800);
  };

  const formatCurrency = (amount: number) => `$${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formatYears = (months: number) => `${(months / 12).toFixed(1)} years`;

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          Payment Strategy Calculator
        </CardTitle>
        <p className="text-sm text-gray-600">
          Calculate the impact of extra payments on <strong>{debt.name}</strong>
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="extra-payment">Additional Monthly Payment</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="extra-payment"
                type="number"
                placeholder="0.00"
                value={extraPayment}
                onChange={(e) => setExtraPayment(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              onClick={calculatePayoffScenario}
              disabled={isCalculating}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isCalculating ? 'Calculating...' : 'Calculate'}
            </Button>
          </div>
        </div>

        {scenario && (
          <div className="space-y-4 animate-in slide-in-from-bottom-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-red-500" />
                  Current Plan
                </h4>
                <div className="bg-red-50 p-3 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Payoff Time:</span>
                    <span className="font-medium">{formatYears(scenario.current.months)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Interest:</span>
                    <span className="font-medium text-red-600">{formatCurrency(scenario.current.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Paid:</span>
                    <span className="font-medium">{formatCurrency(scenario.current.totalPaid)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-green-500" />
                  Optimized Plan
                </h4>
                <div className="bg-green-50 p-3 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Payoff Time:</span>
                    <span className="font-medium">{formatYears(scenario.optimized.months)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Interest:</span>
                    <span className="font-medium text-green-600">{formatCurrency(scenario.optimized.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Paid:</span>
                    <span className="font-medium">{formatCurrency(scenario.optimized.totalPaid)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-3">💰 Your Savings</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{scenario.savings.months}</p>
                  <p className="text-sm text-blue-700">Months Saved</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(scenario.savings.interest)}</p>
                  <p className="text-sm text-green-700">Interest Saved</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">{scenario.savings.percentage.toFixed(1)}%</p>
                  <p className="text-sm text-purple-700">Savings Rate</p>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Interest Savings Progress</span>
                  <span>{scenario.savings.percentage.toFixed(1)}%</span>
                </div>
                <Progress value={Math.min(scenario.savings.percentage, 100)} className="h-2" />
              </div>
            </div>

            {scenario.savings.months > 0 && (
              <div className="flex justify-center">
                <Badge className="bg-green-100 text-green-800 px-3 py-1">
                  🎯 Strategy Recommendation: Add {formatCurrency(scenario.optimized.extraPayment)} monthly
                </Badge>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
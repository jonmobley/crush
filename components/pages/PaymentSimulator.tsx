import React, { useState, useEffect } from 'react';
import svgPaths from "../../imports/svg-cepvi4psuu";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Slider } from "../ui/slider";
import { toast } from "sonner@2.0.3";
import { 
  ArrowLeft, Settings, Check, Clock, TrendingDown, 
  DollarSign, Calendar, GripVertical, BarChart3
} from "lucide-react";

interface Debt {
  id: string;
  name: string;
  type: 'Auto Loan' | 'Credit Card' | 'Personal Loan' | 'Other';
  remaining: number;
  original: number;
  monthlyPayment: number;
  interestRate: number;
  nextPayment: string;
  color: 'blue' | 'red' | 'green';
}

type Strategy = 'snowball' | 'avalanche' | 'custom';

interface PaymentSimulatorProps {
  debts: Debt[];
  onApplyPlan: (strategy: Strategy, extraPayment: number, debtOrder: string[]) => void;
  onCancel: () => void;
}

export function PaymentSimulator({ debts, onApplyPlan, onCancel }: PaymentSimulatorProps) {
  const [strategy, setStrategy] = useState<Strategy>('snowball');
  const [extraPayment, setExtraPayment] = useState(100);
  const [debtOrder, setDebtOrder] = useState<string[]>([]);
  const [simulationResults, setSimulationResults] = useState<any>(null);

  // Initialize debt order based on strategy
  useEffect(() => {
    let orderedDebts: Debt[] = [];
    
    switch (strategy) {
      case 'snowball':
        orderedDebts = [...debts].sort((a, b) => a.remaining - b.remaining);
        break;
      case 'avalanche':
        orderedDebts = [...debts].sort((a, b) => b.interestRate - a.interestRate);
        break;
      case 'custom':
        orderedDebts = [...debts]; // Keep current order for custom
        break;
    }
    
    setDebtOrder(orderedDebts.map(debt => debt.id));
  }, [strategy, debts]);

  // Calculate simulation results
  useEffect(() => {
    const calculateResults = () => {
      const totalDebt = debts.reduce((sum, debt) => sum + debt.remaining, 0);
      const totalMonthlyPayments = debts.reduce((sum, debt) => sum + debt.monthlyPayment, 0);
      
      // Simple calculation for demonstration
      const avgInterestRate = debts.reduce((sum, debt) => sum + debt.interestRate, 0) / debts.length;
      const monthlyRate = avgInterestRate / 100 / 12;
      
      // Current plan calculation
      const currentMonths = Math.log(1 + (totalDebt * monthlyRate) / totalMonthlyPayments) / Math.log(1 + monthlyRate);
      const currentPayoffDate = new Date();
      currentPayoffDate.setMonth(currentPayoffDate.getMonth() + currentMonths);
      
      // With extra payments
      const totalWithExtra = totalMonthlyPayments + extraPayment;
      const extraMonths = Math.log(1 + (totalDebt * monthlyRate) / totalWithExtra) / Math.log(1 + monthlyRate);
      const extraPayoffDate = new Date();
      extraPayoffDate.setMonth(extraPayoffDate.getMonth() + extraMonths);
      
      const timeSaved = (currentMonths - extraMonths) / 12;
      const interestSaved = (currentMonths * totalMonthlyPayments - totalDebt) - (extraMonths * totalWithExtra - totalDebt);
      
      setSimulationResults({
        currentPlan: {
          payoffDate: currentPayoffDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          years: (currentMonths / 12).toFixed(1)
        },
        withExtra: {
          payoffDate: extraPayoffDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          years: (extraMonths / 12).toFixed(1)
        },
        timeSaved: timeSaved.toFixed(1),
        interestSaved: Math.round(interestSaved)
      });
    };

    if (debts.length > 0) {
      calculateResults();
    }
  }, [debts, extraPayment, strategy]);

  const getDebtColor = (debt: Debt, index: number) => {
    if (index === 0) return 'bg-green-50 border-green-200';
    if (index === 1) return 'bg-yellow-50 border-yellow-200';
    return 'bg-blue-50 border-blue-200';
  };

  const getOrderColor = (index: number) => {
    if (index === 0) return 'bg-green-500';
    if (index === 1) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const handleApplyPlan = () => {
    // Mark simulator as used for onboarding hints
    localStorage.setItem('crushSimulatorUsed', 'true');
    onApplyPlan(strategy, extraPayment, debtOrder);
    toast.success(`${strategy === 'snowball' ? 'Snowball' : strategy === 'avalanche' ? 'Avalanche' : 'Custom'} strategy applied!`);
  };

  const renderHeader = () => (
    <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] h-[204px] relative">
      {/* Header Navigation */}
      <div className="absolute left-6 top-12 right-6">
        <div className="flex justify-between items-center">
          <Button
            size="icon"
            className="bg-white/20 hover:bg-white/30 border-0"
            onClick={onCancel}
          >
            <ArrowLeft className="w-4 h-4 text-white" />
          </Button>
          
          <h1 className="text-white text-[18px] font-semibold">Payment Simulator</h1>
          
          <Button
            size="icon"
            className="bg-white/20 hover:bg-white/30 border-0"
          >
            <BarChart3 className="w-4 h-4 text-white" />
          </Button>
        </div>
      </div>

      {/* Debt-Free Date Display */}
      <div className="absolute left-6 top-24 right-6">
        <div className="text-center">
          <p className="text-white/80 text-[14px] mb-1">Debt-Free Date</p>
          <h2 className="text-white text-[24px] font-bold mb-4">
            {simulationResults?.withExtra?.payoffDate || 'March 2027'}
          </h2>
          
          <div className="flex justify-center gap-8">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-white" />
              <span className="text-white text-[14px]">
                {simulationResults?.timeSaved || '2.3'} years sooner
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-3.5 h-3.5 text-white" />
              <span className="text-white text-[14px]">
                Save ${simulationResults?.interestSaved?.toLocaleString() || '3,240'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStrategySelection = () => (
    <Card className="mx-6 -mt-8 relative z-10 shadow-xl">
      <CardContent className="p-5">
        <h3 className="font-semibold text-gray-900 mb-5">Choose Your Strategy</h3>
        
        <div className="space-y-3">
          {/* Snowball Method */}
          <Button
            variant="outline"
            className={`w-full h-24 rounded-xl p-4 flex items-center justify-between ${
              strategy === 'snowball' 
                ? 'bg-green-50 border-2 border-green-500' 
                : 'bg-gray-50 border-2 border-gray-200'
            }`}
            onClick={() => setStrategy('snowball')}
          >
            <div className="text-left">
              <h4 className="font-medium text-gray-900 mb-1">Snowball Method 🏔️</h4>
              <p className="text-sm text-gray-600">Pay smallest debts first</p>
              <p className="text-xs text-green-600 font-medium">Best for motivation & quick wins</p>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              strategy === 'snowball' 
                ? 'border-green-500 bg-green-500' 
                : 'border-gray-400'
            }`}>
              {strategy === 'snowball' && <Check className="w-2.5 h-2.5 text-white" />}
            </div>
          </Button>

          {/* Avalanche Method */}
          <Button
            variant="outline"
            className={`w-full h-24 rounded-xl p-4 flex items-center justify-between ${
              strategy === 'avalanche' 
                ? 'bg-orange-50 border-2 border-orange-500' 
                : 'bg-gray-50 border-2 border-gray-200'
            }`}
            onClick={() => setStrategy('avalanche')}
          >
            <div className="text-left">
              <h4 className="font-medium text-gray-900 mb-1">Avalanche Method ⚡</h4>
              <p className="text-sm text-gray-600">Pay highest interest first</p>
              <p className="text-xs text-orange-600 font-medium">Saves the most money overall</p>
            </div>
            <div className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center ${
              strategy === 'avalanche' 
                ? 'border-orange-500 bg-orange-500' 
                : 'border-gray-400'
            }`}>
              {strategy === 'avalanche' && <Check className="w-2.5 h-2.5 text-white" />}
            </div>
          </Button>

          {/* Custom Order */}
          <Button
            variant="outline"
            className={`w-full h-24 rounded-xl p-4 flex items-center justify-between ${
              strategy === 'custom' 
                ? 'bg-purple-50 border-2 border-purple-500' 
                : 'bg-gray-50 border-2 border-gray-200'
            }`}
            onClick={() => setStrategy('custom')}
          >
            <div className="text-left">
              <h4 className="font-medium text-gray-900 mb-1">Custom Order 🎯</h4>
              <p className="text-sm text-gray-600">Choose your own priority</p>
              <p className="text-xs text-purple-600 font-medium">Full control over debt order</p>
            </div>
            <div className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center ${
              strategy === 'custom' 
                ? 'border-purple-500 bg-purple-500' 
                : 'border-gray-400'
            }`}>
              {strategy === 'custom' && <Check className="w-2.5 h-2.5 text-white" />}
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderExtraPaymentSlider = () => (
    <Card className="mx-6 mt-6 shadow-lg">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-gray-900">Extra Monthly Payment</h3>
          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            💡 Even $25 helps!
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Amount</span>
            <span className="font-bold text-[#667eea] text-lg">${extraPayment}</span>
          </div>
          
          <div className="space-y-3">
            <Slider
              value={[extraPayment]}
              onValueChange={(value) => setExtraPayment(value[0])}
              max={500}
              min={0}
              step={10}
              className="w-full"
            />
            
            <div className="flex justify-between text-xs text-gray-400">
              <span>$0</span>
              <span>$500+</span>
            </div>
          </div>
          
          <div className="flex gap-3 mt-4">
            <Button
              variant={extraPayment === 50 ? "default" : "outline"}
              size="sm"
              className={`flex-1 rounded-lg ${
                extraPayment === 50 
                  ? 'bg-[#667eea] text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setExtraPayment(50)}
            >
              $50
            </Button>
            <Button
              variant={extraPayment === 100 ? "default" : "outline"}
              size="sm"
              className={`flex-1 rounded-lg ${
                extraPayment === 100 
                  ? 'bg-[#667eea] text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setExtraPayment(100)}
            >
              $100
            </Button>
            <Button
              variant={extraPayment === 200 ? "default" : "outline"}
              size="sm"
              className={`flex-1 rounded-lg ${
                extraPayment === 200 
                  ? 'bg-[#667eea] text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setExtraPayment(200)}
            >
              $200
            </Button>
          </div>

          {/* Impact preview */}
          {extraPayment > 0 && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Impact Preview</span>
              </div>
              <p className="text-xs text-green-700">
                An extra ${extraPayment}/month could save you{' '}
                <strong>{simulationResults?.timeSaved || '2.3'} years</strong> and{' '}
                <strong>${simulationResults?.interestSaved?.toLocaleString() || '3,240'}</strong> in interest!
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderPaymentOrder = () => (
    <Card className="mx-6 mt-6 shadow-lg">
      <CardContent className="p-5">
        <h3 className="font-semibold text-gray-900 mb-5">Payment Order</h3>
        
        <div className="space-y-3">
          {debtOrder.map((debtId, index) => {
            const debt = debts.find(d => d.id === debtId);
            if (!debt) return null;
            
            return (
              <div
                key={debt.id}
                className={`rounded-lg border p-4 ${getDebtColor(debt, index)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full ${getOrderColor(index)} flex items-center justify-center`}>
                      <span className="text-white font-bold text-xs">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{debt.name}</h4>
                      <p className="text-xs text-gray-500">
                        ${debt.remaining.toLocaleString()} • {debt.interestRate}%
                      </p>
                    </div>
                  </div>
                  
                  {strategy === 'custom' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                    >
                      <GripVertical className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  const renderResults = () => (
    <Card className="mx-6 mt-6 shadow-lg">
      <CardContent className="p-5">
        <h3 className="font-semibold text-gray-900 mb-5">Your Results</h3>
        
        <div className="space-y-4">
          {/* Current Plan */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current Plan</span>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {simulationResults?.currentPlan?.payoffDate || 'May 2030'}
                </p>
                <p className="text-xs text-gray-500">
                  {simulationResults?.currentPlan?.years || '5.5'} years
                </p>
              </div>
            </div>
          </div>
          
          {/* With Extra Payments */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">With Extra Payments</span>
              <div className="text-right">
                <p className="font-semibold text-green-600">
                  {simulationResults?.withExtra?.payoffDate || 'March 2027'}
                </p>
                <p className="text-xs text-green-500">
                  {simulationResults?.withExtra?.years || '3.2'} years
                </p>
              </div>
            </div>
          </div>
          
          {/* Savings Summary */}
          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">Time Saved</span>
              <span className="font-bold text-[#667eea] text-lg">
                {simulationResults?.timeSaved || '2.3'} years
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">Interest Saved</span>
              <span className="font-bold text-green-600 text-lg">
                ${simulationResults?.interestSaved?.toLocaleString() || '3,240'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderActionButtons = () => (
    <div className="mx-6 mt-6 space-y-3 pb-32">
      <Button
        onClick={handleApplyPlan}
        className="w-full h-14 rounded-xl bg-[#667eea] hover:bg-[#5a6fd8] text-white"
      >
        Apply This Plan
      </Button>
      
      <Button
        onClick={() => {
          setStrategy('snowball');
          setExtraPayment(100);
        }}
        variant="outline"
        className="w-full h-14 rounded-xl bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200"
      >
        Try Different Strategy
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      
      <div className="space-y-0">
        {renderStrategySelection()}
        {renderExtraPaymentSlider()}
        {renderPaymentOrder()}
        {renderResults()}
        {renderActionButtons()}
      </div>
    </div>
  );
}
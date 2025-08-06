import React, { useState, useEffect } from 'react';
import svgPaths from "../../imports/svg-u1cx7mcnp5";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { toast } from "sonner@2.0.3";
import { 
  ArrowLeft, CheckCircle, Calendar
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

interface AddPaymentProps {
  debts: Debt[];
  onSave: (payment: { debtId: string; amount: number; date: Date }) => void;
  onCancel: () => void;
}

export function AddPayment({ debts, onSave, onCancel }: AddPaymentProps) {
  const [selectedDebtId, setSelectedDebtId] = useState(debts.length > 0 ? debts[0].id : '');
  const [paymentAmount, setPaymentAmount] = useState(150);
  const [paymentDate, setPaymentDate] = useState<'today' | 'choose'>('today');
  const [customDate, setCustomDate] = useState<Date>(new Date());
  const [impactData, setImpactData] = useState({
    timeSaved: '3 months sooner',
    interestSaved: '$425',
    newPayoffDate: 'Sep 2026'
  });

  // Calculate impact when debt or amount changes
  useEffect(() => {
    if (selectedDebtId && paymentAmount > 0) {
      const selectedDebt = debts.find(d => d.id === selectedDebtId);
      if (selectedDebt) {
        calculateImpact(selectedDebt, paymentAmount);
      }
    }
  }, [selectedDebtId, paymentAmount, debts]);

  const calculateImpact = (debt: Debt, extraPayment: number) => {
    const { remaining, monthlyPayment, interestRate } = debt;
    const monthlyRate = interestRate / 100 / 12;
    
    // Current payoff calculation
    const currentMonths = Math.log(1 + (remaining * monthlyRate) / monthlyPayment) / Math.log(1 + monthlyRate);
    
    // With extra payment (one-time)
    const newRemaining = Math.max(0, remaining - extraPayment);
    const newMonths = newRemaining > 0 
      ? Math.log(1 + (newRemaining * monthlyRate) / monthlyPayment) / Math.log(1 + monthlyRate)
      : 0;
    
    const timeSavedMonths = Math.max(0, currentMonths - newMonths);
    const interestSaved = (currentMonths * monthlyPayment - remaining) - (newMonths * monthlyPayment - newRemaining);
    
    // Calculate new payoff date
    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + newMonths);
    
    setImpactData({
      timeSaved: timeSavedMonths >= 1 
        ? `${Math.round(timeSavedMonths)} months sooner`
        : `${Math.round(timeSavedMonths * 30)} days sooner`,
      interestSaved: `$${Math.round(Math.max(0, interestSaved))}`,
      newPayoffDate: payoffDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    });
  };

  const handleAmountChange = (value: string) => {
    const numValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
    setPaymentAmount(numValue);
  };

  const handleQuickAdd = (amount: number) => {
    setPaymentAmount(prev => prev + amount);
  };

  const handleSubmit = () => {
    if (!selectedDebtId || paymentAmount <= 0) {
      toast.error('Please select a debt and enter a valid payment amount');
      return;
    }

    const paymentDateToUse = paymentDate === 'today' ? new Date() : customDate;
    
    onSave({
      debtId: selectedDebtId,
      amount: paymentAmount,
      date: paymentDateToUse
    });

    toast.success(`$${paymentAmount} payment added successfully!`);
  };

  const renderHeader = () => (
    <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] h-[120px] relative">
      <div className="absolute left-6 top-12 right-6">
        <div className="flex justify-between items-center">
          <Button
            size="icon"
            className="bg-white/20 hover:bg-white/30 border-0"
            onClick={onCancel}
          >
            <ArrowLeft className="w-4 h-4 text-white" />
          </Button>
          
          <h1 className="text-white text-[18px] font-semibold">Add Payment</h1>
          
          <div className="w-8" /> {/* Spacer for center alignment */}
        </div>
      </div>
    </div>
  );

  const renderDebtSelection = () => (
    <Card className="mx-6 -mt-8 relative z-10 shadow-xl">
      <CardContent className="p-5">
        <h3 className="font-semibold text-gray-900 mb-5">Which debt are you paying?</h3>
        
        <RadioGroup value={selectedDebtId} onValueChange={setSelectedDebtId} className="space-y-3">
          {debts.map((debt) => (
            <div key={debt.id} className={`rounded-xl border-2 p-4 transition-all ${
              selectedDebtId === debt.id 
                ? 'bg-blue-50 border-[#667eea]' 
                : 'bg-transparent border-gray-200 hover:border-gray-300'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <RadioGroupItem 
                      value={debt.id} 
                      id={debt.id}
                      className={`w-4 h-4 ${
                        selectedDebtId === debt.id 
                          ? 'border-[#667eea] bg-[#667eea]' 
                          : 'border-gray-300'
                      }`}
                    />
                    {selectedDebtId === debt.id && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor={debt.id} className="font-semibold text-gray-900 cursor-pointer">
                      {debt.name}
                    </Label>
                    <p className="text-sm text-gray-500">
                      ${debt.remaining.toLocaleString()} remaining
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${debt.monthlyPayment}</p>
                  <p className="text-sm text-gray-500">monthly</p>
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );

  const renderPaymentAmount = () => (
    <Card className="mx-6 mt-6 shadow-lg">
      <CardContent className="p-5">
        <h3 className="font-semibold text-gray-900 mb-5">How much extra are you paying?</h3>
        
        <div className="relative mb-6">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl font-bold">
            $
          </div>
          <Input
            type="text"
            value={paymentAmount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="bg-gray-50 border-0 rounded-xl h-[72px] text-center text-3xl font-bold text-gray-400 pl-12"
            placeholder="150"
          />
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-gray-100 border-0 rounded-xl h-11 text-gray-700 hover:bg-gray-200"
            onClick={() => handleQuickAdd(25)}
          >
            +$25
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-gray-100 border-0 rounded-xl h-11 text-gray-700 hover:bg-gray-200"
            onClick={() => handleQuickAdd(50)}
          >
            +$50
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-gray-100 border-0 rounded-xl h-11 text-gray-700 hover:bg-gray-200"
            onClick={() => handleQuickAdd(100)}
          >
            +$100
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderImpactPreview = () => (
    <Card className="mx-6 mt-6 shadow-lg">
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="bg-green-100 rounded-full size-8 flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Impact Preview</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">Time saved</span>
            <span className="font-semibold text-green-600">{impactData.timeSaved}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">Interest saved</span>
            <span className="font-semibold text-green-600">{impactData.interestSaved}</span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">New payoff date</span>
            <span className="font-semibold text-gray-900">{impactData.newPayoffDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderPaymentTiming = () => (
    <Card className="mx-6 mt-6 shadow-lg">
      <CardContent className="p-5">
        <h3 className="font-semibold text-gray-900 mb-5">When are you making this payment?</h3>
        
        <div className="flex gap-3">
          <Button
            variant={paymentDate === 'today' ? 'default' : 'outline'}
            className={`flex-1 h-11 rounded-xl ${
              paymentDate === 'today' 
                ? 'bg-[#667eea] hover:bg-[#5a6fd8] text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setPaymentDate('today')}
          >
            Today
          </Button>
          <Button
            variant={paymentDate === 'choose' ? 'default' : 'outline'}
            className={`flex-1 h-11 rounded-xl ${
              paymentDate === 'choose' 
                ? 'bg-[#667eea] hover:bg-[#5a6fd8] text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setPaymentDate('choose')}
          >
            Choose Date
          </Button>
        </div>
        
        {paymentDate === 'choose' && (
          <div className="mt-4">
            <Input
              type="date"
              value={customDate.toISOString().split('T')[0]}
              onChange={(e) => setCustomDate(new Date(e.target.value))}
              className="bg-gray-50 border-gray-200 rounded-xl"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderSubmitButton = () => (
    <div className="mx-6 mt-6 pb-8">
      <Button
        onClick={handleSubmit}
        className="w-full h-[60px] rounded-2xl bg-[#667eea] hover:bg-[#5a6fd8] text-white shadow-lg"
        disabled={!selectedDebtId || paymentAmount <= 0}
      >
        Add ${paymentAmount} Payment
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      
      <div className="space-y-0 pb-8">
        {renderDebtSelection()}
        {renderPaymentAmount()}
        {renderImpactPreview()}
        {renderPaymentTiming()}
        {renderSubmitButton()}
      </div>
    </div>
  );
}
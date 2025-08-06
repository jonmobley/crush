import React, { useState, useEffect } from 'react';
import svgPaths from "../../imports/svg-wz2e8q3jzm";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { toast } from "sonner@2.0.3";
import { 
  ArrowLeft, Save, X, Plus, Trash2, CheckCircle, 
  Calendar, DollarSign, TrendingDown
} from "lucide-react";

interface Debt {
  id: string;
  name: string;
  type: 'Auto Loan' | 'Credit Card' | 'Personal Loan';
  remaining: number;
  original: number;
  monthlyPayment: number;
  interestRate: number;
  nextPayment: string;
  color: 'blue' | 'red' | 'green';
}

interface ExtraPayment {
  id: string;
  amount: number;
  frequency: 'Monthly' | 'Quarterly' | 'Annually';
}

interface EditDebtProps {
  debt: Debt;
  onSave: (updatedDebt: Debt) => void;
  onDelete: (debtId: string) => void;
  onCancel: () => void;
}

export function EditDebt({ debt, onSave, onDelete, onCancel }: EditDebtProps) {
  const [formData, setFormData] = useState({
    name: debt.name,
    type: debt.type,
    remaining: debt.remaining.toString(),
    monthlyPayment: debt.monthlyPayment.toString(),
    interestRate: debt.interestRate.toString(),
    nextPayment: debt.nextPayment
  });

  const [extraPayments, setExtraPayments] = useState<ExtraPayment[]>([
    { id: '1', amount: 100, frequency: 'Monthly' }
  ]);

  const [showUpdatedPayoff, setShowUpdatedPayoff] = useState(false);
  const [payoffCalculation, setPayoffCalculation] = useState({
    newPayoffDate: 'Nov 2026',
    timeSaved: '10 months',
    interestSaved: 2150
  });

  // Calculate updated payoff when form data or extra payments change
  useEffect(() => {
    const calculatePayoff = () => {
      const remaining = parseFloat(formData.remaining) || 0;
      const monthlyPayment = parseFloat(formData.monthlyPayment) || 0;
      const interestRate = parseFloat(formData.interestRate) || 0;
      const extraMonthly = extraPayments.reduce((sum, payment) => 
        payment.frequency === 'Monthly' ? sum + payment.amount : sum, 0
      );

      if (remaining && monthlyPayment && interestRate) {
        const monthlyRate = interestRate / 100 / 12;
        const totalMonthly = monthlyPayment + extraMonthly;
        
        // Calculate original payoff time
        const originalMonths = Math.log(1 + (remaining * monthlyRate) / monthlyPayment) / Math.log(1 + monthlyRate);
        
        // Calculate new payoff time with extra payments
        const newMonths = Math.log(1 + (remaining * monthlyRate) / totalMonthly) / Math.log(1 + monthlyRate);
        
        const monthsSaved = originalMonths - newMonths;
        const currentDate = new Date();
        const payoffDate = new Date(currentDate);
        payoffDate.setMonth(payoffDate.getMonth() + newMonths);
        
        const interestSaved = (originalMonths * monthlyPayment - remaining) - (newMonths * totalMonthly - remaining);

        setPayoffCalculation({
          newPayoffDate: payoffDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          timeSaved: `${Math.round(monthsSaved)} months`,
          interestSaved: Math.round(interestSaved)
        });

        setShowUpdatedPayoff(extraMonthly > 0);
      }
    };

    calculatePayoff();
  }, [formData, extraPayments]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddExtraPayment = () => {
    const newPayment: ExtraPayment = {
      id: Date.now().toString(),
      amount: 50,
      frequency: 'Monthly'
    };
    setExtraPayments(prev => [...prev, newPayment]);
  };

  const handleRemoveExtraPayment = (id: string) => {
    setExtraPayments(prev => prev.filter(payment => payment.id !== id));
  };

  const handleExtraPaymentChange = (id: string, field: string, value: any) => {
    setExtraPayments(prev => prev.map(payment => 
      payment.id === id ? { ...payment, [field]: value } : payment
    ));
  };

  const handleSave = () => {
    const updatedDebt: Debt = {
      ...debt,
      name: formData.name,
      type: formData.type as 'Auto Loan' | 'Credit Card' | 'Personal Loan',
      remaining: parseFloat(formData.remaining),
      monthlyPayment: parseFloat(formData.monthlyPayment),
      interestRate: parseFloat(formData.interestRate),
      nextPayment: formData.nextPayment
    };

    onSave(updatedDebt);
    toast.success(`${formData.name} updated successfully!`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this debt? This action cannot be undone.')) {
      onDelete(debt.id);
      toast.success(`${formData.name} deleted successfully`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
            
            <h1 className="text-white text-[18px] font-semibold">Edit Debt</h1>
            
            <Button
              size="sm"
              className="bg-white/20 hover:bg-white/30 border-0 text-white px-4"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 pb-40 space-y-6">
        {/* Main Form */}
        <Card className="shadow-lg rounded-2xl -mt-8 relative z-10">
          <CardContent className="p-6 space-y-6">
            {/* Debt Name */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Debt Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="h-[50px] rounded-xl border-gray-200"
                placeholder="Enter debt name"
              />
              <p className="text-xs text-gray-500">
                Give your debt a personal name that motivates you
              </p>
            </div>

            {/* Debt Type */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Debt Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger className="h-12 rounded-xl border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Auto Loan">Auto Loan</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="Personal Loan">Personal Loan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Current Balance */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Current Balance</Label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  type="number"
                  value={formData.remaining}
                  onChange={(e) => handleInputChange('remaining', e.target.value)}
                  className="h-[50px] rounded-xl border-gray-200 pl-10"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Monthly Payment */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Monthly Payment</Label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  type="number"
                  value={formData.monthlyPayment}
                  onChange={(e) => handleInputChange('monthlyPayment', e.target.value)}
                  className="h-[50px] rounded-xl border-gray-200 pl-10"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Interest Rate</Label>
              <div className="relative">
                <Input
                  type="number"
                  step="0.1"
                  value={formData.interestRate}
                  onChange={(e) => handleInputChange('interestRate', e.target.value)}
                  className="h-[50px] rounded-xl border-gray-200 pr-8"
                  placeholder="0.0"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
              </div>
            </div>

            {/* Payment Due Date */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Payment Due Date</Label>
              <Select value={formData.nextPayment} onValueChange={(value) => handleInputChange('nextPayment', value)}>
                <SelectTrigger className="h-12 rounded-xl border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st of month">1st of month</SelectItem>
                  <SelectItem value="15th of month">15th of month</SelectItem>
                  <SelectItem value="Last day of month">Last day of month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Extra Payments Section */}
        <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-gray-900">Extra Payments</h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#667eea] hover:bg-blue-50"
                onClick={handleAddExtraPayment}
              >
                + Add
              </Button>
            </div>

            <div className="space-y-4">
              {extraPayments.map((payment) => (
                <div key={payment.id} className="border rounded-xl p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-gray-700">Monthly Extra</h4>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-5 w-5 text-red-500 hover:bg-red-50"
                      onClick={() => handleRemoveExtraPayment(payment.id)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-500">Amount</Label>
                      <div className="relative mt-1">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-500" />
                        <Input
                          type="number"
                          value={payment.amount}
                          onChange={(e) => handleExtraPaymentChange(payment.id, 'amount', parseFloat(e.target.value) || 0)}
                          className="h-[38px] rounded-lg pl-8 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs text-gray-500">Frequency</Label>
                      <Select
                        value={payment.frequency}
                        onValueChange={(value) => handleExtraPaymentChange(payment.id, 'frequency', value)}
                      >
                        <SelectTrigger className="h-[37px] rounded-lg mt-1 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Monthly">Monthly</SelectItem>
                          <SelectItem value="Quarterly">Quarterly</SelectItem>
                          <SelectItem value="Annually">Annually</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Extra Payment Button */}
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 hover:bg-gray-50"
                onClick={handleAddExtraPayment}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Extra Payment
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Updated Payoff Section */}
        {showUpdatedPayoff && (
          <div className="bg-gradient-to-r from-[#f0fdf4] to-[#dcfce7] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-500 rounded-full size-8 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-green-800">Updated Payoff</h3>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-green-600 mb-1">New Payoff Date</p>
                <p className="text-lg font-bold text-green-800">{payoffCalculation.newPayoffDate}</p>
              </div>
              <div>
                <p className="text-sm text-green-600 mb-1">Time Saved</p>
                <p className="text-lg font-bold text-green-800">{payoffCalculation.timeSaved}</p>
              </div>
            </div>

            {payoffCalculation.interestSaved > 0 && (
              <div className="mt-4 p-3 bg-green-100 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-green-600" />
                  <p className="text-sm text-green-700">
                    You'll save <strong>${payoffCalculation.interestSaved.toLocaleString()}</strong> in interest!
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 space-y-3 z-50">
        <Button
          onClick={handleSave}
          className="w-full h-14 rounded-xl bg-[#667eea] hover:bg-[#5a6fd8] text-white"
        >
          Save Changes
        </Button>
        
        <Button
          onClick={onCancel}
          variant="outline"
          className="w-full h-14 rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </Button>
        
        <Button
          onClick={handleDelete}
          variant="ghost"
          className="w-full h-12 text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          Delete This Debt
        </Button>
      </div>
    </div>
  );
}
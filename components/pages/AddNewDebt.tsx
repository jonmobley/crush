import React, { useState } from 'react';
import svgPaths from "../../imports/svg-xgcwvthb4q";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner@2.0.3";
import { 
  ArrowLeft, Check, X, CreditCard, Car, Home, MoreHorizontal, DollarSign, 
  Percent, Calendar, AlertCircle, Lightbulb, Target
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

interface AddNewDebtProps {
  onSave: (newDebt: Debt) => void;
  onCancel: () => void;
}

export function AddNewDebt({ onSave, onCancel }: AddNewDebtProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: '' as 'Auto Loan' | 'Credit Card' | 'Personal Loan' | 'Other' | '',
    remaining: '',
    interestRate: '',
    monthlyPayment: '',
    paymentDate: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);

  const debtTypes = [
    { 
      id: 'Credit Card', 
      icon: CreditCard, 
      color: 'text-gray-700',
      bgColor: 'bg-gray-50 hover:bg-gray-100'
    },
    { 
      id: 'Auto Loan', 
      icon: Car, 
      color: 'text-gray-700',
      bgColor: 'bg-gray-50 hover:bg-gray-100'
    },
    { 
      id: 'Personal Loan', 
      icon: Home, 
      color: 'text-gray-700',
      bgColor: 'bg-gray-50 hover:bg-gray-100'
    },
    { 
      id: 'Other', 
      icon: MoreHorizontal, 
      color: 'text-gray-700',
      bgColor: 'bg-gray-50 hover:bg-gray-100'
    }
  ];

  const paymentDates = [
    '1st of month',
    '5th of month', 
    '10th of month',
    '15th of month',
    '20th of month',
    '25th of month',
    'Last day of month'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleTypeSelect = (type: 'Auto Loan' | 'Credit Card' | 'Personal Loan' | 'Other') => {
    setFormData(prev => ({ ...prev, type }));
    if (errors.type) {
      setErrors(prev => ({ ...prev, type: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please give your debt a name';
    }

    if (!formData.type) {
      newErrors.type = 'Please select a debt type';
    }

    if (!formData.remaining || parseFloat(formData.remaining) <= 0) {
      newErrors.remaining = 'Please enter a valid amount';
    }

    if (!formData.interestRate || parseFloat(formData.interestRate) < 0) {
      newErrors.interestRate = 'Please enter a valid interest rate';
    }

    if (!formData.monthlyPayment || parseFloat(formData.monthlyPayment) <= 0) {
      newErrors.monthlyPayment = 'Please enter a valid monthly payment';
    }

    if (!formData.paymentDate) {
      newErrors.paymentDate = 'Please select a payment date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePayoffTime = () => {
    const remaining = parseFloat(formData.remaining) || 0;
    const monthlyPayment = parseFloat(formData.monthlyPayment) || 0;
    const interestRate = parseFloat(formData.interestRate) || 0;

    if (remaining && monthlyPayment && interestRate) {
      const monthlyRate = interestRate / 100 / 12;
      const months = Math.log(1 + (remaining * monthlyRate) / monthlyPayment) / Math.log(1 + monthlyRate);
      return (months / 12).toFixed(1);
    }
    return '0';
  };

  const getDebtColor = (type: string): 'blue' | 'red' | 'green' => {
    switch (type) {
      case 'Credit Card': return 'red';
      case 'Auto Loan': return 'blue';
      case 'Personal Loan': return 'green';
      default: return 'blue';
    }
  };

  const handleSave = () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newDebt: Debt = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type as 'Auto Loan' | 'Credit Card' | 'Personal Loan',
      remaining: parseFloat(formData.remaining),
      original: parseFloat(formData.remaining), // Assuming new debt starts at full amount
      monthlyPayment: parseFloat(formData.monthlyPayment),
      interestRate: parseFloat(formData.interestRate),
      nextPayment: formData.paymentDate,
      color: getDebtColor(formData.type)
    };

    onSave(newDebt);
    toast.success(`${formData.name} added successfully! 🎉`);
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
          
          <h1 className="text-white text-[18px] font-semibold">Add New Debt</h1>
          
          <div className="w-8" /> {/* Spacer for center alignment */}
        </div>
      </div>
    </div>
  );

  const renderFormSection = (icon: React.ReactNode, title: string, description: string, children: React.ReactNode, error?: string) => (
    <div className="bg-white rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 rounded-full size-10 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      
      {children}
      
      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );

  const renderNameSection = () => renderFormSection(
    <Lightbulb className="w-4 h-4 text-blue-600" />,
    "Give it a name",
    "Something meaningful to you",
    <Input
      value={formData.name}
      onChange={(e) => handleInputChange('name', e.target.value)}
      placeholder="e.g., Dream Vacation, New Kitchen..."
      className="h-12 rounded-xl bg-gray-50 border-gray-200"
    />,
    errors.name
  );

  const renderTypeSection = () => renderFormSection(
    <Target className="w-4 h-4 text-purple-600" />,
    "What type is it?",
    "This helps us give better advice",
    <div className="grid grid-cols-2 gap-4">
      {debtTypes.map((type) => {
        const Icon = type.icon;
        const isSelected = formData.type === type.id;
        return (
          <Button
            key={type.id}
            variant="outline"
            className={`h-[72px] rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
              isSelected 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-100 bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}
            onClick={() => handleTypeSelect(type.id as 'Auto Loan' | 'Credit Card' | 'Personal Loan' | 'Other')}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{type.id}</span>
          </Button>
        );
      })}
    </div>,
    errors.type
  );

  const renderAmountSection = () => renderFormSection(
    <DollarSign className="w-4 h-4 text-green-600" />,
    "How much do you owe?",
    "Current balance remaining",
    <div className="relative">
      <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
      <Input
        type="number"
        value={formData.remaining}
        onChange={(e) => handleInputChange('remaining', e.target.value)}
        placeholder="0.00"
        className="h-12 rounded-xl bg-gray-50 border-gray-200 pl-10"
      />
    </div>,
    errors.remaining
  );

  const renderInterestSection = () => renderFormSection(
    <Percent className="w-4 h-4 text-yellow-600" />,
    "Interest rate",
    "Annual percentage rate (APR)",
    <div className="relative">
      <Input
        type="number"
        step="0.1"
        value={formData.interestRate}
        onChange={(e) => handleInputChange('interestRate', e.target.value)}
        placeholder="0.0"
        className="h-12 rounded-xl bg-gray-50 border-gray-200 pr-8"
      />
      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
    </div>,
    errors.interestRate
  );

  const renderPaymentSection = () => renderFormSection(
    <Calendar className="w-4 h-4 text-blue-600" />,
    "Monthly payment",
    "Minimum amount you pay each month",
    <div className="space-y-4">
      <div className="relative">
        <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
        <Input
          type="number"
          value={formData.monthlyPayment}
          onChange={(e) => handleInputChange('monthlyPayment', e.target.value)}
          placeholder="0.00"
          className="h-12 rounded-xl bg-gray-50 border-gray-200 pl-10"
        />
      </div>
      
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Payment date</Label>
        <Select value={formData.paymentDate} onValueChange={(value) => handleInputChange('paymentDate', value)}>
          <SelectTrigger className="h-12 rounded-xl bg-gray-50 border-gray-200">
            <SelectValue placeholder="Select day of month" />
          </SelectTrigger>
          <SelectContent>
            {paymentDates.map(date => (
              <SelectItem key={date} value={date}>{date}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>,
    errors.monthlyPayment || errors.paymentDate
  );

  const renderPreview = () => {
    const payoffTime = calculatePayoffTime();
    const interestRate = parseFloat(formData.interestRate) || 0;
    
    return (
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border-2 border-green-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-green-500 rounded-full size-8 flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-semibold text-green-800">Debt Preview</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-green-700">Name:</span>
            <span className="font-semibold text-green-900">{formData.name || 'Unnamed Debt'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-700">Type:</span>
            <span className="font-semibold text-green-900">{formData.type || 'Not selected'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-700">Amount:</span>
            <span className="font-semibold text-green-900">${parseFloat(formData.remaining || '0').toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-700">Estimated Payoff:</span>
            <span className="font-semibold text-green-900">{payoffTime} years</span>
          </div>
          
          {interestRate > 15 && (
            <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <p className="text-sm text-yellow-700">
                  <strong>High interest rate detected!</strong> Consider prioritizing this debt.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Show preview when all required fields are filled
  const shouldShowPreview = formData.name && formData.type && formData.remaining && 
                           formData.interestRate && formData.monthlyPayment && formData.paymentDate;

  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      
      <div className="px-6 pb-32 space-y-6 -mt-8 relative z-10">
        {renderNameSection()}
        {renderTypeSection()}
        {renderAmountSection()}
        {renderInterestSection()}
        {renderPaymentSection()}
        
        {shouldShowPreview && renderPreview()}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 space-y-4">
        <Button
          onClick={handleSave}
          className="w-full h-[60px] rounded-2xl bg-[#667eea] hover:bg-[#5a6fd8] text-white text-lg font-semibold"
        >
          Add This Debt
        </Button>
        
        <Button
          onClick={onCancel}
          variant="outline"
          className="w-full h-14 rounded-2xl bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
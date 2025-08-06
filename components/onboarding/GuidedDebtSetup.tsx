import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { 
  HelpCircle, CheckCircle, AlertCircle, CreditCard, Home, 
  GraduationCap, Car, Building, DollarSign, Calendar, 
  Percent, TrendingDown, Lightbulb, Target, ArrowRight
} from 'lucide-react';

interface GuidedDebtSetupProps {
  onComplete: (debtData: any) => void;
  onBack: () => void;
  isFirstDebt?: boolean;
}

interface ValidationError {
  field: string;
  message: string;
}

const DEBT_TYPES = [
  { value: 'Credit Card', icon: CreditCard, color: 'text-red-600', description: 'Credit cards, store cards' },
  { value: 'Auto Loan', icon: Car, color: 'text-blue-600', description: 'Car, truck, motorcycle loans' },
  { value: 'Student Loan', icon: GraduationCap, color: 'text-green-600', description: 'Education loans' },
  { value: 'Mortgage', icon: Home, color: 'text-purple-600', description: 'Home loans' },
  { value: 'Personal Loan', icon: Building, color: 'text-orange-600', description: 'Personal, medical, consolidation' },
  { value: 'Other', icon: DollarSign, color: 'text-gray-600', description: 'Other types of debt' }
];

const DEBT_COLORS = [
  { value: 'red', label: 'Red', class: 'bg-red-100 border-red-300 text-red-800' },
  { value: 'blue', label: 'Blue', class: 'bg-blue-100 border-blue-300 text-blue-800' },
  { value: 'green', label: 'Green', class: 'bg-green-100 border-green-300 text-green-800' },
  { value: 'purple', label: 'Purple', class: 'bg-purple-100 border-purple-300 text-purple-800' },
  { value: 'orange', label: 'Orange', class: 'bg-orange-100 border-orange-300 text-orange-800' }
];

export function GuidedDebtSetup({ onComplete, onBack, isFirstDebt = true }: GuidedDebtSetupProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    remaining: '',
    original: '',
    monthlyPayment: '',
    interestRate: '',
    nextPayment: '',
    color: 'red'
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [tips, setTips] = useState<string[]>([]);
  const preferredStrategy = localStorage.getItem('crushPreferredStrategy');

  const steps = [
    {
      id: 'type',
      title: 'What type of debt is this?',
      subtitle: 'Choose the category that best fits',
      fields: ['type']
    },
    {
      id: 'name',
      title: 'Give this debt a name',
      subtitle: 'Something you\'ll recognize easily',
      fields: ['name']
    },
    {
      id: 'amounts',
      title: 'Enter the current balance',
      subtitle: 'Check your latest statement',
      fields: ['remaining', 'original']
    },
    {
      id: 'payment',
      title: 'Payment information',
      subtitle: 'Your minimum payment and interest rate',
      fields: ['monthlyPayment', 'interestRate']
    },
    {
      id: 'schedule',
      title: 'When is your next payment?',
      subtitle: 'Help us track your payment schedule',
      fields: ['nextPayment', 'color']
    }
  ];

  // Generate smart tips based on user input
  useEffect(() => {
    const newTips: string[] = [];
    
    if (formData.type === 'Credit Card' && parseFloat(formData.interestRate) > 20) {
      newTips.push('High interest rate! This should be a priority for payoff.');
    }
    
    if (formData.remaining && formData.original) {
      const remaining = parseFloat(formData.remaining);
      const original = parseFloat(formData.original);
      const progress = ((original - remaining) / original) * 100;
      
      if (progress > 50) {
        newTips.push('Great progress! You\'re over halfway done paying this off.');
      } else if (progress < 10) {
        newTips.push('Just getting started? Every payment counts toward your goal!');
      }
    }
    
    if (preferredStrategy === 'snowball' && formData.remaining) {
      const balance = parseFloat(formData.remaining);
      if (balance < 1000) {
        newTips.push('Perfect for snowball strategy! Small balances build momentum.');
      }
    }
    
    if (preferredStrategy === 'avalanche' && formData.interestRate) {
      const rate = parseFloat(formData.interestRate);
      if (rate > 15) {
        newTips.push('High interest rate makes this ideal for avalanche strategy!');
      }
    }

    setTips(newTips);
  }, [formData, preferredStrategy]);

  const validateStep = (stepIndex: number): ValidationError[] => {
    const step = steps[stepIndex];
    const stepErrors: ValidationError[] = [];

    step.fields.forEach(field => {
      const value = formData[field as keyof typeof formData];
      
      switch (field) {
        case 'type':
          if (!value) stepErrors.push({ field, message: 'Please select a debt type' });
          break;
        case 'name':
          if (!value.trim()) stepErrors.push({ field, message: 'Please enter a name for this debt' });
          else if (value.length < 2) stepErrors.push({ field, message: 'Name should be at least 2 characters' });
          break;
        case 'remaining':
          if (!value) stepErrors.push({ field, message: 'Please enter the current balance' });
          else if (parseFloat(value) <= 0) stepErrors.push({ field, message: 'Balance must be greater than $0' });
          break;
        case 'original':
          if (!value) stepErrors.push({ field, message: 'Please enter the original balance' });
          else if (parseFloat(value) < parseFloat(formData.remaining)) {
            stepErrors.push({ field, message: 'Original balance should be at least the current balance' });
          }
          break;
        case 'monthlyPayment':
          if (!value) stepErrors.push({ field, message: 'Please enter your minimum payment' });
          else if (parseFloat(value) <= 0) stepErrors.push({ field, message: 'Payment must be greater than $0' });
          break;
        case 'interestRate':
          if (!value) stepErrors.push({ field, message: 'Please enter the interest rate' });
          else {
            const rate = parseFloat(value);
            if (rate < 0 || rate > 50) stepErrors.push({ field, message: 'Interest rate should be between 0% and 50%' });
          }
          break;
        case 'nextPayment':
          if (!value) stepErrors.push({ field, message: 'Please select your next payment date' });
          break;
      }
    });

    return stepErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep);
    setErrors(stepErrors);

    if (stepErrors.length === 0) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Convert form data and submit
        const debtData = {
          name: formData.name.trim(),
          type: formData.type,
          remaining: parseFloat(formData.remaining),
          original: parseFloat(formData.original),
          monthlyPayment: parseFloat(formData.monthlyPayment),
          interestRate: parseFloat(formData.interestRate),
          nextPayment: formData.nextPayment,
          color: formData.color
        };
        onComplete(debtData);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setErrors([]);
    } else {
      onBack();
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear errors for this field
    if (errors) {
      setErrors(errors.filter(err => err.field !== field));
    }
  };

  const getFieldError = (field: string) => {
    return errors?.find(err => err.field === field)?.message;
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const renderStepContent = () => {
    switch (currentStepData.id) {
      case 'type':
        return (
          <div className="space-y-4">
            <div className="grid gap-3">
              {DEBT_TYPES.map(type => {
                const IconComponent = type.icon;
                return (
                  <div
                    key={type.value}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.type === type.value
                        ? 'border-[#667eea] bg-blue-50 dark:bg-blue-950/30'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                    onClick={() => updateFormData('type', type.value)}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className={`w-5 h-5 ${type.color}`} />
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{type.value}</div>
                        <div className="text-sm text-muted-foreground">{type.description}</div>
                      </div>
                      {formData.type === type.value && (
                        <CheckCircle className="w-5 h-5 text-[#667eea]" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {getFieldError('type') && (
              <div className="text-red-600 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {getFieldError('type')}
              </div>
            )}
          </div>
        );

      case 'name':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="flex items-center gap-2">
                Debt Name
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Use a name you'll recognize, like "Chase Sapphire Card" or "Student Loan - Sallie Mae"</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                placeholder={`e.g. ${formData.type === 'Credit Card' ? 'Chase Sapphire Card' : 
                  formData.type === 'Auto Loan' ? '2023 Honda Civic' :
                  formData.type === 'Student Loan' ? 'Federal Student Loan' :
                  formData.type === 'Mortgage' ? 'Home Mortgage' :
                  formData.type === 'Personal Loan' ? 'Personal Loan - Bank' : 
                  'My Debt'}`}
                className={getFieldError('name') ? 'border-red-500' : ''}
              />
              {getFieldError('name') && (
                <div className="text-red-600 text-sm mt-1 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {getFieldError('name')}
                </div>
              )}
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Tip:</strong> Use specific names to easily identify your debts later. 
                  Include the bank name or card type if helpful.
                </div>
              </div>
            </div>
          </div>
        );

      case 'amounts':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="remaining" className="flex items-center gap-2">
                Current Balance
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">The amount you currently owe. Check your latest statement or log into your account.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="remaining"
                type="number"
                value={formData.remaining}
                onChange={(e) => updateFormData('remaining', e.target.value)}
                placeholder="5,000"
                className={getFieldError('remaining') ? 'border-red-500' : ''}
              />
              {getFieldError('remaining') && (
                <div className="text-red-600 text-sm mt-1 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {getFieldError('remaining')}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="original" className="flex items-center gap-2">
                Original Balance (Optional)
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">The total amount you originally borrowed. This helps track your progress.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="original"
                type="number"
                value={formData.original}
                onChange={(e) => updateFormData('original', e.target.value)}
                placeholder={formData.remaining || "10,000"}
                className={getFieldError('original') ? 'border-red-500' : ''}
              />
              {getFieldError('original') && (
                <div className="text-red-600 text-sm mt-1 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {getFieldError('original')}
                </div>
              )}
            </div>

            {formData.remaining && formData.original && parseFloat(formData.original) > parseFloat(formData.remaining) && (
              <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800 dark:text-green-200">
                    Great progress! You've paid off ${(parseFloat(formData.original) - parseFloat(formData.remaining)).toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="monthlyPayment" className="flex items-center gap-2">
                Minimum Monthly Payment
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">The minimum amount you're required to pay each month.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="monthlyPayment"
                type="number"
                value={formData.monthlyPayment}
                onChange={(e) => updateFormData('monthlyPayment', e.target.value)}
                placeholder="150"
                className={getFieldError('monthlyPayment') ? 'border-red-500' : ''}
              />
              {getFieldError('monthlyPayment') && (
                <div className="text-red-600 text-sm mt-1 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {getFieldError('monthlyPayment')}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="interestRate" className="flex items-center gap-2">
                Interest Rate (APR)
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">The annual percentage rate. You can find this on your statement or online account.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <div className="relative">
                <Input
                  id="interestRate"
                  type="number"
                  step="0.01"
                  value={formData.interestRate}
                  onChange={(e) => updateFormData('interestRate', e.target.value)}
                  placeholder="18.99"
                  className={`pr-8 ${getFieldError('interestRate') ? 'border-red-500' : ''}`}
                />
                <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              {getFieldError('interestRate') && (
                <div className="text-red-600 text-sm mt-1 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {getFieldError('interestRate')}
                </div>
              )}
            </div>

            {formData.interestRate && (
              <div className={`rounded-lg p-3 ${
                parseFloat(formData.interestRate) > 15 
                  ? 'bg-amber-50 dark:bg-amber-950/30' 
                  : 'bg-green-50 dark:bg-green-950/30'
              }`}>
                <div className="text-sm">
                  {parseFloat(formData.interestRate) > 15 ? (
                    <span className="text-amber-700 dark:text-amber-300">
                      ⚠️ High interest rate - consider prioritizing this debt
                    </span>
                  ) : parseFloat(formData.interestRate) > 10 ? (
                    <span className="text-blue-700 dark:text-blue-300">
                      📊 Moderate interest rate
                    </span>
                  ) : (
                    <span className="text-green-700 dark:text-green-300">
                      ✅ Low interest rate - you're in good shape!
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case 'schedule':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="nextPayment" className="flex items-center gap-2">
                Next Payment Due
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">When is your next payment due? We'll help you track upcoming payments.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="nextPayment"
                type="date"
                value={formData.nextPayment}
                onChange={(e) => updateFormData('nextPayment', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={getFieldError('nextPayment') ? 'border-red-500' : ''}
              />
              {getFieldError('nextPayment') && (
                <div className="text-red-600 text-sm mt-1 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {getFieldError('nextPayment')}
                </div>
              )}
            </div>

            <div>
              <Label className="flex items-center gap-2">
                Color Tag
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Choose a color to help identify this debt in charts and lists.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <div className="flex gap-2">
                {DEBT_COLORS.map(color => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => updateFormData('color', color.value)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      formData.color === color.value 
                        ? 'border-[#667eea] scale-110' 
                        : 'border-gray-300 hover:scale-105'
                    } ${color.class}`}
                    aria-label={`Select ${color.label} color`}
                  >
                    {formData.color === color.value && (
                      <CheckCircle className="w-4 h-4 mx-auto text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] px-4 py-6">
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <div className="flex justify-between text-white/80 text-sm mb-2">
                <span>Step {currentStep + 1} of {steps.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            
            <div className="text-center text-white">
              <h1 className="text-xl font-bold mb-1">{currentStepData.title}</h1>
              <p className="text-white/90 text-sm">{currentStepData.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 py-6">
          <div className="max-w-md mx-auto space-y-6">
            <Card>
              <CardContent className="p-6">
                {renderStepContent()}
              </CardContent>
            </Card>

            {/* Tips */}
            {tips.length > 0 && (
              <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/30">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="space-y-1">
                      {tips.map((tip, index) => (
                        <p key={index} className="text-sm text-blue-700 dark:text-blue-300">
                          {tip}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="px-4 py-6 bg-background border-t">
          <div className="max-w-md mx-auto flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              ← {currentStep === 0 ? 'Back to Setup' : 'Previous'}
            </Button>
            
            <Button
              onClick={handleNext}
              className="bg-[#667eea] hover:bg-[#5a6fd8] text-white flex items-center gap-2"
            >
              {currentStep === steps.length - 1 ? 'Add Debt' : 'Continue'}
              {currentStep < steps.length - 1 && <ArrowRight className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
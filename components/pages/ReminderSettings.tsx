import React, { useState, useEffect } from 'react';
import svgPaths from "../../imports/svg-uvkhsf3qmh";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { toast } from "sonner@2.0.3";
import { 
  ArrowLeft, Bell, Clock, Calendar, Trophy, Lightbulb, 
  CheckCircle, Settings as SettingsIcon
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

interface ReminderSettings {
  paymentReminders: boolean;
  reminderTiming: '3days' | '1week' | '1day' | 'dayof';
  reminderTime: string;
  debtSpecific: Record<string, boolean>;
  milestoneCelebrations: boolean;
  smartTips: boolean;
}

interface ReminderSettingsProps {
  debts: Debt[];
  onSave: (settings: ReminderSettings) => void;
  onCancel: () => void;
}

export function ReminderSettings({ debts, onSave, onCancel }: ReminderSettingsProps) {
  const [settings, setSettings] = useState<ReminderSettings>({
    paymentReminders: true,
    reminderTiming: '3days',
    reminderTime: '9:00 AM',
    debtSpecific: debts.reduce((acc, debt) => ({
      ...acc,
      [debt.id]: debt.id !== '3' // Enable for all except Home Improvement (matching design)
    }), {}),
    milestoneCelebrations: true,
    smartTips: true
  });

  const [showTimePickerModal, setShowTimePickerModal] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('crushReminderSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Failed to load reminder settings');
      }
    }
  }, []);

  const handleSettingChange = (key: keyof ReminderSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleDebtSpecificChange = (debtId: string, enabled: boolean) => {
    setSettings(prev => ({
      ...prev,
      debtSpecific: { ...prev.debtSpecific, [debtId]: enabled }
    }));
  };

  const handleTimingChange = (timing: '3days' | '1week' | '1day' | 'dayof') => {
    setSettings(prev => ({ ...prev, reminderTiming: timing }));
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('crushReminderSettings', JSON.stringify(settings));
    
    // Call parent save handler
    onSave(settings);
    
    toast.success('Reminder settings saved successfully!');
  };

  const getTimingLabel = (timing: string) => {
    switch (timing) {
      case '3days': return '3 days before';
      case '1week': return '1 week before';
      case '1day': return '1 day before';
      case 'dayof': return 'Day of payment';
      default: return '3 days before';
    }
  };

  const getDebtDueInfo = (debt: Debt) => {
    return `Due ${debt.nextPayment} • $${debt.monthlyPayment}`;
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
          
          <h1 className="text-white text-[18px] font-semibold">Reminder Settings</h1>
          
          <div className="w-8" /> {/* Spacer for center alignment */}
        </div>
      </div>
    </div>
  );

  const renderPaymentReminders = () => (
    <Card className="mx-6 -mt-8 relative z-10 shadow-xl">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 rounded-full size-10 flex items-center justify-center">
              <Bell className="w-4 h-4 text-[#667eea]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Payment Reminders</h3>
              <p className="text-sm text-gray-500">Get notified about upcoming payments</p>
            </div>
          </div>
          
          <Switch
            checked={settings.paymentReminders}
            onCheckedChange={(checked) => handleSettingChange('paymentReminders', checked)}
          />
        </div>
      </CardContent>
    </Card>
  );

  const renderReminderTiming = () => (
    <Card className="mx-6 mt-6 shadow-lg">
      <CardContent className="p-6">
        <h3 className="font-semibold text-gray-900 mb-6">When to Remind Me</h3>
        
        <div className="space-y-4">
          {[
            { value: '3days', label: '3 days before', icon: Calendar },
            { value: '1week', label: '1 week before', icon: Calendar },
            { value: '1day', label: '1 day before', icon: Calendar },
            { value: 'dayof', label: 'Day of payment', icon: Clock }
          ].map(({ value, label, icon: Icon }) => (
            <div
              key={value}
              className={`bg-gray-50 rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all ${
                settings.reminderTiming === value 
                  ? 'ring-2 ring-[#667eea] bg-blue-50' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => handleTimingChange(value as '3days' | '1week' | '1day' | 'dayof')}
            >
              <div 
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  settings.reminderTiming === value
                    ? 'border-[#0075FF] bg-[#0075FF]'
                    : 'border-gray-400'
                }`}
              >
                {settings.reminderTiming === value && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <Label className="font-medium text-gray-900 cursor-pointer flex-1">
                {label}
              </Label>
              {settings.reminderTiming === value && (
                <CheckCircle className="w-3.5 h-3.5 text-[#667eea]" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderReminderTime = () => (
    <Card className="mx-6 mt-6 shadow-lg">
      <CardContent className="p-6">
        <h3 className="font-semibold text-gray-900 mb-6">What Time</h3>
        
        <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-[#667eea]" />
            <span className="font-medium text-gray-900">{settings.reminderTime}</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-[#667eea] hover:bg-blue-50"
            onClick={() => setShowTimePickerModal(true)}
          >
            Change
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderDebtSpecificReminders = () => (
    <Card className="mx-6 mt-6 shadow-lg">
      <CardContent className="p-6">
        <h3 className="font-semibold text-gray-900 mb-6">Debt-Specific Reminders</h3>
        
        <div className="space-y-4">
          {debts.map((debt) => (
            <div key={debt.id} className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{debt.name}</h4>
                  <p className="text-sm text-gray-500">{getDebtDueInfo(debt)}</p>
                </div>
                
                <Switch
                  checked={settings.debtSpecific[debt.id] || false}
                  onCheckedChange={(checked) => handleDebtSpecificChange(debt.id, checked)}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderAdditionalOptions = () => (
    <Card className="mx-6 mt-6 shadow-lg">
      <CardContent className="p-6">
        <h3 className="font-semibold text-gray-900 mb-6">Additional Options</h3>
        
        <div className="space-y-4">
          {/* Milestone Celebrations */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <div>
                <h4 className="font-medium text-gray-900">Milestone Celebrations</h4>
                <p className="text-sm text-gray-500">Get notified when you pay off a debt</p>
              </div>
            </div>
            
            <Switch
              checked={settings.milestoneCelebrations}
              onCheckedChange={(checked) => handleSettingChange('milestoneCelebrations', checked)}
            />
          </div>
          
          {/* Smart Tips */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-3 h-4 text-yellow-500" />
              <div>
                <h4 className="font-medium text-gray-900">Smart Tips</h4>
                <p className="text-sm text-gray-500">Weekly suggestions to save money</p>
              </div>
            </div>
            
            <Switch
              checked={settings.smartTips}
              onCheckedChange={(checked) => handleSettingChange('smartTips', checked)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderSaveButton = () => (
    <div className="mx-6 mt-6 pb-8">
      <Button
        onClick={handleSave}
        className="w-full h-14 rounded-xl bg-[#667eea] hover:bg-[#5a6fd8] text-white"
      >
        Save Settings
      </Button>
    </div>
  );

  // Simple time picker modal
  const renderTimePickerModal = () => {
    if (!showTimePickerModal) return null;

    const timeOptions = [
      '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
      '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
      '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
    ];

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
        <div className="bg-white rounded-2xl w-full max-w-sm max-h-96">
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Select Reminder Time</h3>
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {timeOptions.map((time) => (
              <button
                key={time}
                className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                  settings.reminderTime === time ? 'bg-blue-50 text-[#667eea] font-medium' : 'text-gray-900'
                }`}
                onClick={() => {
                  handleSettingChange('reminderTime', time);
                  setShowTimePickerModal(false);
                }}
              >
                {time}
              </button>
            ))}
          </div>
          
          <div className="p-6 border-t border-gray-200 flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowTimePickerModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      
      <div className="space-y-0 pb-8">
        {renderPaymentReminders()}
        {renderReminderTiming()}
        {renderReminderTime()}
        {renderDebtSpecificReminders()}
        {renderAdditionalOptions()}
        {renderSaveButton()}
      </div>
      
      {renderTimePickerModal()}
    </div>
  );
}
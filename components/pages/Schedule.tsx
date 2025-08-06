import React, { useState, useEffect } from 'react';
import svgPaths from "../../imports/svg-4skztuqt90";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  ArrowLeft, Settings, ChevronLeft, ChevronRight, 
  Car, Home, Heart, Calendar, TrendingUp, User
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

interface ScheduleProps {
  debts: Debt[];
  onDebtsUpdate: (debts: Debt[]) => void;
  onPageChange: (page: string) => void;
  totalDebt: number;
  totalMonthlyPayments: number;
}

export function Schedule({ debts, onPageChange, totalMonthlyPayments }: ScheduleProps) {
  const [viewMode, setViewMode] = useState<'month' | 'list'>('month');
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 1)); // December 2024

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Get payment status for a debt
  const getPaymentStatus = (debt: Debt) => {
    const today = new Date();
    const paymentDate = new Date(`${debt.nextPayment}, 2024`);
    const daysUntil = Math.ceil((paymentDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntil <= 3) return 'due-soon';
    if (daysUntil <= 7) return 'on-track';
    return 'scheduled';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'due-soon':
        return { label: 'Due Soon', className: 'bg-yellow-100 text-yellow-800' };
      case 'on-track':
        return { label: 'On Track', className: 'bg-green-100 text-green-800' };
      case 'scheduled':
        return { label: 'Scheduled', className: 'bg-gray-100 text-gray-600' };
      default:
        return { label: 'Scheduled', className: 'bg-gray-100 text-gray-600' };
    }
  };

  const getDebtIcon = (debt: Debt) => {
    if (debt.name.includes('Car')) return Car;
    if (debt.name.includes('Home')) return Home;
    if (debt.name.includes('Wedding')) return Heart;
    return Car;
  };

  const getDebtColor = (debt: Debt) => {
    switch (debt.color) {
      case 'blue': return 'bg-[#667eea]';
      case 'green': return 'bg-green-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDebtBgColor = (debt: Debt) => {
    switch (debt.color) {
      case 'blue': return 'bg-[rgba(102,126,234,0.1)]';
      case 'green': return 'bg-[rgba(34,197,94,0.1)]';
      case 'red': return 'bg-[rgba(239,68,68,0.1)]';
      default: return 'bg-gray-100';
    }
  };

  // Get payments for a specific date
  const getPaymentsForDate = (date: number) => {
    return debts.filter(debt => {
      const paymentDay = parseInt(debt.nextPayment.split(' ')[1]);
      return paymentDay === date;
    });
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const renderViewToggle = () => (
    <Card className="mx-4 mb-4 shadow-sm">
      <CardContent className="p-4">
        <div className="bg-gray-100 rounded-xl p-1 flex">
          <Button
            onClick={() => setViewMode('month')}
            className={`flex-1 h-9 rounded-lg ${
              viewMode === 'month' 
                ? 'bg-[#667eea] text-white shadow-sm' 
                : 'bg-transparent text-gray-600 hover:bg-gray-200'
            }`}
          >
            Month
          </Button>
          <Button
            onClick={() => setViewMode('list')}
            className={`flex-1 h-9 rounded-lg ${
              viewMode === 'list' 
                ? 'bg-[#667eea] text-white shadow-sm' 
                : 'bg-transparent text-gray-600 hover:bg-gray-200'
            }`}
          >
            List
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderCalendarHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigateMonth('prev')}
        className="w-8 h-8 p-0 rounded-full shadow-lg bg-white hover:bg-gray-50"
      >
        <ChevronLeft className="w-4 h-4 text-gray-600" />
      </Button>
      
      <h2 className="text-[20px] font-bold text-gray-900">
        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </h2>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigateMonth('next')}
        className="w-8 h-8 p-0 rounded-full shadow-lg bg-white hover:bg-gray-50"
      >
        <ChevronRight className="w-4 h-4 text-gray-600" />
      </Button>
    </div>
  );

  const renderCalendar = () => {
    const days = generateCalendarDays();
    const currentMonth = currentDate.getMonth();
    
    return (
      <Card className="mx-4 mt-4 shadow-sm">
        <CardContent className="p-6">
          {renderCalendarHeader()}
          
          {/* Day headers - use index as key to avoid duplicates */}
          <div className="grid grid-cols-7 gap-0 mb-4">
            {dayNames.map((day, index) => (
              <div key={`day-header-${index}`} className="h-8 flex items-center justify-center">
                <span className="text-[12px] font-medium text-gray-500">{day}</span>
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-0">
            {days.map((day, index) => {
              const isCurrentMonth = day.getMonth() === currentMonth;
              const dayNumber = day.getDate();
              const payments = getPaymentsForDate(dayNumber);
              
              return (
                <div key={`calendar-day-${index}`} className="h-9 flex items-center justify-center relative">
                  <span className={`text-[14px] ${
                    isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {dayNumber}
                  </span>
                  
                  {/* Payment indicators */}
                  {isCurrentMonth && payments.map((payment, paymentIndex) => (
                    <div
                      key={`payment-indicator-${payment.id}-${index}`}
                      className={`absolute bottom-1 w-1 h-1 rounded-full ${getDebtColor(payment)}`}
                      style={{
                        left: `${50 + (paymentIndex - payments.length / 2 + 0.5) * 6}%`,
                        transform: 'translateX(-50%)'
                      }}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderUpcomingPayments = () => (
    <div className="mx-4 mt-6">
      <h3 className="text-[18px] font-semibold text-gray-900 mb-4">Upcoming Payments</h3>
      
      <div className="space-y-3">
        {debts.map((debt) => {
          const status = getPaymentStatus(debt);
          const statusBadge = getStatusBadge(status);
          const Icon = getDebtIcon(debt);
          
          return (
            <Card key={debt.id} className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${getDebtBgColor(debt)} flex items-center justify-center`}>
                      <Icon className={`w-3.5 h-3.5 ${debt.color === 'blue' ? 'text-[#667eea]' : debt.color === 'green' ? 'text-green-600' : 'text-red-500'}`} />
                    </div>
                    <div>
                      <h4 className="text-[16px] font-semibold text-gray-900">{debt.name}</h4>
                      <p className="text-[12px] text-gray-500">Due {debt.nextPayment}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-[16px] font-bold text-gray-900">${debt.monthlyPayment}</p>
                    <Badge className={`mt-1 text-[12px] ${statusBadge.className}`}>
                      {statusBadge.label}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderMonthlySummary = () => (
    <Card className="mx-4 mt-6 shadow-sm">
      <CardContent className="p-5">
        <h3 className="text-[16px] font-semibold text-gray-900 mb-5">This Month</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-[24px] font-bold text-gray-900 mb-1">
              ${totalMonthlyPayments}
            </div>
            <div className="text-[12px] text-gray-500">Total Payments</div>
          </div>
          
          <div className="text-center">
            <div className="text-[24px] font-bold text-[#667eea] mb-1">
              {debts.length}
            </div>
            <div className="text-[12px] text-gray-500">Due Dates</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderListView = () => (
    <div className="mx-4 mt-4 space-y-4">
      <div className="space-y-3">
        {debts.map((debt) => {
          const status = getPaymentStatus(debt);
          const statusBadge = getStatusBadge(status);
          const Icon = getDebtIcon(debt);
          
          return (
            <Card key={debt.id} className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${getDebtBgColor(debt)} flex items-center justify-center`}>
                      <Icon className={`w-3.5 h-3.5 ${debt.color === 'blue' ? 'text-[#667eea]' : debt.color === 'green' ? 'text-green-600' : 'text-red-500'}`} />
                    </div>
                    <div>
                      <h4 className="text-[16px] font-semibold text-gray-900">{debt.name}</h4>
                      <p className="text-[12px] text-gray-500">Due {debt.nextPayment} • ${debt.monthlyPayment}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${getDebtColor(debt)}`} />
                        <span className="text-[11px] text-gray-400">{debt.type}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Badge className={`text-[12px] ${statusBadge.className}`}>
                      {statusBadge.label}
                    </Badge>
                    <div className="mt-2">
                      <Button
                        size="sm"
                        onClick={() => onPageChange('add-payment')}
                        className="h-6 px-2 text-xs bg-[#667eea] hover:bg-[#5a6fd8] text-white"
                      >
                        Pay Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="p-4 space-y-4">
      {renderViewToggle()}
      
      {viewMode === 'month' ? (
        <>
          {renderCalendar()}
          {renderUpcomingPayments()}
          {renderMonthlySummary()}
        </>
      ) : (
        <>
          {renderListView()}
          {renderMonthlySummary()}
        </>
      )}
    </div>
  );
}
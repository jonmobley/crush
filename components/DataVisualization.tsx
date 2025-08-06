import React, { useMemo } from 'react';
import {
  LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, TrendingDown, TrendingUp, DollarSign, Target, Clock } from 'lucide-react';

interface Debt {
  id: string;
  name: string;
  remaining: number;
  original: number;
  monthlyPayment: number;
  interestRate: number;
  paymentStrategy?: string;
  dueDate?: string;
}

interface DataVisualizationProps {
  debts: Debt[];
  metrics: {
    totalDebt?: number;
    totalMonthlyPayments?: number;
    overallProgress?: number;
    totalPaid?: number;
    averageInterestRate?: number;
    totalInterestRemaining?: number;
  };
  className?: string;
  chartType?: 'timeline' | 'breakdown' | 'composition' | 'progress' | 'cashflow' | 'all';
}

export function DataVisualization({ 
  debts = [], 
  metrics = {}, 
  className = '',
  chartType = 'all'
}: DataVisualizationProps) {
  
  // Safe metric access with defaults
  const safeMetrics = {
    totalDebt: metrics.totalDebt || 0,
    totalMonthlyPayments: metrics.totalMonthlyPayments || 0,
    overallProgress: metrics.overallProgress || 0,
    totalPaid: metrics.totalPaid || 0,
    averageInterestRate: metrics.averageInterestRate || 0,
    totalInterestRemaining: metrics.totalInterestRemaining || 0
  };
  
  // Calculate payoff timeline data
  const timelineData = useMemo(() => {
    if (!debts || debts.length === 0) return [];
    
    const monthlyData = [];
    let currentMonth = 0;
    const maxMonths = 60; // 5 years max for visualization
    
    // Create a copy of debts to simulate payoff
    let remainingDebts = debts.map(debt => ({
      ...debt,
      remainingBalance: debt.remaining || 0
    }));
    
    while (currentMonth < maxMonths && remainingDebts.some(d => d.remainingBalance > 0)) {
      const monthData: any = {
        month: currentMonth,
        totalDebt: remainingDebts.reduce((sum, debt) => sum + (debt.remainingBalance || 0), 0),
        totalPaid: debts.reduce((sum, debt) => sum + (debt.remaining || 0), 0) - 
                   remainingDebts.reduce((sum, debt) => sum + (debt.remainingBalance || 0), 0)
      };
      
      // Add individual debt tracking
      remainingDebts.forEach(debt => {
        monthData[debt.name] = debt.remainingBalance || 0;
      });
      
      monthlyData.push(monthData);
      
      // Simulate monthly payments
      remainingDebts = remainingDebts.map(debt => {
        if ((debt.remainingBalance || 0) <= 0) return debt;
        
        const monthlyInterest = ((debt.remainingBalance || 0) * (debt.interestRate || 0) / 100) / 12;
        const principalPayment = Math.max(0, (debt.monthlyPayment || 0) - monthlyInterest);
        
        return {
          ...debt,
          remainingBalance: Math.max(0, (debt.remainingBalance || 0) - principalPayment)
        };
      });
      
      currentMonth++;
    }
    
    return monthlyData;
  }, [debts]);

  // Calculate debt composition data for pie chart
  const compositionData = useMemo(() => {
    if (!debts || debts.length === 0 || safeMetrics.totalDebt === 0) return [];
    
    return debts.map((debt, index) => ({
      name: debt.name || 'Unknown',
      value: debt.remaining || 0,
      percentage: (((debt.remaining || 0) / safeMetrics.totalDebt) * 100).toFixed(1),
      color: `hsl(var(--chart-${(index % 5) + 1}))`
    }));
  }, [debts, safeMetrics.totalDebt]);

  // Calculate monthly cash flow data
  const cashFlowData = useMemo(() => {
    if (!debts || debts.length === 0) return [];
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const interestPortion = debts.reduce((sum, debt) => 
      sum + (((debt.remaining || 0) * (debt.interestRate || 0) / 100) / 12), 0
    );
    
    return months.map((month) => ({
      month,
      minimumPayments: safeMetrics.totalMonthlyPayments,
      interestPortion,
      principalPortion: Math.max(0, safeMetrics.totalMonthlyPayments - interestPortion)
    }));
  }, [debts, safeMetrics.totalMonthlyPayments]);

  // Calculate progress trend data
  const progressData = useMemo(() => {
    const data = [];
    for (let i = 0; i <= 12; i++) {
      const progressPercent = Math.min(100, safeMetrics.overallProgress + (i * 2)); // Simulate progress
      data.push({
        month: i,
        progress: progressPercent,
        target: Math.min(100, (i / 12) * 100) // Linear target for comparison
      });
    }
    return data;
  }, [safeMetrics.overallProgress]);

  // Payment strategy breakdown
  const strategyData = useMemo(() => {
    if (!debts || debts.length === 0 || safeMetrics.totalDebt === 0) return [];
    
    const strategies = debts.reduce((acc, debt) => {
      const strategy = debt.paymentStrategy || 'minimum';
      acc[strategy] = (acc[strategy] || 0) + (debt.remaining || 0);
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(strategies).map(([strategy, amount]) => ({
      strategy: strategy.charAt(0).toUpperCase() + strategy.slice(1),
      amount,
      percentage: ((amount / safeMetrics.totalDebt) * 100).toFixed(1)
    }));
  }, [debts, safeMetrics.totalDebt]);

  const renderTimelineChart = () => (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-4 h-4 text-chart-1" />
        <h3 className="font-medium text-foreground">Debt Payoff Timeline</h3>
        <Badge variant="outline" className="ml-auto">
          {timelineData.length} months
        </Badge>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="month" 
              className="text-xs fill-muted-foreground"
              tickFormatter={(value) => `${value}m`}
            />
            <YAxis 
              className="text-xs fill-muted-foreground"
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Remaining Debt']}
              labelFormatter={(label) => `Month ${label}`}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Area
              type="monotone"
              dataKey="totalDebt"
              stroke="hsl(var(--chart-1))"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );

  const renderCompositionChart = () => (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-4 h-4 text-chart-2" />
        <h3 className="font-medium text-foreground">Debt Composition</h3>
        <Badge variant="outline" className="ml-auto">
          {debts.length} debts
        </Badge>
      </div>
      
      <div className="h-64 flex items-center">
        <div className="w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={compositionData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                dataKey="value"
                label={false}
              >
                {compositionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Balance']}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="w-1/2 space-y-2">
          {compositionData.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-foreground font-medium truncate">{item.name}</span>
              <span className="text-muted-foreground ml-auto">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );

  const renderCashFlowChart = () => (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="w-4 h-4 text-chart-3" />
        <h3 className="font-medium text-foreground">Monthly Payment Breakdown</h3>
        <Badge variant="outline" className="ml-auto">
          ${safeMetrics.totalMonthlyPayments.toLocaleString()}/mo
        </Badge>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={cashFlowData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
            <YAxis 
              className="text-xs fill-muted-foreground"
              tickFormatter={(value) => `$${value.toFixed(0)}`}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar 
              dataKey="principalPortion" 
              stackId="payment"
              fill="hsl(var(--chart-4))"
              name="Principal"
            />
            <Bar 
              dataKey="interestPortion" 
              stackId="payment"
              fill="hsl(var(--chart-5))"
              name="Interest"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );

  const renderProgressChart = () => (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-chart-4" />
        <h3 className="font-medium text-foreground">Progress Tracking</h3>
        <Badge variant="outline" className="ml-auto">
          {safeMetrics.overallProgress.toFixed(1)}% complete
        </Badge>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="month" 
              className="text-xs fill-muted-foreground"
              tickFormatter={(value) => `${value}m`}
            />
            <YAxis 
              className="text-xs fill-muted-foreground"
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toFixed(1)}%`, '']}
              labelFormatter={(label) => `Month ${label}`}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="progress"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 4 }}
              name="Actual Progress"
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
              name="Target Progress"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );

  const renderQuickStats = () => (
    <div className="grid grid-cols-2 gap-3 mb-4">
      <Card className="p-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-chart-1" />
          <div>
            <p className="text-xs text-muted-foreground">Est. Payoff</p>
            <p className="font-medium text-foreground">
              {timelineData.length} months
            </p>
          </div>
        </div>
      </Card>
      
      <Card className="p-3">
        <div className="flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-chart-2" />
          <div>
            <p className="text-xs text-muted-foreground">Monthly Interest</p>
            <p className="font-medium text-foreground">
              ${cashFlowData[0]?.interestPortion?.toFixed(0) || '0'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );

  if (!debts || debts.length === 0) {
    return (
      <Card className={`p-6 text-center ${className}`}>
        <Target className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">Add some debts to see detailed analytics</p>
      </Card>
    );
  }

  // Render specific chart type or all charts
  switch (chartType) {
    case 'timeline':
      return <div className={className}>{renderTimelineChart()}</div>;
    case 'composition':
      return <div className={className}>{renderCompositionChart()}</div>;
    case 'cashflow':
      return <div className={className}>{renderCashFlowChart()}</div>;
    case 'progress':
      return <div className={className}>{renderProgressChart()}</div>;
    case 'breakdown':
      return (
        <div className={`space-y-4 ${className}`}>
          {renderQuickStats()}
          {renderCashFlowChart()}
        </div>
      );
    default:
      return (
        <div className={`space-y-4 ${className}`}>
          {renderQuickStats()}
          {renderTimelineChart()}
          {renderCompositionChart()}
          {renderCashFlowChart()}
          {renderProgressChart()}
        </div>
      );
  }
}
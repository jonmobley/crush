import React, { useState } from 'react';
import { DataVisualization } from '../DataVisualization';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  BarChart3, PieChart, TrendingUp, Calendar, DollarSign, 
  Target, Award, Zap, Clock, ArrowUp, ArrowDown 
} from 'lucide-react';

interface Debt {
  id: string;
  name: string;
  remaining: number;
  original: number;
  monthlyPayment: number;
  interestRate: number;
  nextPayment: string;
  type: string;
  color: string;
}

interface AnalyticsProps {
  debts: Debt[];
  metrics: {
    totalDebt: number;
    totalMonthlyPayments: number;
    overallProgress: number;
    totalPaid: number;
    averageInterestRate: number;
    totalInterestRemaining: number;
  };
  onPageChange: (page: string, debtId?: string) => void;
}

export function Analytics({ debts, metrics, onPageChange }: AnalyticsProps) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const isDemoMode = localStorage.getItem('crushDemoMode') === 'true';

  // Calculate additional metrics for insights
  const calculateInsights = () => {
    if (debts.length === 0) return null;

    const highestDebt = debts.reduce((max, debt) => 
      debt.remaining > max.remaining ? debt : max
    );
    
    const highestRate = debts.reduce((max, debt) => 
      debt.interestRate > max.interestRate ? debt : max
    );

    const totalPaid = debts.reduce((sum, debt) => 
      sum + (debt.original - debt.remaining), 0
    );

    const monthlyInterest = debts.reduce((sum, debt) => 
      sum + ((debt.remaining * debt.interestRate / 100) / 12), 0
    );

    const avgInterestRate = debts.reduce((sum, debt) => 
      sum + debt.interestRate, 0
    ) / debts.length;

    return {
      highestDebt,
      highestRate,
      totalPaid,
      monthlyInterest,
      avgInterestRate,
      debtToIncomeRatio: null, // Would need income data
      payoffVelocity: metrics.overallProgress / 12 // Assume 12 months tracking
    };
  };

  const insights = calculateInsights();

  const renderMetricCard = (
    icon: React.ReactNode,
    title: string,
    value: string,
    subtitle?: string,
    trend?: 'up' | 'down',
    color: string = 'text-foreground'
  ) => (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-muted ${color}`}>
            {icon}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className={`text-xl font-semibold ${color}`}>{value}</p>
            {subtitle && (
              <div className="flex items-center gap-1 mt-1">
                {trend && (
                  trend === 'up' ? 
                    <ArrowUp className="w-3 h-3 text-green-500" /> : 
                    <ArrowDown className="w-3 h-3 text-red-500" />
                )}
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  const renderInsightCard = (
    title: string,
    description: string,
    action?: string,
    actionCallback?: () => void,
    severity: 'info' | 'warning' | 'success' = 'info'
  ) => {
    const severityColors = {
      info: 'border-blue-200 bg-blue-50',
      warning: 'border-amber-200 bg-amber-50',
      success: 'border-green-200 bg-green-50'
    };

    return (
      <Card className={`p-4 ${severityColors[severity]}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-medium text-foreground mb-1">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          {action && actionCallback && (
            <Button
              variant="outline"
              size="sm"
              onClick={actionCallback}
              className="ml-3 flex-shrink-0"
            >
              {action}
            </Button>
          )}
        </div>
      </Card>
    );
  };

  if (debts.length === 0) {
    return (
      <div className="p-4 space-y-6">
        <div className="text-center py-8">
          <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">No Data to Analyze</h2>
          <p className="text-muted-foreground mb-4">
            {isDemoMode 
              ? 'Demo mode is active but no sample data is loaded'
              : 'Add your debts to see detailed analytics and insights'
            }
          </p>
          {isDemoMode ? (
            <div className="space-y-3">
              <Button
                onClick={() => window.location.reload()}
                className="bg-[#667eea] hover:bg-[#5a6fd8] text-white"
              >
                Reload Demo Data
              </Button>
              <Button
                variant="outline"
                onClick={() => onPageChange('profile')}
              >
                Disable Demo Mode
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Button
                onClick={() => onPageChange('add-new-debt')}
                className="bg-[#667eea] hover:bg-[#5a6fd8] text-white"
              >
                Add Your First Debt
              </Button>
              <Button
                variant="outline"
                onClick={() => onPageChange('profile')}
              >
                Try Demo Mode
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">
            {isDemoMode 
              ? 'Exploring sample debt data and insights' 
              : 'Detailed insights into your debt journey'
            }
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isDemoMode && (
            <Badge className="bg-blue-100 text-blue-800">
              Demo Data
            </Badge>
          )}
          <Badge variant="outline" className="hidden sm:flex">
            {debts.length} debt{debts.length !== 1 ? 's' : ''} tracked
          </Badge>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {renderMetricCard(
          <DollarSign className="w-4 h-4" />,
          'Total Debt',
          `$${(metrics.totalDebt || 0).toLocaleString()}`,
          `$${(metrics.totalPaid || 0).toLocaleString()} paid off`,
          'down',
          'text-red-600'
        )}
        
        {renderMetricCard(
          <TrendingUp className="w-4 h-4" />,
          'Progress',
          `${(metrics.overallProgress || 0).toFixed(1)}%`,
          insights ? `${(insights.payoffVelocity || 0).toFixed(1)}% per month` : undefined,
          'up',
          'text-green-600'
        )}
        
        {renderMetricCard(
          <Target className="w-4 h-4" />,
          'Monthly Payment',
          `$${(metrics.totalMonthlyPayments || 0).toLocaleString()}`,
          insights ? `$${(insights.monthlyInterest || 0).toFixed(0)} interest` : undefined,
          undefined,
          'text-blue-600'
        )}
        
        {renderMetricCard(
          <Clock className="w-4 h-4" />,
          'Avg Interest Rate',
          `${(metrics.averageInterestRate || 0).toFixed(1)}%`,
          insights?.highestRate ? `${insights.highestRate.name} highest` : undefined,
          undefined,
          'text-purple-600'
        )}
      </div>

      {/* Tabbed Analytics */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Timeline</span>
          </TabsTrigger>
          <TabsTrigger value="breakdown" className="flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            <span className="hidden sm:inline">Breakdown</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline">Insights</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <DataVisualization 
            debts={debts} 
            metrics={metrics} 
            chartType="all"
          />
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <DataVisualization 
            debts={debts} 
            metrics={metrics} 
            chartType="timeline"
          />
          <DataVisualization 
            debts={debts} 
            metrics={metrics} 
            chartType="progress"
          />
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-4">
            <DataVisualization 
              debts={debts} 
              metrics={metrics} 
              chartType="composition"
            />
            <DataVisualization 
              debts={debts} 
              metrics={metrics} 
              chartType="cashflow"
            />
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Award className="w-5 h-5 text-[#667eea]" />
              Smart Recommendations
            </h3>
            
            {insights && (
              <>
                {insights.highestRate && insights.highestRate.interestRate > 15 && (
                  renderInsightCard(
                    'High Interest Rate Detected',
                    `Your ${insights.highestRate.name} has a ${insights.highestRate.interestRate}% interest rate. Consider paying this off first to save on interest.`,
                    'Focus Here',
                    () => onPageChange('strategies'),
                    'warning'
                  )
                )}

                {insights.monthlyInterest > 200 && (
                  renderInsightCard(
                    'Significant Monthly Interest',
                    `You're paying $${(insights.monthlyInterest || 0).toFixed(0)} monthly in interest charges. Increasing payments could save thousands.`,
                    'Simulate',
                    () => onPageChange('payment-simulator'),
                    'info'
                  )
                )}

                {metrics.overallProgress > 50 && (
                  renderInsightCard(
                    'Great Progress!',
                    `You've completed ${(metrics.overallProgress || 0).toFixed(0)}% of your debt payoff journey. Keep up the momentum!`,
                    'Celebrate',
                    undefined,
                    'success'
                  )
                )}

                {insights.totalPaid > 1000 && (
                  renderInsightCard(
                    'Milestone Achievement',
                    `You've successfully paid off $${(insights.totalPaid || 0).toLocaleString()}! Every payment brings you closer to financial freedom.`,
                    undefined,
                    undefined,
                    'success'
                  )
                )}
              </>
            )}

            <Card className="p-4">
              <h4 className="font-medium text-foreground mb-3">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => onPageChange('payment-simulator')}
                  className="justify-start"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Run Simulation
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onPageChange('strategies')}
                  className="justify-start"
                >
                  <Target className="w-4 h-4 mr-2" />
                  View Strategies
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
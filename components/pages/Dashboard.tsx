import React, { useState } from 'react';
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { LoadingOverlay, SkeletonDebtCard } from "../ui/loading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { SmartInsights } from "../SmartInsights";
import { DataVisualization } from "../DataVisualization";
import { DebtMetrics } from "../../utils/debtCalculations";
import { DebtStoreActions } from "../../hooks/useDebtStore";
import { 
  Plus, Edit3, Calendar, TrendingDown, DollarSign, 
  Target, CheckCircle, AlertCircle, Clock, BarChart3, Eye, RefreshCw,
  TrendingUp
} from "lucide-react";

interface DashboardProps {
  debts: any[];
  metrics: DebtMetrics;
  isLoading: boolean;
  onPageChange: (page: string, debtId?: string) => void;
  debtActions: DebtStoreActions;
}

export function Dashboard({ debts, metrics, isLoading, onPageChange }: DashboardProps) {
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showDetailedCharts, setShowDetailedCharts] = useState(false);
  const isDemoMode = localStorage.getItem('crushDemoMode') === 'true';

  const getDebtProgress = (debt: any) => {
    return ((debt.original - debt.remaining) / debt.original) * 100;
  };

  const getDebtColor = (debt: any) => {
    switch (debt.color) {
      case 'blue': return 'bg-blue-500';
      case 'red': return 'bg-red-500';
      case 'green': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getNextPaymentUrgency = (nextPayment: string) => {
    const today = new Date();
    const daysUntil = Math.ceil((new Date(`${nextPayment}, 2024`).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntil <= 3) return 'urgent';
    if (daysUntil <= 7) return 'soon';
    return 'normal';
  };

  const renderQuickActions = () => (
    <div className="mx-4">
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
          
          {/* Two main action buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => onPageChange('add-payment')}
              className="h-16 flex flex-col items-center justify-center gap-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:from-[#5a6fd8] to-[#6b4397] text-white rounded-lg text-sm"
              disabled={isLoading}
            >
              <DollarSign className="w-5 h-5" />
              <span>Add Payment</span>
            </Button>
            
            <Button
              onClick={() => onPageChange('add-new-debt')}
              className="h-16 flex flex-col items-center justify-center gap-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:from-[#5a6fd8] to-[#6b4397] text-white rounded-lg text-sm"
              disabled={isLoading}
            >
              <Plus className="w-5 h-5" />
              <span>Add Debt</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );



  const renderDebtCard = (debt: any) => {
    const progress = getDebtProgress(debt);
    const urgency = getNextPaymentUrgency(debt.nextPayment);
    
    return (
      <Card key={debt.id} className="shadow-sm hover:shadow-md transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                {debt.name}
                {urgency === 'urgent' && (
                  <Badge className="bg-red-100 text-red-800 text-xs">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Due Soon
                  </Badge>
                )}
              </h4>
              <p className="text-sm text-muted-foreground capitalize">{debt.type}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPageChange('edit-debt', debt.id)}
              className="text-gray-400 hover:text-gray-600 h-6 w-6 p-0"
              disabled={isLoading}
              aria-label={`Edit ${debt.name}`}
            >
              <Edit3 className="w-3 h-3" />
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Remaining</span>
              <span className="font-semibold text-foreground">
                ${debt.remaining.toLocaleString()}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-foreground">{progress.toFixed(0)}% paid</span>
              </div>
              <div className="relative">
                <Progress value={progress} className="h-2" />
                <div 
                  className={`absolute left-0 top-0 h-2 rounded-full ${getDebtColor(debt)}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>Due {debt.nextPayment}</span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">${debt.monthlyPayment}</p>
                <p className="text-xs text-muted-foreground">monthly</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderUpcomingPayments = () => {
    const sortedDebts = [...debts].sort((a, b) => {
      const dateA = new Date(`${a.nextPayment}, 2024`);
      const dateB = new Date(`${b.nextPayment}, 2024`);
      return dateA.getTime() - dateB.getTime();
    });

    return (
      <div className="space-y-3">
        {sortedDebts.slice(0, 3).map((debt) => {
          const urgency = getNextPaymentUrgency(debt.nextPayment);
          
          return (
            <div key={debt.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getDebtColor(debt)}`} />
                <div>
                  <p className="font-medium text-foreground">{debt.name}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>Due {debt.nextPayment}</span>
                    {urgency === 'urgent' && (
                      <Badge className="ml-2 bg-red-100 text-red-800 text-xs">Urgent</Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">${debt.monthlyPayment}</p>
                <Button
                  size="sm"
                  onClick={() => onPageChange('add-payment')}
                  className="mt-1 h-6 px-2 text-xs bg-[#667eea] hover:bg-[#5a6fd8] text-white"
                  disabled={isLoading}
                >
                  Pay Now
                </Button>
              </div>
            </div>
          );
        })}
        
        {debts.length > 3 && (
          <div className="flex justify-center pt-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onPageChange('schedule')}
              className="text-[#667eea] hover:bg-blue-50"
              disabled={isLoading}
            >
              View Full Schedule
            </Button>
          </div>
        )}
      </div>
    );
  };

  if (debts.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] mx-4">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">No debts to track!</h2>
          <p className="text-muted-foreground mb-6">
            {isDemoMode 
              ? 'Demo mode is active but no sample data is loaded.'
              : 'Add a debt to start tracking your payments.'
            }
          </p>
          {isDemoMode ? (
            <div className="space-y-3">
              <Button
                onClick={() => window.location.reload()}
                className="bg-[#667eea] hover:bg-[#5a6fd8] text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reload Demo Data
              </Button>
              <Button
                variant="outline"
                onClick={() => onPageChange('profile')}
                className="w-full"
              >
                Disable Demo Mode
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Button
                onClick={() => {
                  // Restart the onboarding flow
                  localStorage.removeItem('crushOnboardingCompleted');
                  localStorage.removeItem('crushDemoMode');
                  localStorage.removeItem('crushPreferredStrategy');
                  window.location.reload();
                }}
                className="bg-[#667eea] hover:bg-[#5a6fd8] text-white"
                disabled={isLoading}
              >
                <Plus className="w-4 h-4 mr-2" />
                Get Started
              </Button>
              
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">or</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => onPageChange('add-new-debt')}
                    className="flex-1"
                    disabled={isLoading}
                  >
                    Add Debt Directly
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onPageChange('profile')}
                    className="flex-1"
                  >
                    Try Demo Mode
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Determine which upcoming payments section to show open by default
  const hasUrgentPayments = debts.some(debt => getNextPaymentUrgency(debt.nextPayment) === 'urgent');

  return (
    <div className="space-y-4 pb-6">
      {/* Quick Actions - Always at top, not collapsible */}
      {renderQuickActions()}

      {/* Upcoming Payments - Collapsible, open by default if urgent payments exist */}
      {debts.length > 0 && (
        <div className="px-4">
          <Accordion type="single" collapsible defaultValue={hasUrgentPayments ? 'payments' : undefined}>
            <AccordionItem value="payments" className="border-0">
              <Card className="shadow-sm overflow-hidden">
                <AccordionTrigger className="hover:no-underline p-0 border-0">
                  <div className="flex items-center gap-3 w-full p-4">
                    <Calendar className="w-5 h-5 text-[#667eea]" />
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground">Upcoming Payments</h3>
                      <p className="text-xs text-muted-foreground">
                        {hasUrgentPayments ? '⚠️ Urgent payments due' : `Next ${Math.min(3, debts.length)} payment${Math.min(3, debts.length) !== 1 ? 's' : ''}`}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="p-0 border-0">
                  <div className="px-4 pb-4">
                    <LoadingOverlay isLoading={isLoading} loadingText="Loading payments...">
                      {renderUpcomingPayments()}
                    </LoadingOverlay>
                  </div>
                </AccordionContent>
              </Card>
            </AccordionItem>
          </Accordion>
        </div>
      )}

      {/* Smart Insights - Already collapsible, keep existing behavior */}
      {debts.length > 0 && !isLoading && (
        <SmartInsights 
          debts={debts}
          metrics={metrics}
          onPageChange={onPageChange}
        />
      )}

      {/* All Debts Section - Default open if no urgent payments, collapsed if urgent payments to reduce scroll */}
      {debts.length > 0 && (
        <div className="px-4">
          <Accordion type="single" collapsible defaultValue={hasUrgentPayments ? undefined : 'debts'}>
            <AccordionItem value="debts" className="border-0">
              <Card className="shadow-sm overflow-hidden">
                <AccordionTrigger className="hover:no-underline p-0 border-0">
                  <div className="flex items-center gap-3 w-full p-4">
                    <CheckCircle className="w-5 h-5 text-[#667eea]" />
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground">All Debts</h3>
                      <p className="text-xs text-muted-foreground">
                        {debts.length} debt{debts.length !== 1 ? 's' : ''} • ${metrics.totalDebt.toLocaleString()} remaining
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="p-0 border-0">
                  <div className="px-4 pb-4 space-y-3">
                    {isLoading && debts.length === 0 ? (
                      <>
                        <SkeletonDebtCard />
                        <SkeletonDebtCard />
                        <SkeletonDebtCard />
                      </>
                    ) : (
                      debts.map(renderDebtCard)
                    )}
                  </div>
                </AccordionContent>
              </Card>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  );
}
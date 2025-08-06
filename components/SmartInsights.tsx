import React, { useState } from 'react';
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { 
  Lightbulb, TrendingUp, AlertTriangle, Target, DollarSign, 
  Calendar, Zap, CheckCircle, ArrowRight, X,
  Clock, Calculator, Award, Sparkles
} from "lucide-react";
import { Debt, DebtMetrics, calculatePayoffMonths, formatPayoffTime, formatCurrency } from "../utils/debtCalculations";

interface SmartInsightsProps {
  debts: Debt[];
  metrics: DebtMetrics;
  onPageChange: (page: string, debtId?: string) => void;
  onDismissInsight?: (insightId: string) => void;
  dismissedInsights?: string[];
}

interface Insight {
  id: string;
  type: 'opportunity' | 'warning' | 'achievement' | 'tip';
  title: string;
  description: string;
  impact?: string;
  action?: {
    label: string;
    page: string;
    debtId?: string;
  };
  priority: 'high' | 'medium' | 'low';
  icon: React.ReactNode;
  color: string;
}

export function SmartInsights({ debts, metrics, onPageChange, onDismissInsight, dismissedInsights = [] }: SmartInsightsProps) {
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);

  const generateInsights = (): Insight[] => {
    const insights: Insight[] = [];

    if (debts.length === 0) return insights;

    // High-interest debt warning
    const highInterestDebts = debts.filter(debt => debt.interestRate > 18);
    if (highInterestDebts.length > 0) {
      const highestRate = Math.max(...highInterestDebts.map(d => d.interestRate));
      const totalHighInterest = highInterestDebts.reduce((sum, debt) => sum + debt.remaining, 0);
      insights.push({
        id: 'high-interest-warning',
        type: 'warning',
        title: 'High-Interest Debt Alert',
        description: `You have ${formatCurrency(totalHighInterest)} in debt with rates above 18%. The highest is ${highestRate}%.`,
        impact: 'Costing you extra in interest daily',
        action: { label: 'Prioritize Now', page: 'strategies' },
        priority: 'high',
        icon: <AlertTriangle className="w-4 h-4" />,
        color: 'border-red-200 bg-red-50'
      });
    }

    // Extra payment opportunity
    const nextDue = debts.sort((a, b) => new Date(`${a.nextPayment}, 2024`).getTime() - new Date(`${b.nextPayment}, 2024`).getTime())[0];
    if (nextDue && metrics.totalMonthlyPayments > 0) {
      const extraAmount = Math.round(metrics.totalMonthlyPayments * 0.1); // 10% extra
      const payoffMonths = calculatePayoffMonths(nextDue);
      const newPayoffMonths = calculatePayoffMonths({
        ...nextDue,
        monthlyPayment: nextDue.monthlyPayment + extraAmount
      });
      const timeSaved = payoffMonths - newPayoffMonths;
      
      insights.push({
        id: 'extra-payment-opportunity',
        type: 'opportunity',
        title: 'Quick Win Opportunity',
        description: `Adding just ${formatCurrency(extraAmount)}/month to "${nextDue.name}" could save ${formatPayoffTime(timeSaved)}.`,
        impact: `Saves ~${formatCurrency(timeSaved * nextDue.monthlyPayment * 0.1)} in interest`,
        action: { label: 'Simulate Impact', page: 'payment-simulator' },
        priority: 'high',
        icon: <Target className="w-4 h-4" />,
        color: 'border-green-200 bg-green-50'
      });
    }

    // Progress celebration
    if (metrics.overallProgress > 25 && metrics.overallProgress < 30) {
      insights.push({
        id: 'progress-celebration-25',
        type: 'achievement',
        title: 'Quarter Way There! 🎉',
        description: `You've paid off ${metrics.overallProgress.toFixed(0)}% of your total debt. You're building real momentum!`,
        impact: `${formatCurrency(metrics.totalPaid)} paid down so far`,
        priority: 'medium',
        icon: <Award className="w-4 h-4" />,
        color: 'border-purple-200 bg-purple-50'
      });
    }

    // Upcoming payment reminder with optimization
    const upcomingPayments = debts.filter(debt => {
      const today = new Date();
      const dueDate = new Date(`${debt.nextPayment}, 2024`);
      const daysUntil = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntil <= 7 && daysUntil > 0;
    });

    if (upcomingPayments.length > 0) {
      const totalUpcoming = upcomingPayments.reduce((sum, debt) => sum + debt.monthlyPayment, 0);
      insights.push({
        id: 'upcoming-payments',
        type: 'tip',
        title: 'Payments Due This Week',
        description: `${upcomingPayments.length} payment${upcomingPayments.length > 1 ? 's' : ''} totaling ${formatCurrency(totalUpcoming)} due soon.`,
        impact: 'Stay on track with reminders',
        action: { label: 'View Schedule', page: 'schedule' },
        priority: 'medium',
        icon: <Calendar className="w-4 h-4" />,
        color: 'border-amber-200 bg-amber-50'
      });
    }

    // Small debt elimination opportunity
    const smallDebts = debts.filter(debt => debt.remaining < debt.monthlyPayment * 3);
    if (smallDebts.length > 0) {
      const smallest = smallDebts.sort((a, b) => a.remaining - b.remaining)[0];
      insights.push({
        id: 'small-debt-elimination',
        type: 'opportunity',
        title: 'Quick Elimination Opportunity',
        description: `"${smallest.name}" could be paid off in just ${Math.ceil(smallest.remaining / smallest.monthlyPayment)} payments!`,
        impact: 'Free up monthly cash flow sooner',
        action: { label: 'Focus on This Debt', page: 'edit-debt', debtId: smallest.id },
        priority: 'medium',
        icon: <CheckCircle className="w-4 h-4" />,
        color: 'border-green-200 bg-green-50'
      });
    }

    // Avalanche vs current strategy (only show if it would make a significant difference)
    const sortedByInterest = [...debts].sort((a, b) => b.interestRate - a.interestRate);
    const currentPriority = debts.find(debt => debt.remaining > 0);
    if (currentPriority && sortedByInterest[0] && currentPriority.id !== sortedByInterest[0].id && sortedByInterest[0].interestRate > currentPriority.interestRate + 3) {
      const interestDiff = sortedByInterest[0].interestRate - currentPriority.interestRate;
      insights.push({
        id: 'avalanche-recommendation',
        type: 'opportunity',
        title: 'Strategy Optimization',
        description: `Consider targeting "${sortedByInterest[0].name}" first - it has ${interestDiff.toFixed(1)}% higher interest rate.`,
        impact: 'Could save hundreds in interest',
        action: { label: 'Compare Strategies', page: 'strategies' },
        priority: 'medium',
        icon: <Zap className="w-4 h-4" />,
        color: 'border-blue-200 bg-blue-50'
      });
    }

    // Filter out dismissed insights, sort by priority, and limit to prevent overwhelming
    const filteredInsights = insights
      .filter(insight => !dismissedInsights.includes(insight.id))
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });

    // Limit to maximum 4 insights to avoid overwhelming users
    return filteredInsights.slice(0, 4);
  };

  const insights = generateInsights();

  const getInsightIcon = (type: Insight['type']) => {
    switch (type) {
      case 'opportunity': return <Lightbulb className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'achievement': return <Award className="w-5 h-5 text-purple-600" />;
      case 'tip': return <Sparkles className="w-5 h-5 text-blue-600" />;
    }
  };

  const handleInsightAction = (insight: Insight) => {
    if (insight.action) {
      onPageChange(insight.action.page, insight.action.debtId);
    }
  };

  const handleDismissInsight = (insightId: string) => {
    if (onDismissInsight) {
      onDismissInsight(insightId);
    }
  };

  if (insights.length === 0) {
    return (
      <Card className="mx-4 shadow-sm">
        <CardContent className="p-4 text-center">
          <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            You're doing great! Keep up your current debt management strategy.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {/* Collapsible Smart Insights */}
      <div className="px-4">
        <Accordion type="single" collapsible defaultValue="insights">
          <AccordionItem value="insights" className="border-0">
            <Card className="shadow-sm overflow-hidden">
              <AccordionTrigger className="hover:no-underline p-0 border-0">
                <div className="flex items-center gap-3 w-full p-4">
                  <Lightbulb className="w-5 h-5 text-[#667eea]" />
                  <div className="text-left flex-1">
                    <h3 className="font-semibold text-foreground">Smart Insights</h3>
                    <p className="text-xs text-muted-foreground">
                      Personalized recommendations for your debt journey
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {insights.length} tip{insights.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="p-0 border-0">
                <div className="px-4 pb-4 space-y-3">
                  {insights.map((insight) => (
                    <div 
                      key={insight.id} 
                      className={`rounded-lg border ${insight.color} p-4 transition-all duration-200`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          {getInsightIcon(insight.type)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-foreground text-sm">{insight.title}</h4>
                              {insight.priority === 'high' && (
                                <Badge className="text-xs bg-red-100 text-red-800">High Priority</Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                              {insight.description}
                            </p>
                            {insight.impact && (
                              <p className="text-xs text-gray-500 font-medium">
                                💡 {insight.impact}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 ml-2">
                          {insight.action && (
                            <Button
                              size="sm"
                              onClick={() => handleInsightAction(insight)}
                              className="h-7 px-3 text-xs bg-[#667eea] hover:bg-[#5a6fd8] text-white"
                            >
                              {insight.action.label}
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          )}
                          {onDismissInsight && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDismissInsight(insight.id)}
                              className="h-7 w-7 p-0 text-gray-400 hover:text-gray-600"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
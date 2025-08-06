export interface DemoDebt {
  id: string;
  name: string;
  type: 'Auto Loan' | 'Credit Card' | 'Personal Loan' | 'Student Loan' | 'Mortgage' | 'Other';
  remaining: number;
  original: number;
  monthlyPayment: number;
  interestRate: number;
  nextPayment: string;
  color: 'blue' | 'red' | 'green' | 'purple' | 'orange';
  paymentStrategy?: string;
  dueDate?: string;
  notes?: string;
}

// Generate realistic sample data that showcases the app's features
export function generateDemoData(): DemoDebt[] {
  const currentDate = new Date();
  const nextMonth = new Date(currentDate);
  nextMonth.setMonth(currentDate.getMonth() + 1);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Create varied payment due dates
  const getDueDate = (dayOffset: number) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + dayOffset);
    return formatDate(date);
  };

  return [
    {
      id: 'demo-credit-card-1',
      name: 'Chase Sapphire Card',
      type: 'Credit Card',
      original: 12500,
      remaining: 8450,
      monthlyPayment: 285,
      interestRate: 18.99,
      nextPayment: getDueDate(5),
      color: 'red',
      paymentStrategy: 'avalanche',
      notes: 'High interest - prioritize paying off first'
    },
    {
      id: 'demo-auto-loan-1',
      name: '2022 Honda Civic',
      type: 'Auto Loan',
      original: 28000,
      remaining: 22150,
      monthlyPayment: 412,
      interestRate: 4.5,
      nextPayment: getDueDate(12),
      color: 'blue',
      paymentStrategy: 'minimum',
      notes: 'Reliable car loan with good rate'
    },
    {
      id: 'demo-student-loan-1',
      name: 'Federal Student Loan',
      type: 'Student Loan',
      original: 35000,
      remaining: 28750,
      monthlyPayment: 320,
      interestRate: 6.8,
      nextPayment: getDueDate(8),
      color: 'green',
      paymentStrategy: 'snowball',
      notes: 'Federal loan with income-driven repayment'
    },
    {
      id: 'demo-credit-card-2',
      name: 'Capital One Venture',
      type: 'Credit Card',
      original: 5800,
      remaining: 2340,
      monthlyPayment: 125,
      interestRate: 22.49,
      nextPayment: getDueDate(3),
      color: 'red',
      paymentStrategy: 'avalanche',
      notes: 'Almost paid off! Keep momentum going'
    },
    {
      id: 'demo-personal-loan-1',
      name: 'Home Improvement Loan',
      type: 'Personal Loan',
      original: 15000,
      remaining: 11200,
      monthlyPayment: 298,
      interestRate: 8.75,
      nextPayment: getDueDate(15),
      color: 'purple',
      paymentStrategy: 'minimum',
      notes: 'Used for kitchen renovation'
    },
    {
      id: 'demo-credit-card-3',
      name: 'Discover It Card',
      type: 'Credit Card',
      original: 3200,
      remaining: 890,
      monthlyPayment: 89,
      interestRate: 16.99,
      nextPayment: getDueDate(7),
      color: 'orange',
      paymentStrategy: 'snowball',
      notes: 'Small balance - quick win opportunity'
    }
  ];
}

// Calculate demo metrics for consistency
export function calculateDemoMetrics(demoDebts: DemoDebt[]) {
  const totalDebt = demoDebts.reduce((sum, debt) => sum + debt.remaining, 0);
  const totalOriginal = demoDebts.reduce((sum, debt) => sum + debt.original, 0);
  const totalPaid = totalOriginal - totalDebt;
  const totalMonthlyPayments = demoDebts.reduce((sum, debt) => sum + debt.monthlyPayment, 0);
  const overallProgress = totalOriginal > 0 ? (totalPaid / totalOriginal) * 100 : 0;
  
  // Calculate average interest rate weighted by balance
  const totalInterestWeighted = demoDebts.reduce((sum, debt) => 
    sum + (debt.interestRate * debt.remaining), 0
  );
  const avgInterestRate = totalDebt > 0 ? totalInterestWeighted / totalDebt : 0;

  // Calculate total interest charges per month
  const totalInterest = demoDebts.reduce((sum, debt) => 
    sum + ((debt.remaining * debt.interestRate / 100) / 12), 0
  );

  return {
    totalDebt,
    totalOriginal, 
    totalPaid,
    totalMonthlyPayments,
    overallProgress,
    avgInterestRate,
    totalInterest,
    debtCount: demoDebts.length
  };
}

// Demo insights that highlight app features
export function getDemoInsights() {
  return [
    {
      type: 'strategy' as const,
      title: 'High Interest Alert',
      description: 'Your Capital One Venture card has a 22.49% interest rate. Consider paying this off first to save money.',
      action: 'View Strategies',
      severity: 'warning' as const
    },
    {
      type: 'milestone' as const,
      title: 'Almost There!',
      description: 'You\'re only $890 away from paying off your Discover It card completely!',
      action: 'Make Payment',
      severity: 'success' as const
    },
    {
      type: 'savings' as const,
      title: 'Extra Payment Impact',
      description: 'Adding just $100/month could save you $3,240 in interest and 1.5 years of payments.',
      action: 'Simulate',
      severity: 'info' as const
    }
  ];
}

// Payment history for demo mode
export function getDemoPaymentHistory() {
  const currentDate = new Date();
  const history = [];
  
  for (let i = 0; i < 6; i++) {
    const paymentDate = new Date(currentDate);
    paymentDate.setMonth(currentDate.getMonth() - i);
    
    history.push({
      id: `demo-payment-${i}`,
      date: paymentDate.toISOString().split('T')[0],
      amount: 1529 + Math.floor(Math.random() * 200) - 100, // Vary payment amounts slightly
      type: 'regular' as const,
      debts: [
        { id: 'demo-credit-card-1', amount: 285 },
        { id: 'demo-auto-loan-1', amount: 412 },
        { id: 'demo-student-loan-1', amount: 320 },
        { id: 'demo-credit-card-2', amount: 125 },
        { id: 'demo-personal-loan-1', amount: 298 },
        { id: 'demo-credit-card-3', amount: 89 }
      ]
    });
  }
  
  return history;
}

// Demo progress milestones
export function getDemoMilestones() {
  return [
    {
      id: 'demo-milestone-1',
      type: 'debt-payoff',
      title: 'First Debt Paid Off!',
      description: 'You completely paid off your Amazon Store Card',
      date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 45 days ago
      amount: 1250,
      achieved: true
    },
    {
      id: 'demo-milestone-2', 
      type: 'progress-25',
      title: '25% Debt Reduction',
      description: 'You\'ve paid off a quarter of your total debt!',
      date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90 days ago
      amount: 25000,
      achieved: true
    },
    {
      id: 'demo-milestone-3',
      type: 'debt-payoff',
      title: 'Next Goal: Discover Card',
      description: 'Only $890 remaining on your smallest debt',
      date: null,
      amount: 890,
      achieved: false
    }
  ];
}

// Export all demo data as a cohesive package
export const DEMO_DATA = {
  debts: generateDemoData(),
  insights: getDemoInsights(),
  paymentHistory: getDemoPaymentHistory(),
  milestones: getDemoMilestones(),
  metrics: calculateDemoMetrics(generateDemoData())
};

// Utility to check if demo mode should be available
export function shouldShowDemoMode(): boolean {
  // Always show demo mode option - users can try it even with existing data
  return true;
}

// Utility to safely enable demo mode
export function canEnableDemoMode(hasRealData: boolean): boolean {
  // Allow demo mode even with real data, but warn user
  return true;
}
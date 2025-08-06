export interface Debt {
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

export interface DebtMetrics {
  totalDebt: number;
  totalOriginal: number;
  totalPaid: number;
  totalMonthlyPayments: number;
  overallProgress: number;
  averageInterestRate: number;
  estimatedPayoffDate: Date;
  totalInterestRemaining: number;
}

/**
 * Calculate the number of months to pay off a debt
 */
export const calculatePayoffMonths = (debt: Debt): number => {
  const { remaining, monthlyPayment, interestRate } = debt;
  
  if (remaining <= 0) return 0;
  if (monthlyPayment <= 0) return Infinity;
  
  const monthlyRate = interestRate / 100 / 12;
  
  // If no interest, simple division
  if (monthlyRate === 0) {
    return Math.ceil(remaining / monthlyPayment);
  }
  
  // Compound interest calculation
  const months = Math.log(1 + (remaining * monthlyRate) / monthlyPayment) / Math.log(1 + monthlyRate);
  return Math.max(0, Math.ceil(months));
};

/**
 * Calculate total interest that will be paid over the life of the debt
 */
export const calculateTotalInterest = (debt: Debt): number => {
  const months = calculatePayoffMonths(debt);
  if (months === Infinity || months === 0) return 0;
  
  return Math.max(0, (months * debt.monthlyPayment) - debt.remaining);
};

/**
 * Calculate the impact of an extra payment
 */
export const calculateExtraPaymentImpact = (debt: Debt, extraPayment: number) => {
  const originalMonths = calculatePayoffMonths(debt);
  const originalInterest = calculateTotalInterest(debt);
  
  // Create a new debt object with reduced balance
  const newDebt: Debt = {
    ...debt,
    remaining: Math.max(0, debt.remaining - extraPayment)
  };
  
  const newMonths = calculatePayoffMonths(newDebt);
  const newInterest = calculateTotalInterest(newDebt);
  
  const timeSavedMonths = Math.max(0, originalMonths - newMonths);
  const interestSaved = Math.max(0, originalInterest - newInterest);
  
  // Calculate new payoff date
  const payoffDate = new Date();
  payoffDate.setMonth(payoffDate.getMonth() + newMonths);
  
  return {
    timeSavedMonths,
    timeSavedDays: timeSavedMonths * 30,
    interestSaved,
    newPayoffDate: payoffDate,
    newMonthsRemaining: newMonths
  };
};

/**
 * Calculate comprehensive debt metrics
 */
export const calculateDebtMetrics = (debts: Debt[]): DebtMetrics => {
  if (debts.length === 0) {
    return {
      totalDebt: 0,
      totalOriginal: 0,
      totalPaid: 0,
      totalMonthlyPayments: 0,
      overallProgress: 0,
      averageInterestRate: 0,
      estimatedPayoffDate: new Date(),
      totalInterestRemaining: 0
    };
  }
  
  const totalDebt = debts.reduce((sum, debt) => sum + debt.remaining, 0);
  const totalOriginal = debts.reduce((sum, debt) => sum + debt.original, 0);
  const totalPaid = totalOriginal - totalDebt;
  const totalMonthlyPayments = debts.reduce((sum, debt) => sum + debt.monthlyPayment, 0);
  const overallProgress = totalOriginal > 0 ? (totalPaid / totalOriginal) * 100 : 0;
  
  // Weighted average interest rate
  const weightedInterestSum = debts.reduce((sum, debt) => sum + (debt.interestRate * debt.remaining), 0);
  const averageInterestRate = totalDebt > 0 ? weightedInterestSum / totalDebt : 0;
  
  // Estimated payoff date (latest debt)
  const payoffMonths = Math.max(...debts.map(calculatePayoffMonths).filter(months => months !== Infinity));
  const estimatedPayoffDate = new Date();
  estimatedPayoffDate.setMonth(estimatedPayoffDate.getMonth() + (payoffMonths || 0));
  
  // Total interest remaining
  const totalInterestRemaining = debts.reduce((sum, debt) => sum + calculateTotalInterest(debt), 0);
  
  return {
    totalDebt,
    totalOriginal,
    totalPaid,
    totalMonthlyPayments,
    overallProgress,
    averageInterestRate,
    estimatedPayoffDate,
    totalInterestRemaining
  };
};

/**
 * Validate debt input data
 */
export const validateDebt = (debt: Partial<Debt>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!debt.name || debt.name.trim().length === 0) {
    errors.push('Debt name is required');
  } else if (debt.name.length > 50) {
    errors.push('Debt name must be less than 50 characters');
  }
  
  if (typeof debt.remaining !== 'number' || debt.remaining < 0) {
    errors.push('Remaining balance must be a positive number');
  } else if (debt.remaining > 10000000) {
    errors.push('Remaining balance cannot exceed $10,000,000');
  }
  
  if (typeof debt.original !== 'number' || debt.original < 0) {
    errors.push('Original balance must be a positive number');
  } else if (debt.original > 10000000) {
    errors.push('Original balance cannot exceed $10,000,000');
  }
  
  if (debt.remaining && debt.original && debt.remaining > debt.original) {
    errors.push('Remaining balance cannot be greater than original balance');
  }
  
  if (typeof debt.monthlyPayment !== 'number' || debt.monthlyPayment <= 0) {
    errors.push('Monthly payment must be greater than zero');
  } else if (debt.monthlyPayment > 100000) {
    errors.push('Monthly payment cannot exceed $100,000');
  }
  
  if (typeof debt.interestRate !== 'number' || debt.interestRate < 0 || debt.interestRate > 100) {
    errors.push('Interest rate must be between 0% and 100%');
  }
  
  if (!debt.type || !['Auto Loan', 'Credit Card', 'Personal Loan', 'Other'].includes(debt.type)) {
    errors.push('Valid debt type is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Format currency values
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Format percentage values
 */
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

/**
 * Format time in years and months
 */
export const formatPayoffTime = (months: number): string => {
  if (months === 0) return 'Paid off';
  if (months === Infinity) return 'Unable to calculate';
  
  const years = Math.floor(months / 12);
  const remainingMonths = Math.round(months % 12);
  
  if (years === 0) {
    return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  } else if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  } else {
    return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  }
};

/**
 * Debt reduction strategies
 */
export const calculateDebtStrategies = (debts: Debt[]) => {
  // Debt Snowball (smallest balance first)
  const snowball = [...debts].sort((a, b) => a.remaining - b.remaining);
  
  // Debt Avalanche (highest interest rate first)
  const avalanche = [...debts].sort((a, b) => b.interestRate - a.interestRate);
  
  // Custom efficiency score (balance to payment ratio + interest weight)
  const efficiency = [...debts].sort((a, b) => {
    const scoreA = (a.remaining / a.monthlyPayment) * (1 + a.interestRate / 100);
    const scoreB = (b.remaining / b.monthlyPayment) * (1 + b.interestRate / 100);
    return scoreA - scoreB;
  });
  
  return {
    snowball,
    avalanche,
    efficiency
  };
};
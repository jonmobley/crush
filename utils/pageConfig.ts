export interface PageConfig {
  hasHeader: boolean;
  hasFooter: boolean;
  hasBottomPadding: boolean;
  showPWAPrompt: boolean;
  requiresAuth?: boolean;
  preloadComponents?: string[];
}

export const PAGE_CONFIGS: Record<string, PageConfig> = {
  'dashboard': {
    hasHeader: true,
    hasFooter: true,
    hasBottomPadding: true,
    showPWAPrompt: true
  },
  'strategies': {
    hasHeader: true,
    hasFooter: true,
    hasBottomPadding: true,
    showPWAPrompt: true
  },
  'profile': {
    hasHeader: true,
    hasFooter: true,
    hasBottomPadding: true,
    showPWAPrompt: true
  },
  'edit-debt': {
    hasHeader: false,
    hasFooter: false,
    hasBottomPadding: false,
    showPWAPrompt: false,
    preloadComponents: ['Dashboard']
  },
  'add-new-debt': {
    hasHeader: false,
    hasFooter: false,
    hasBottomPadding: false,
    showPWAPrompt: false,
    preloadComponents: ['Dashboard']
  },
  'payment-simulator': {
    hasHeader: false,
    hasFooter: false,
    hasBottomPadding: false,
    showPWAPrompt: false,
    preloadComponents: ['Strategies']
  },
  'reminder-settings': {
    hasHeader: false,
    hasFooter: false,
    hasBottomPadding: false,
    showPWAPrompt: false,
    preloadComponents: ['Profile']
  },
  'add-payment': {
    hasHeader: false,
    hasFooter: false,
    hasBottomPadding: false,
    showPWAPrompt: false,
    preloadComponents: ['Dashboard']
  },
  'schedule': {
    hasHeader: true,
    hasFooter: true,
    hasBottomPadding: true,
    showPWAPrompt: true
  },
  'analytics': {
    hasHeader: true,
    hasFooter: true,
    hasBottomPadding: true,
    showPWAPrompt: true
  }
};

export const getPageConfig = (page: string): PageConfig => {
  return PAGE_CONFIGS[page] || PAGE_CONFIGS['dashboard'];
};

// Navigation configuration
export const NAVIGATION_TABS = [
  { id: 'dashboard', icon: 'Home', label: 'Dashboard' },
  { id: 'analytics', icon: 'TrendingUp', label: 'Analytics' },
  { id: 'schedule', icon: 'Calendar', label: 'Schedule' },
  { id: 'profile', icon: 'User', label: 'Profile' }
] as const;

// PWA shortcut actions
export const PWA_ACTIONS = {
  'payment': 'add-payment',
  'simulate': 'payment-simulator',
  'add-debt': 'add-new-debt',
  'reminders': 'reminder-settings'
} as const;
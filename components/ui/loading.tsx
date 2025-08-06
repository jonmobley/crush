import React from 'react';
import { cn } from './utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div 
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
  className?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  children,
  loadingText = 'Loading...',
  className
}) => {
  return (
    <div className={cn('relative', className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-3">
            <LoadingSpinner size="lg" className="text-[#667eea]" />
            <p className="text-sm text-gray-600 font-medium">{loadingText}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Skeleton components for better loading states
export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('animate-pulse', className)}>
    <div className="bg-gray-200 rounded-lg p-6">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-2 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-6 bg-gray-300 rounded w-1/4"></div>
    </div>
  </div>
);

export const SkeletonDebtCard: React.FC = () => (
  <div className="animate-pulse">
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded w-2/3 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="w-8 h-8 bg-gray-200 rounded"></div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="h-2 bg-gray-200 rounded w-full"></div>
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          <div className="text-right">
            <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-12"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  children,
  loadingText,
  className,
  disabled,
  onClick
}) => {
  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center gap-2 transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading && (
        <LoadingSpinner size="sm" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      )}
      <span className={cn('transition-opacity', isLoading && 'opacity-0')}>
        {isLoading && loadingText ? loadingText : children}
      </span>
    </button>
  );
};
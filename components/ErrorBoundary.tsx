import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { RefreshCw, AlertTriangle, Home, Download } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error);
    console.error('Error info:', errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Log error to external service in production
    if (process.env.NODE_ENV === 'production') {
      // You can integrate with error reporting services like Sentry here
      console.error('Production error:', { error, errorInfo });
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    
    // Try to reload the page if the error persists
    if (this.state.hasError) {
      window.location.reload();
    }
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  handleReportError = () => {
    const errorReport = {
      error: this.state.error?.toString(),
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    const blob = new Blob([JSON.stringify(errorReport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `crush-error-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success('Error report downloaded. Please send this to our support team.');
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
          <Card className="max-w-md w-full shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h1>
                <p className="text-gray-600">
                  We're sorry for the inconvenience. The app encountered an unexpected error.
                </p>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-6 p-4 bg-red-50 rounded-lg text-left">
                  <details className="text-sm">
                    <summary className="font-medium text-red-800 cursor-pointer mb-2">
                      Error Details (Development)
                    </summary>
                    <div className="text-red-700 whitespace-pre-wrap break-all">
                      <strong>Error:</strong> {this.state.error.toString()}
                      {this.state.error.stack && (
                        <>
                          <br /><br />
                          <strong>Stack:</strong><br />
                          {this.state.error.stack}
                        </>
                      )}
                    </div>
                  </details>
                </div>
              )}

              <div className="space-y-3">
                <Button 
                  onClick={this.handleReset}
                  className="w-full bg-[#667eea] hover:bg-[#5a6fd8] text-white"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                
                <Button 
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="w-full"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go to Dashboard
                </Button>
                
                <Button 
                  onClick={this.handleReportError}
                  variant="ghost"
                  className="w-full text-gray-600"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Error Report
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Your data is safe and stored locally. Refreshing the page usually resolves the issue.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easier usage
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};
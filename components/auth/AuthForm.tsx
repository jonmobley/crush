import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader } from '../ui/card';
import { LoadingSpinner } from '../ui/loading';
import { useAuth } from '../../hooks/useAuth';
import { Eye, EyeOff, Mail, Lock, User, Chrome, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AuthFormProps {
  onComplete?: () => void;
}

export function AuthForm({ onComplete }: AuthFormProps) {
  const [authState, authActions] = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation (except for forgot password)
    if (mode !== 'forgot') {
      if (!formData.password) {
        errors.password = 'Password is required';
      } else if (mode === 'signup' && formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }

      // Signup specific validations
      if (mode === 'signup') {
        if (!formData.fullName.trim()) {
          errors.fullName = 'Full name is required';
        }

        if (formData.password !== formData.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match';
        }
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    let success = false;

    switch (mode) {
      case 'signin':
        success = await authActions.signIn(formData.email, formData.password);
        break;
      case 'signup':
        success = await authActions.signUp(formData.email, formData.password, formData.fullName);
        break;
      case 'forgot':
        success = await authActions.resetPassword(formData.email);
        if (success) {
          setMode('signin');
        }
        break;
    }

    if (success && (mode === 'signin' || mode === 'signup')) {
      onComplete?.();
    }
  };

  const handleGoogleSignIn = async () => {
    const success = await authActions.signInWithGoogle();
    if (success) {
      // OAuth redirect will handle completion
      toast.info('Redirecting to Google...');
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      fullName: '',
      confirmPassword: ''
    });
    setValidationErrors({});
    authActions.clearError();
  };

  const switchMode = (newMode: 'signin' | 'signup' | 'forgot') => {
    setMode(newMode);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-[#667eea] rounded-full size-10 flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Crush</h1>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {mode === 'signin' && 'Welcome Back'}
              {mode === 'signup' && 'Create Account'}
              {mode === 'forgot' && 'Reset Password'}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {mode === 'signin' && 'Sign in to manage your debt journey'}
              {mode === 'signup' && 'Start your debt-free journey today'}
              {mode === 'forgot' && 'Enter your email to reset your password'}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {authState.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{authState.error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className={`pl-10 ${validationErrors.fullName ? 'border-red-500' : ''}`}
                    disabled={authState.isLoading}
                  />
                </div>
                {validationErrors.fullName && (
                  <p className="text-red-500 text-xs">{validationErrors.fullName}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`pl-10 ${validationErrors.email ? 'border-red-500' : ''}`}
                  disabled={authState.isLoading}
                />
              </div>
              {validationErrors.email && (
                <p className="text-red-500 text-xs">{validationErrors.email}</p>
              )}
            </div>

            {mode !== 'forgot' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className={`pl-10 pr-10 ${validationErrors.password ? 'border-red-500' : ''}`}
                    disabled={authState.isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    disabled={authState.isLoading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="text-red-500 text-xs">{validationErrors.password}</p>
                )}
              </div>
            )}

            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className={`pl-10 ${validationErrors.confirmPassword ? 'border-red-500' : ''}`}
                    disabled={authState.isLoading}
                  />
                </div>
                {validationErrors.confirmPassword && (
                  <p className="text-red-500 text-xs">{validationErrors.confirmPassword}</p>
                )}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#667eea] hover:bg-[#5a6fd8] text-white"
              disabled={authState.isLoading}
            >
              {authState.isLoading ? (
                <LoadingSpinner size="sm" className="mr-2" />
              ) : null}
              {mode === 'signin' && 'Sign In'}
              {mode === 'signup' && 'Create Account'}
              {mode === 'forgot' && 'Send Reset Email'}
            </Button>
          </form>

          {mode !== 'forgot' && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                className="w-full"
                disabled={authState.isLoading}
              >
                <Chrome className="w-4 h-4 mr-2" />
                Continue with Google
              </Button>
            </>
          )}

          <div className="text-center space-y-2">
            {mode === 'signin' && (
              <>
                <button
                  type="button"
                  onClick={() => switchMode('forgot')}
                  className="text-sm text-[#667eea] hover:underline"
                  disabled={authState.isLoading}
                >
                  Forgot your password?
                </button>
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('signup')}
                    className="text-[#667eea] hover:underline font-medium"
                    disabled={authState.isLoading}
                  >
                    Sign up
                  </button>
                </p>
              </>
            )}

            {mode === 'signup' && (
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('signin')}
                  className="text-[#667eea] hover:underline font-medium"
                  disabled={authState.isLoading}
                >
                  Sign in
                </button>
              </p>
            )}

            {mode === 'forgot' && (
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className="flex items-center justify-center gap-2 text-sm text-[#667eea] hover:underline mx-auto"
                disabled={authState.isLoading}
              >
                <ArrowLeft className="w-3 h-3" />
                Back to sign in
              </button>
            )}
          </div>

          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our{' '}
              <a href="#" className="text-[#667eea] hover:underline">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="text-[#667eea] hover:underline">Privacy Policy</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../utils/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface AuthActions {
  signUp: (email: string, password: string, fullName?: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  updateProfile: (data: { full_name?: string; avatar_url?: string }) => Promise<boolean>;
  clearError: () => void;
}

export const useAuth = (): [AuthState, AuthActions] => {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    isAuthenticated: false,
    error: null
  });

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (mounted) {
        if (error) {
          console.error('Error getting session:', error);
          setState(prev => ({
            ...prev,
            error: error.message,
            isLoading: false
          }));
        } else {
          setState(prev => ({
            ...prev,
            session,
            user: session?.user ?? null,
            isAuthenticated: !!session?.user,
            isLoading: false
          }));
        }
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (mounted) {
          console.log('Auth state changed:', event, session?.user?.email);
          
          setState(prev => ({
            ...prev,
            session,
            user: session?.user ?? null,
            isAuthenticated: !!session?.user,
            isLoading: false,
            error: null // Clear errors on successful auth changes
          }));

          // Show appropriate messages
          if (event === 'SIGNED_IN') {
            toast.success('Welcome back! 👋');
          } else if (event === 'SIGNED_OUT') {
            toast.success('Signed out successfully');
          }
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = useCallback(async (email: string, password: string, fullName?: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Use our server endpoint for signup
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e41c7639/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ email, password, fullName })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      // Now sign in the user
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) {
        throw signInError;
      }

      toast.success('Account created successfully! Welcome to Crush! 🎉');
      return true;
    } catch (error: any) {
      console.error('Signup error:', error);
      const errorMessage = error.message || 'Failed to create account';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false
      }));
      toast.error(errorMessage);
      return false;
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      return true;
    } catch (error: any) {
      console.error('Sign in error:', error);
      const errorMessage = error.message || 'Failed to sign in';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false
      }));
      toast.error(errorMessage);
      return false;
    }
  }, []);

  const signInWithGoogle = useCallback(async (): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) {
        throw error;
      }

      // OAuth redirect will handle the rest
      return true;
    } catch (error: any) {
      console.error('Google sign in error:', error);
      const errorMessage = error.message || 'Failed to sign in with Google';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false
      }));
      toast.error(errorMessage);
      return false;
    }
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const resetPassword = useCallback(async (email: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        throw error;
      }

      toast.success('Password reset email sent! Check your inbox.');
      return true;
    } catch (error: any) {
      console.error('Reset password error:', error);
      const errorMessage = error.message || 'Failed to send reset email';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false
      }));
      toast.error(errorMessage);
      return false;
    }
  }, []);

  const updateProfile = useCallback(async (data: { full_name?: string; avatar_url?: string }): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const { error } = await supabase.auth.updateUser({
        data
      });

      if (error) {
        throw error;
      }

      toast.success('Profile updated successfully!');
      return true;
    } catch (error: any) {
      console.error('Update profile error:', error);
      const errorMessage = error.message || 'Failed to update profile';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false
      }));
      toast.error(errorMessage);
      return false;
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return [
    state,
    {
      signUp,
      signIn,
      signInWithGoogle,
      signOut,
      resetPassword,
      updateProfile,
      clearError
    }
  ];
};
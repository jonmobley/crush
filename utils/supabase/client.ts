import { createClient } from '@supabase/supabase-js'
import { projectId, publicAnonKey } from './info'

export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
)

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
          preferences: any | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          preferences?: any | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          preferences?: any | null
        }
      }
      user_debts: {
        Row: {
          id: string
          user_id: string
          name: string
          type: 'Auto Loan' | 'Credit Card' | 'Personal Loan' | 'Other'
          remaining: number
          original: number
          monthly_payment: number
          interest_rate: number
          next_payment: string
          color: 'blue' | 'red' | 'green'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          type: 'Auto Loan' | 'Credit Card' | 'Personal Loan' | 'Other'
          remaining: number
          original: number
          monthly_payment: number
          interest_rate: number
          next_payment: string
          color: 'blue' | 'red' | 'green'
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          type?: 'Auto Loan' | 'Credit Card' | 'Personal Loan' | 'Other'
          remaining?: number
          original?: number
          monthly_payment?: number
          interest_rate?: number
          next_payment?: string
          color?: 'blue' | 'red' | 'green'
        }
      }
      payment_history: {
        Row: {
          id: string
          user_id: string
          debt_id: string
          amount: number
          payment_date: string
          payment_type: 'regular' | 'extra' | 'manual'
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          debt_id: string
          amount: number
          payment_date: string
          payment_type: 'regular' | 'extra' | 'manual'
          notes?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          debt_id?: string
          amount?: number
          payment_date?: string
          payment_type?: 'regular' | 'extra' | 'manual'
          notes?: string | null
        }
      }
      debt_goals: {
        Row: {
          id: string
          user_id: string
          debt_id: string | null
          goal_type: 'payoff_date' | 'payment_amount' | 'total_interest'
          target_value: number
          target_date: string | null
          is_achieved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          debt_id?: string | null
          goal_type: 'payoff_date' | 'payment_amount' | 'total_interest'
          target_value: number
          target_date?: string | null
          is_achieved?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          debt_id?: string | null
          goal_type?: 'payoff_date' | 'payment_amount' | 'total_interest'
          target_value?: number
          target_date?: string | null
          is_achieved?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type UserProfile = Database['public']['Tables']['user_profiles']['Row']
export type UserDebt = Database['public']['Tables']['user_debts']['Row']
export type PaymentRecord = Database['public']['Tables']['payment_history']['Row']
export type DebtGoal = Database['public']['Tables']['debt_goals']['Row']
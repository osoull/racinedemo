export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string | null
          role: 'admin' | 'user'
          created_at: string
        }
        Insert: {
          id: string
          name?: string | null
          role?: 'admin' | 'user'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          role?: 'admin' | 'user'
          created_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string | null
          target_amount: number
          raised_amount: number
          category: string
          status: 'active' | 'completed' | 'cancelled'
          created_at: string
          end_date: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          target_amount: number
          raised_amount?: number
          category: string
          status?: 'active' | 'completed' | 'cancelled'
          created_at?: string
          end_date: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          target_amount?: number
          raised_amount?: number
          category?: string
          status?: 'active' | 'completed' | 'cancelled'
          created_at?: string
          end_date?: string
        }
      }
      investments: {
        Row: {
          id: string
          user_id: string
          project_id: string
          amount: number
          status: 'pending' | 'completed' | 'cancelled'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          project_id: string
          amount: number
          status?: 'pending' | 'completed' | 'cancelled'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          project_id?: string
          amount?: number
          status?: 'pending' | 'completed' | 'cancelled'
          created_at?: string
        }
      }
    }
  }
}
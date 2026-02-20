import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface LinkItem {
  id: number
  title: string
  url: string
  color: string
  icon: string
  is_active: boolean
  sort_order: number
  created_at: string
}

import { createClient } from '@supabase/supabase-js'

// Your Supabase project credentials
const supabaseUrl = 'https://dhecfbzffafcokyfzfyq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoZWNmYnpmZmFmY29reWZ6ZnlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2OTcyMjgsImV4cCI6MjA3NjI3MzIyOH0.Mj2at01mYsiIDhS4jdiKZmu12jKru0oXpxj7h08LSvU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  published_at: string
  image_url: string
  tags: string[]
  slug: string
  featured: boolean
  read_time: number
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'editor'
  created_at: string
  is_approved: boolean
}

// Admin whitelist - only these emails can access admin panel
export const ADMIN_WHITELIST = [
  'admin@flash.com'       // Main admin email

]

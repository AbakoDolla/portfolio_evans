import { createClient } from '@supabase/supabase-js'
const url  = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? ''
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
const svc  = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
export const db = (url && anon) ? createClient(url, anon) : null
export const dbAdmin = (url && svc)
  ? createClient(url, svc, { auth: { persistSession: false } })
  : null

import { createClient } from '@supabase/supabase-js'

// MOCK MODE: If keys are missing, we log a warning but don't crash immediately.
// In a real app, these would be required.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

if (process.env.NEXT_PUBLIC_SUPABASE_URL === undefined) {
    console.warn('BLAST WARNING: Supabase URL is missing. Running in Mock Mode.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

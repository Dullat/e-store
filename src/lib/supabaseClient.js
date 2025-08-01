import { createClient } from '@supabase/supabase-js'
const API_KEY = import.meta.env.VITE_SUPABASE_API_KEY
const API_URL = import.meta.env.VITE_SUPABASE_URL

const supabaseUrl = 'https://yhqqcdkfltojjhtvcvwp.supabase.co'
export const supabase = createClient(API_URL, API_KEY)
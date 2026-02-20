import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

// Real-time subscription helper for tasks
export const subscribeToTasks = (callback: (payload: any) => void) => {
  const subscription = supabase
    .channel('tasks-channel')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'tasks',
      },
      (payload) => {
        callback(payload)
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(subscription)
  }
}
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Singleton: evita múltiples instancias GoTrueClient que rompen la autenticación
let clientInstance = null;

export function createClient() {
  if (!clientInstance) {
    clientInstance = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }
  return clientInstance;
}

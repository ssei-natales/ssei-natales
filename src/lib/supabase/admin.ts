import { createClient } from "@supabase/supabase-js";

// Cliente con la service_role key — evita RLS y puede crear usuarios de
// Auth directamente. Server-only: nunca importar desde un componente
// cliente ni exponer esta key con prefijo NEXT_PUBLIC_.
export function createAdminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

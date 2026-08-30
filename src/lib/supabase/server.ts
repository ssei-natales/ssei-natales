import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { createTimedFetch } from "@/lib/supabase/timed-fetch";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: { fetch: createTimedFetch(8000) },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Called from a Server Component — session refresh is handled by proxy.ts instead.
          }
        },
      },
    },
  );
}

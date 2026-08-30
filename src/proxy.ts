import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { createTimedFetch } from "@/lib/supabase/timed-fetch";

// Server Components no pueden escribir cookies — sin este proxy, cuando el
// access token vence (~1h) el intento de refresh en un layout no persiste y
// la sesión se corta aunque el refresh token siga siendo válido. Este proxy
// corre en cada navegación y sí puede persistir el cookie renovado, así la
// sesión se mantiene mientras el usuario siga volviendo. No hace redirects
// — eso ya lo maneja cada layout protegido (un solo chequeo, un solo lugar).
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: { fetch: createTimedFetch(8000) },
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  try {
    await supabase.auth.getUser();
  } catch {
    // Si Supabase no responde a tiempo, dejamos pasar la navegación igual
    // en vez de romper cada página del sitio.
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|logo/).*)"],
};

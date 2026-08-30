import { createClient } from "@/lib/supabase/server";
import { getSubcategorias } from "@/lib/data/subcategorias";
import { SiteNavbar } from "@/components/site-navbar";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    isAdmin = profile?.role === "admin";
  }

  const subcategorias = user ? await getSubcategorias() : [];

  return (
    <div className="bg-ambient min-h-screen overflow-x-hidden">
      <SiteNavbar subcategorias={subcategorias} isAuthenticated={!!user} isAdmin={isAdmin} />
      <main className="mx-auto max-w-5xl px-6 py-12 sm:px-8">{children}</main>
    </div>
  );
}

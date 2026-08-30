import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { AdminNav } from "./admin-nav";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/admin");
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="bg-ambient min-h-screen">
      <header className="glass glass-glow sticky top-4 z-40 mx-4 mt-4 flex items-center justify-between rounded-3xl px-6 py-4 sm:mx-6 sm:mt-6">
        <span className="font-[family-name:var(--font-brand)] text-sm">SSEI Natales — Admin</span>
        <AdminNav />
        <form action={signOut}>
          <Button type="submit" variant="outline" size="sm">
            Cerrar sesión
          </Button>
        </form>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}

import Link from "next/link";
import { redirect } from "next/navigation";
import { Home } from "lucide-react";
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
        <div className="flex items-center gap-4">
          <span className="font-[family-name:var(--font-brand)] text-sm">SSEI Natales — Admin</span>
          <Button
            size="sm"
            className="gap-1.5 bg-blue text-blue-foreground hover:bg-blue/90"
            render={<Link href="/" />}
            nativeButton={false}
          >
            <Home className="size-3.5" />
            Volver al inicio
          </Button>
        </div>
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

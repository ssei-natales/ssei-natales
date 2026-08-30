import { getSubcategorias } from "@/lib/data/subcategorias";
import { SiteSidebar } from "@/components/site-sidebar";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const subcategorias = await getSubcategorias();

  return (
    <div className="flex min-h-screen">
      <SiteSidebar subcategorias={subcategorias} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

import { getSubcategorias } from "@/lib/data/subcategorias";
import { SiteNavbar } from "@/components/site-navbar";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const subcategorias = await getSubcategorias();

  return (
    <div className="bg-ambient min-h-screen">
      <SiteNavbar subcategorias={subcategorias} />
      <main className="mx-auto max-w-5xl px-6 py-12 sm:px-8">{children}</main>
    </div>
  );
}

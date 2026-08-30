import { createClient } from "@/lib/supabase/server";
import { AddSubcategoriaForm } from "./add-subcategoria-form";
import { SubcategoriaSection } from "./subcategoria-section";

export default async function AdminHomePage() {
  const supabase = await createClient();
  const [{ data: subcategorias }, { data: links }] = await Promise.all([
    supabase.from("subcategorias").select("*").order("tipo").order("orden"),
    supabase.from("links").select("*").order("orden"),
  ]);

  const cartillas = subcategorias?.filter((s) => s.tipo === "cartilla") ?? [];
  const documentos = subcategorias?.filter((s) => s.tipo === "documento") ?? [];
  const linksPorSubcategoria = (subcategoriaId: string) => links?.filter((l) => l.subcategoria_id === subcategoriaId) ?? [];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold">Panel de administración</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Cada subcategoría es una página del sitio (ej. "SAM", "Plan Nieve"). Adentro de cada una agregás los botones
          que apuntan a Drive, Forms, Sheets, etc.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Cartillas</h2>
        <div className="space-y-4">
          {cartillas.map((s) => (
            <SubcategoriaSection key={s.id} subcategoria={s} links={linksPorSubcategoria(s.id)} />
          ))}
        </div>
        <AddSubcategoriaForm tipo="cartilla" />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Documentos</h2>
        <div className="space-y-4">
          {documentos.map((s) => (
            <SubcategoriaSection key={s.id} subcategoria={s} links={linksPorSubcategoria(s.id)} />
          ))}
        </div>
        <AddSubcategoriaForm tipo="documento" />
      </section>
    </div>
  );
}

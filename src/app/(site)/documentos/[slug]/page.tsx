import { notFound } from "next/navigation";
import { getSubcategoriaConLinks } from "@/lib/data/subcategorias";
import { Button } from "@/components/ui/button";

export default async function DocumentoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getSubcategoriaConLinks("documento", slug);
  if (!data) notFound();

  const { subcategoria, links } = data;

  return (
    <div>
      <h1 className="text-2xl font-semibold">{subcategoria.nombre}</h1>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <Button
            key={link.id}
            variant="secondary"
            size="lg"
            className="h-auto justify-start py-4 text-left"
            nativeButton={false}
            render={<a href={link.url} target="_blank" rel="noopener noreferrer" />}
          >
            {link.titulo}
          </Button>
        ))}
        {links.length === 0 && <p className="text-sm text-muted-foreground">Todavía no hay nada acá.</p>}
      </div>
    </div>
  );
}

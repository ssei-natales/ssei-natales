import { createClient } from "@/lib/supabase/server";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddLinkForm } from "./add-link-form";
import { LinkRow } from "./link-row";

export default async function AdminHomePage() {
  const supabase = await createClient();
  const { data: links } = await supabase.from("links").select("*").order("categoria").order("orden");

  const cartillas = links?.filter((l) => l.categoria === "cartilla") ?? [];
  const documentos = links?.filter((l) => l.categoria === "documento") ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Panel de administración</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Agregá, editá o eliminá los botones de Cartillas y Documentos del sitio.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="font-medium">Agregar nuevo</h2>
        <AddLinkForm />
      </section>

      <section className="space-y-3">
        <h2 className="font-medium">Cartillas</h2>
        <LinksTable links={cartillas} />
      </section>

      <section className="space-y-3">
        <h2 className="font-medium">Documentos</h2>
        <LinksTable links={documentos} />
      </section>
    </div>
  );
}

function LinksTable({ links }: { links: { id: string; titulo: string; url: string; categoria: string }[] }) {
  if (links.length === 0) {
    return <p className="text-sm text-muted-foreground">Todavía no hay nada acá.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Link</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {links.map((link) => (
          <LinkRow key={link.id} link={link} />
        ))}
      </TableBody>
    </Table>
  );
}

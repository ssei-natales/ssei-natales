import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Link as LinkRow, Subcategoria } from "@/lib/data/subcategorias";

function LinkButton({ link, i }: { link: LinkRow; i: number }) {
  return (
    <Button
      variant="secondary"
      size="lg"
      className="h-auto animate-in fade-in slide-in-from-bottom-2 justify-between rounded-2xl py-4 text-left duration-500"
      style={{ animationDelay: `${i * 60}ms`, animationFillMode: "backwards" }}
      nativeButton={false}
      render={<a href={link.url} target="_blank" rel="noopener noreferrer" />}
    >
      {link.titulo}
      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
    </Button>
  );
}

export function SubcategoriaContent({ subcategoria, links }: { subcategoria: Subcategoria; links: LinkRow[] }) {
  const sinGrupo = links.filter((l) => !l.grupo);
  const grupos = [...new Set(links.filter((l) => l.grupo).map((l) => l.grupo as string))];

  return (
    <div className="glass glass-glow animate-in fade-in slide-in-from-bottom-2 mt-8 rounded-3xl p-8 duration-500 sm:p-10">
      <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase">
        {subcategoria.tipo === "cartilla" ? "Cartillas" : "Documentos"}
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-brand)] text-2xl">{subcategoria.nombre}</h1>
      <div className="mt-4 h-px w-16 bg-gradient-to-r from-primary via-blue to-transparent" />

      {subcategoria.embed_url && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-border/60">
          <iframe src={subcategoria.embed_url} title={subcategoria.nombre} className="h-[70vh] w-full" />
        </div>
      )}

      {links.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">Todavía no hay nada acá.</p>
      ) : (
        <div className="mt-8 space-y-8">
          {sinGrupo.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {sinGrupo.map((link, i) => (
                <LinkButton key={link.id} link={link} i={i} />
              ))}
            </div>
          )}
          {sinGrupo.length > 0 && grupos.length > 0 && (
            <div className="h-px w-full bg-gradient-to-r from-primary via-blue to-transparent" />
          )}
          {grupos.map((grupo) => (
            <div key={grupo}>
              {grupos.length > 1 && <h2 className="mb-3 text-sm font-medium text-muted-foreground">{grupo}</h2>}
              <div className="grid gap-3 sm:grid-cols-2">
                {links
                  .filter((l) => l.grupo === grupo)
                  .map((link, i) => (
                    <LinkButton key={link.id} link={link} i={i} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

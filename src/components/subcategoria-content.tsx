import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toDriveEmbedUrl } from "@/lib/drive-embed";
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

function EmbedBlock({ link, i }: { link: LinkRow; i: number }) {
  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-2 duration-500"
      style={{ animationDelay: `${i * 60}ms`, animationFillMode: "backwards" }}
    >
      <div className="mb-3 flex items-baseline gap-2">
        <h2 className="text-sm font-medium text-muted-foreground">{link.titulo}</h2>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary underline-offset-2 hover:underline"
        >
          Accede a la carpeta
        </a>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border/60">
        <iframe src={toDriveEmbedUrl(link.url)} title={link.titulo} className="h-[70vh] w-full" />
      </div>
    </div>
  );
}

// Dentro de una misma sección, agrupa los botones consecutivos en una
// grilla de 2 columnas, y cada embed ocupa su propio bloque a todo el
// ancho con su título arriba — así se pueden mezclar los dos.
function ItemsBlock({ links }: { links: LinkRow[] }) {
  const blocks: React.ReactNode[] = [];
  let buttonBuffer: LinkRow[] = [];

  const flushButtons = () => {
    if (buttonBuffer.length === 0) return;
    blocks.push(
      <div key={`btns-${blocks.length}`} className="grid gap-3 sm:grid-cols-2">
        {buttonBuffer.map((link, i) => (
          <LinkButton key={link.id} link={link} i={i} />
        ))}
      </div>,
    );
    buttonBuffer = [];
  };

  links.forEach((link, i) => {
    if (link.es_embed) {
      flushButtons();
      blocks.push(<EmbedBlock key={link.id} link={link} i={i} />);
    } else {
      buttonBuffer.push(link);
    }
  });
  flushButtons();

  return <div className="space-y-6">{blocks}</div>;
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

      {links.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">Todavía no hay nada acá.</p>
      ) : (
        <div className="mt-8 space-y-8">
          {sinGrupo.length > 0 && <ItemsBlock links={sinGrupo} />}
          {sinGrupo.length > 0 && grupos.length > 0 && (
            <div className="h-px w-full bg-gradient-to-r from-primary via-blue to-transparent" />
          )}
          {grupos.map((grupo) => (
            <div key={grupo}>
              {grupos.length > 1 && <h2 className="mb-3 text-sm font-medium text-muted-foreground">{grupo}</h2>}
              <ItemsBlock links={links.filter((l) => l.grupo === grupo)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

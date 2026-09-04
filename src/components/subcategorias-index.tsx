import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Subcategoria } from "@/lib/data/subcategorias";

export function SubcategoriasIndex({
  titulo,
  basePath,
  items,
}: {
  titulo: string;
  basePath: string;
  items: Subcategoria[];
}) {
  return (
    <div className="glass glass-glow animate-in fade-in slide-in-from-bottom-2 mt-8 rounded-3xl p-8 duration-500 sm:p-10">
      <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase">Servicio SSEI</p>
      <h1 className="mt-2 font-[family-name:var(--font-brand)] text-2xl">{titulo}</h1>
      <div className="mt-4 h-px w-16 bg-gradient-to-r from-primary via-blue to-transparent" />

      {items.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">Todavía no hay nada acá.</p>
      ) : (
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {items.map((item, i) => (
            <Button
              key={item.id}
              variant="secondary"
              size="lg"
              className="h-auto animate-in fade-in slide-in-from-bottom-2 justify-between rounded-2xl py-4 text-left duration-500"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: "backwards" }}
              nativeButton={false}
              render={<Link href={`${basePath}/${item.slug}`} />}
            >
              {item.nombre}
              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

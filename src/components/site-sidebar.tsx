"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { Subcategoria } from "@/lib/data/subcategorias";

function DropdownGroup({
  titulo,
  basePath,
  items,
}: {
  titulo: string;
  basePath: string;
  items: Subcategoria[];
}) {
  const pathname = usePathname();
  const containsActive = items.some((item) => pathname === `${basePath}/${item.slug}`);
  const [open, setOpen] = useState(containsActive);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        {titulo}
        <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="flex flex-col">
          {items.map((item) => {
            const href = `${basePath}/${item.slug}`;
            const active = pathname === href;
            return (
              <Link
                key={item.id}
                href={href}
                className={`px-6 py-1.5 text-sm ${active ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {item.nombre}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function SiteSidebar({ subcategorias }: { subcategorias: Subcategoria[] }) {
  const cartillas = subcategorias.filter((s) => s.tipo === "cartilla");
  const documentos = subcategorias.filter((s) => s.tipo === "documento");

  return (
    <nav className="flex w-64 shrink-0 flex-col gap-1 border-r py-4">
      <Link
        href="/"
        className="px-3 pb-4 font-[family-name:var(--font-brand)] text-sm tracking-wide"
      >
        SSEI NATALES
      </Link>
      <DropdownGroup titulo="Cartillas" basePath="/cartillas" items={cartillas} />
      <DropdownGroup titulo="Documentos" basePath="/documentos" items={documentos} />
    </nav>
  );
}

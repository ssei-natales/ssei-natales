"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { Subcategoria } from "@/lib/data/subcategorias";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";

function NavDropdown({
  titulo,
  basePath,
  items,
  openGroup,
  setOpenGroup,
}: {
  titulo: string;
  basePath: string;
  items: Subcategoria[];
  openGroup: string | null;
  setOpenGroup: (v: string | null) => void;
}) {
  const pathname = usePathname();
  const open = openGroup === titulo;
  const containsActive = items.some((item) => pathname === `${basePath}/${item.slug}`);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpenGroup(open ? null : titulo)}
        aria-expanded={open}
        className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          open || containsActive ? "text-primary" : "text-foreground/80 hover:text-foreground"
        }`}
      >
        {titulo}
        <ChevronDown className={`size-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`glass glass-glow absolute top-full left-1/2 z-50 mt-2 w-72 -translate-x-1/2 rounded-2xl p-2 transition-all duration-200 ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div className="grid gap-0.5">
          {items.map((item) => {
            const href = `${basePath}/${item.slug}`;
            const active = pathname === href;
            return (
              <Link
                key={item.id}
                href={href}
                onClick={() => setOpenGroup(null)}
                className={`rounded-xl px-3 py-2 text-sm transition-colors ${
                  active ? "bg-accent font-medium text-accent-foreground" : "text-foreground/80 hover:bg-accent/60 hover:text-foreground"
                }`}
              >
                {item.nombre}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function SiteNavbar({ subcategorias }: { subcategorias: Subcategoria[] }) {
  const cartillas = subcategorias.filter((s) => s.tipo === "cartilla");
  const documentos = subcategorias.filter((s) => s.tipo === "documento");
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    }
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  return (
    <header ref={navRef} className="glass glass-glow sticky top-4 z-40 mx-4 mt-4 rounded-3xl sm:mx-6 sm:mt-6">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Logo className="size-9 shrink-0" />
          <span className="flex flex-col leading-none">
            <span className="font-[family-name:var(--font-brand)] text-sm tracking-[0.12em]">SSEI NATALES</span>
            <span className="mt-1 text-[0.7rem] text-muted-foreground">
              Aeródromo Teniente Julio Gallardo · Puerto Natales
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <NavDropdown titulo="Cartillas" basePath="/cartillas" items={cartillas} openGroup={openGroup} setOpenGroup={setOpenGroup} />
          <NavDropdown titulo="Documentos" basePath="/documentos" items={documentos} openGroup={openGroup} setOpenGroup={setOpenGroup} />
          <div className="ml-2 border-l border-border/60 pl-2">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}

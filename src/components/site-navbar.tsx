"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ShieldCheck, UserRound } from "lucide-react";
import type { Subcategoria } from "@/lib/data/subcategorias";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/login/actions";

function EstadoLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors ${
        active ? "bg-blue text-blue-foreground" : "bg-blue/10 text-blue hover:bg-blue/20"
      }`}
    >
      {children}
    </Link>
  );
}

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

export function SiteNavbar({
  subcategorias,
  isAuthenticated,
  isAdmin,
}: {
  subcategorias: Subcategoria[];
  isAuthenticated: boolean;
  isAdmin: boolean;
}) {
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
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-1.5 border-r border-border/60 pr-3 mr-1">
                <EstadoLink href="/estado-cartillas">Estado Cartillas</EstadoLink>
                <EstadoLink href="/estado-era">Estado ERA</EstadoLink>
              </div>
              <NavDropdown titulo="Cartillas" basePath="/cartillas" items={cartillas} openGroup={openGroup} setOpenGroup={setOpenGroup} />
              <NavDropdown titulo="Documentos" basePath="/documentos" items={documentos} openGroup={openGroup} setOpenGroup={setOpenGroup} />
              {isAdmin && (
                <Button variant="ghost" size="sm" className="ml-1 gap-1.5" render={<Link href="/admin" />} nativeButton={false}>
                  <ShieldCheck className="size-3.5" />
                  Admin
                </Button>
              )}
              <div className="ml-2 flex items-center gap-1 border-l border-border/60 pl-2">
                <Button variant="ghost" size="icon" aria-label="Mi cuenta" render={<Link href="/cuenta" />} nativeButton={false}>
                  <UserRound className="size-4" />
                </Button>
                <form action={signOut}>
                  <Button type="submit" variant="ghost" size="sm">
                    Salir
                  </Button>
                </form>
                <ThemeToggle />
              </div>
            </>
          ) : (
            <div className="flex items-center gap-1">
              <Button size="sm" render={<Link href="/login" />} nativeButton={false}>
                Ingresar
              </Button>
              <ThemeToggle />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

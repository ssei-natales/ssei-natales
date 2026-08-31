"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, ShieldCheck, UserRound, X } from "lucide-react";
import type { Subcategoria } from "@/lib/data/subcategorias";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/login/actions";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

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
        className={`glass-menu glass-glow absolute top-full left-1/2 z-50 mt-2 w-72 -translate-x-1/2 rounded-2xl p-2 transition-all duration-200 ${
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

function MobileSection({
  titulo,
  basePath,
  items,
  onNavigate,
}: {
  titulo: string;
  basePath: string;
  items: Subcategoria[];
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const containsActive = items.some((item) => pathname === `${basePath}/${item.slug}`);

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
          expanded || containsActive ? "text-primary" : "text-foreground/80 hover:bg-accent/60"
        }`}
      >
        {titulo}
        <ChevronDown className={`size-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
      </button>
      {expanded && (
        <div className="mb-1 ml-2 grid gap-0.5 border-l border-border/60 pl-2">
          {items.map((item) => {
            const href = `${basePath}/${item.slug}`;
            const active = pathname === href;
            return (
              <Link
                key={item.id}
                href={href}
                onClick={onNavigate}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  active ? "bg-accent font-medium text-accent-foreground" : "text-foreground/70 hover:bg-accent/60"
                }`}
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

function MobileMenu({
  cartillas,
  documentos,
  isAdmin,
  open,
  setOpen,
}: {
  cartillas: Subcategoria[];
  documentos: Subcategoria[];
  isAdmin: boolean;
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const close = () => setOpen(false);

  return (
    <div className="shrink-0 lg:hidden">
      <Button variant="ghost" size="icon" aria-label={open ? "Cerrar menú" : "Abrir menú"} onClick={() => setOpen(!open)}>
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </Button>

      <div
        className={`glass-menu glass-glow absolute inset-x-4 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-2xl p-3 transition-all duration-200 sm:inset-x-6 ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap gap-2 px-1 pb-2">
            <EstadoLink href="/estado-cartillas">Estado Cartillas</EstadoLink>
            <EstadoLink href="/estado-era">Estado ERA</EstadoLink>
          </div>
          <MobileSection titulo="Cartillas" basePath="/cartillas" items={cartillas} onNavigate={close} />
          <MobileSection titulo="Documentos" basePath="/documentos" items={documentos} onNavigate={close} />
          {isAdmin && (
            <Link
              href="/admin"
              onClick={close}
              className="flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-accent/60"
            >
              <ShieldCheck className="size-3.5" />
              Admin
            </Link>
          )}
          <div className="mt-1 flex items-center justify-between border-t border-border/60 pt-2">
            <Link
              href="/cuenta"
              onClick={close}
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-foreground/80 hover:bg-accent/60"
            >
              <UserRound className="size-3.5" />
              Mi cuenta
            </Link>
            <div className="flex items-center gap-1">
              <form action={signOut}>
                <Button type="submit" variant="ghost" size="sm">
                  Salir
                </Button>
              </form>
              <ThemeToggle />
            </div>
          </div>
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  return (
    <header ref={navRef} className="glass glass-glow sticky top-4 z-40 mx-4 mt-4 rounded-3xl sm:mx-6 sm:mt-6">
      <div className="relative flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <Logo className="size-9 shrink-0" />
            <span className="flex min-w-0 flex-col leading-none">
              <span className="font-[family-name:var(--font-brand)] text-sm tracking-[0.12em]">SSEI NATALES</span>
              <span className="mt-1 truncate text-[0.7rem] text-muted-foreground">
                Aeródromo Teniente Julio Gallardo · Puerto Natales
              </span>
            </span>
          </Link>
          <a
            href="https://www.instagram.com/ssei_natales/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram del servicio SSEI Natales"
            className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
          >
            <InstagramIcon className="size-4" />
          </a>
        </div>

        {isAuthenticated ? (
          <>
            <nav className="hidden items-center gap-1 lg:flex">
              <div className="mr-1 flex items-center gap-1.5 border-r border-border/60 pr-3">
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
            </nav>

            <MobileMenu
              cartillas={cartillas}
              documentos={documentos}
              isAdmin={isAdmin}
              open={mobileOpen}
              setOpen={setMobileOpen}
            />
          </>
        ) : (
          <div className="flex shrink-0 items-center gap-1">
            <Button size="sm" render={<Link href="/login" />} nativeButton={false}>
              Ingresar
            </Button>
            <ThemeToggle />
          </div>
        )}
      </div>
    </header>
  );
}

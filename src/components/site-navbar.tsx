"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, ShieldCheck, UserRound, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/login/actions";
import type { Subcategoria } from "@/lib/data/subcategorias";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function EstadoLink({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const active = pathname === "/estado";

  return (
    <Link
      href="/estado"
      onClick={onNavigate}
      className={`rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors ${
        active ? "bg-blue text-blue-foreground" : "bg-blue/10 text-blue hover:bg-blue/20"
      }`}
    >
      Estado
    </Link>
  );
}

// Enlace + botón de despliegue por separado: el texto navega directo a la
// página índice (todas las cartillas/documentos), y la flecha abre un
// listado rápido para saltar a una sección puntual sin pasar por el índice.
function NavDropdownLink({
  href,
  items,
  itemHref,
  children,
}: {
  href: string;
  items: Subcategoria[];
  itemHref: (slug: string) => string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, [open]);

  if (items.length === 0) {
    return (
      <Link
        href={href}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          active ? "text-primary" : "text-foreground/80 hover:text-foreground"
        }`}
      >
        {children}
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative">
      <div
        className={`flex items-center rounded-full transition-colors ${
          active ? "text-primary" : "text-foreground/80 hover:text-foreground"
        }`}
      >
        <Link href={href} className="rounded-full py-2 pl-4 text-sm font-medium">
          {children}
        </Link>
        <button
          type="button"
          aria-label={typeof children === "string" ? `Ver secciones de ${children}` : "Ver secciones"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-full py-2 pr-3 pl-1 hover:text-foreground"
        >
          <ChevronDown className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
      </div>

      <div
        className={`glass-menu glass-glow absolute top-full left-0 z-50 mt-2 max-h-[60vh] w-64 overflow-y-auto rounded-2xl p-1.5 transition-all duration-150 ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        {items.map((item) => (
          <Link
            key={item.id}
            href={itemHref(item.slug)}
            onClick={() => setOpen(false)}
            className="block truncate rounded-xl px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-accent/60 hover:text-foreground"
          >
            {item.nombre}
          </Link>
        ))}
      </div>
    </div>
  );
}

// Mismo concepto que NavDropdownLink, adaptado al menú móvil: el enlace
// principal navega al índice y una flecha despliega el listado debajo,
// indentado, sin salir de la tarjeta del menú.
function MobileNavSection({
  href,
  items,
  itemHref,
  onNavigate,
  children,
}: {
  href: string;
  items: Subcategoria[];
  itemHref: (slug: string) => string;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center gap-1">
        <Link
          href={href}
          onClick={onNavigate}
          className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
            active ? "text-primary" : "text-foreground/80 hover:bg-accent/60"
          }`}
        >
          {children}
        </Link>
        {items.length > 0 && (
          <button
            type="button"
            aria-label={typeof children === "string" ? `Ver secciones de ${children}` : "Ver secciones"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-xl p-2.5 text-foreground/60 hover:bg-accent/60"
          >
            <ChevronDown className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>
      {items.length > 0 && (
        <div className={`grid transition-all duration-200 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            <div className="mt-0.5 ml-3 flex flex-col gap-0.5 border-l border-border/60 py-1 pl-3">
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={itemHref(item.slug)}
                  onClick={onNavigate}
                  className="truncate rounded-lg px-2 py-1.5 text-sm text-foreground/70 transition-colors hover:bg-accent/60 hover:text-foreground"
                >
                  {item.nombre}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileMenu({
  isAdmin,
  cartillas,
  documentos,
  open,
  setOpen,
}: {
  isAdmin: boolean;
  cartillas: Subcategoria[];
  documentos: Subcategoria[];
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
          <div className="px-1 pb-2">
            <EstadoLink onNavigate={close} />
          </div>
          <MobileNavSection href="/cartillas" items={cartillas} itemHref={(slug) => `/cartillas/${slug}`} onNavigate={close}>
            Cartillas
          </MobileNavSection>
          <MobileNavSection href="/documentos" items={documentos} itemHref={(slug) => `/documentos/${slug}`} onNavigate={close}>
            Documentos
          </MobileNavSection>
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
  isAuthenticated,
  isAdmin,
  subcategorias,
}: {
  isAuthenticated: boolean;
  isAdmin: boolean;
  subcategorias: Subcategoria[];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const cartillas = subcategorias.filter((s) => s.tipo === "cartilla");
  const documentos = subcategorias.filter((s) => s.tipo === "documento");

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
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
              <div className="mr-1 border-r border-border/60 pr-3">
                <EstadoLink />
              </div>
              <NavDropdownLink href="/cartillas" items={cartillas} itemHref={(slug) => `/cartillas/${slug}`}>
                Cartillas
              </NavDropdownLink>
              <NavDropdownLink href="/documentos" items={documentos} itemHref={(slug) => `/documentos/${slug}`}>
                Documentos
              </NavDropdownLink>
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

            <MobileMenu isAdmin={isAdmin} cartillas={cartillas} documentos={documentos} open={mobileOpen} setOpen={setMobileOpen} />
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

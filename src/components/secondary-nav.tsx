"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/contacto", label: "Contacto" },
  { href: "/funciones", label: "Funciones" },
];

export function SecondaryNav() {
  const pathname = usePathname();

  return (
    <nav className="glass glass-glow animate-in fade-in slide-in-from-bottom-2 mx-auto mt-6 grid w-11/12 grid-cols-3 gap-3 rounded-full p-2 duration-700 sm:w-3/4 sm:gap-4 sm:p-2.5">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center justify-center rounded-full px-2.5 py-2 text-center text-xs font-semibold whitespace-nowrap transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-sm ${
              active ? "neu-pressed bg-primary/15 text-primary" : "neu-raised bg-white/10 text-foreground/90 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

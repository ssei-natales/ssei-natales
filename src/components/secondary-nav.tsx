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
    <nav className="animate-in fade-in slide-in-from-bottom-2 border-blue/30 bg-blue/10 shadow-blue/10 mx-auto mt-6 flex w-3/4 items-center justify-center gap-2 rounded-full border px-4 py-2 shadow-lg backdrop-blur-xl duration-700 sm:gap-6">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              active ? "bg-blue text-blue-foreground" : "text-blue hover:bg-blue/20"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

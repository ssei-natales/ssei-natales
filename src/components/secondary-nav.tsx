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
    <nav className="animate-in fade-in slide-in-from-bottom-2 border-blue/30 bg-blue/10 mx-auto mt-6 grid w-11/12 grid-cols-3 overflow-hidden rounded-full border px-1 py-1.5 shadow-lg backdrop-blur-xl duration-700 sm:w-3/4 sm:px-2 sm:py-2">
      {links.map((link, i) => {
        const active = pathname === link.href;
        return (
          <div key={link.href} className={`flex items-center justify-center py-1 ${i > 0 ? "border-l border-white/60" : ""}`}>
            <Link
              href={link.href}
              className={`rounded-full px-2.5 py-1.5 text-center text-xs font-semibold whitespace-nowrap shadow-[0_0_10px_rgba(255,255,255,0.55)] transition-colors sm:px-5 sm:py-2 sm:text-sm ${
                active ? "bg-white/50 text-foreground" : "bg-white/25 text-foreground/90 hover:bg-white/40"
              }`}
            >
              {link.label}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}

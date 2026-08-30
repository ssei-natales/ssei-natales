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
    <nav className="animate-in fade-in slide-in-from-bottom-2 border-blue/30 bg-blue/10 mx-auto mt-6 grid w-3/4 grid-cols-3 rounded-full border px-2 py-2 shadow-lg backdrop-blur-xl duration-700">
      {links.map((link, i) => {
        const active = pathname === link.href;
        return (
          <div key={link.href} className={`flex items-center justify-center py-1 ${i > 0 ? "border-l border-white/60" : ""}`}>
            <Link
              href={link.href}
              className={`rounded-full px-5 py-2 text-center text-sm font-semibold shadow-[0_0_16px_rgba(255,255,255,0.6)] transition-colors ${
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

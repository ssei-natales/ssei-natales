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
    <nav className="animate-in fade-in slide-in-from-bottom-2 border-blue/30 bg-blue/10 shadow-blue/10 mx-auto mt-6 flex w-3/4 items-center justify-between rounded-full border px-3 py-2 shadow-lg backdrop-blur-xl duration-700">
      {links.map((link, i) => {
        const active = pathname === link.href;
        return (
          <div key={link.href} className="flex flex-1 items-center justify-center">
            {i > 0 && <span className="mr-2 h-4 w-px bg-white/40 sm:mr-4" />}
            <Link
              href={link.href}
              className={`rounded-full px-4 py-1.5 text-center text-sm font-medium transition-colors ${
                active
                  ? "bg-white/35 text-foreground shadow-[0_1px_6px_rgba(255,255,255,0.5)]"
                  : "bg-white/15 text-foreground/80 hover:bg-white/25"
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

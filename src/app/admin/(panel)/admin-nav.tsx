"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminNav() {
  const pathname = usePathname();
  const links = [
    { href: "/admin", label: "Contenido" },
    { href: "/admin/usuarios", label: "Usuarios" },
  ];

  return (
    <nav className="flex items-center gap-1">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
            pathname === link.href ? "text-primary" : "text-foreground/80 hover:text-foreground"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

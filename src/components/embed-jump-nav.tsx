"use client";

import { useEffect, useState } from "react";
import type { Link as LinkRow } from "@/lib/data/subcategorias";

// Altura aproximada de la barra fija + el margen del navbar principal:
// el embed cuyo borde superior quede más cerca de este punto es "el
// actual" — mismo criterio que usa la barra de Inicio/Funciones/etc.
const ACTIVE_OFFSET = 150;

export function EmbedJumpNav({ embeds }: { embeds: LinkRow[] }) {
  const [activeId, setActiveId] = useState(embeds[0]?.id);

  useEffect(() => {
    let ticking = false;

    function updateActive() {
      ticking = false;
      let closest: string | undefined;
      let closestDistance = Infinity;
      for (const embed of embeds) {
        const el = document.getElementById(`embed-${embed.id}`);
        if (!el) continue;
        const distance = Math.abs(el.getBoundingClientRect().top - ACTIVE_OFFSET);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = embed.id;
        }
      }
      if (closest) setActiveId(closest);
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActive);
    }

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [embeds]);

  return (
    <div className="fixed top-20 left-1/2 z-20 w-full max-w-5xl -translate-x-1/2 px-6 sm:top-24 sm:px-8">
      <div className="glass-menu glass-glow animate-in fade-in slide-in-from-top-2 flex gap-1.5 overflow-x-auto rounded-full p-1.5 duration-500">
        {embeds.map((link) => (
          <a
            key={link.id}
            href={`#embed-${link.id}`}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
              link.id === activeId ? "bg-accent text-accent-foreground" : "text-foreground/80 hover:bg-accent/60 hover:text-foreground"
            }`}
          >
            {link.titulo}
          </a>
        ))}
      </div>
    </div>
  );
}

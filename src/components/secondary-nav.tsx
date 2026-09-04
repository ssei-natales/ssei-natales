"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "inicio", label: "Inicio" },
  { href: "galeria", label: "Galería" },
  { href: "sobre-nosotros", label: "Sobre nosotros" },
  { href: "funciones", label: "Funciones" },
  { href: "contacto", label: "Contacto" },
];

export function SecondaryNav() {
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.href)).filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;
    const container = sections[0].parentElement;
    if (!container) return;

    // Con secciones de altura muy distinta (Funciones es más alta que la
    // pantalla), el % de área visible de un IntersectionObserver nunca cruza
    // un umbral razonable para ella; en cambio, la sección cuyo borde
    // superior está más cerca del tope del contenedor sí funciona siempre.
    let ticking = false;
    function updateActive() {
      ticking = false;
      const scrollTop = container!.scrollTop;
      let closest = sections[0];
      let closestDistance = Infinity;
      for (const section of sections) {
        const distance = Math.abs(section.offsetTop - scrollTop);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = section;
        }
      }
      setActive(closest.id);
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActive);
    }

    updateActive();
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const header = document.querySelector("header");
    const nav = document.getElementById("secondary-nav");

    function updateChromeHeight() {
      if (!nav) return;
      document.documentElement.style.setProperty("--chrome-h", `${nav.getBoundingClientRect().bottom}px`);
    }

    updateChromeHeight();
    window.addEventListener("resize", updateChromeHeight);
    const observer = new ResizeObserver(updateChromeHeight);
    if (header) observer.observe(header);
    if (nav) observer.observe(nav);

    return () => {
      window.removeEventListener("resize", updateChromeHeight);
      observer.disconnect();
    };
  }, []);

  function goTo(id: string) {
    const target = document.getElementById(id);
    const container = target?.parentElement;
    if (!target || !container) return;

    setActive(id);

    // El scroll-snap del contenedor pelea con el scroll suave nativo (lo corta
    // a los pocos px), así que se anima a mano y se desactiva el snap mientras dura.
    const prevSnap = container.style.scrollSnapType;
    container.style.scrollSnapType = "none";

    const start = container.scrollTop;
    const end = target.offsetTop;
    const distance = end - start;
    const duration = 500;
    let startTime: number | null = null;

    function step(timestamp: number) {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      container!.scrollTop = start + distance * eased;
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        container!.style.scrollSnapType = prevSnap;
      }
    }

    requestAnimationFrame(step);
  }

  return (
    <nav
      id="secondary-nav"
      className="glass glass-glow animate-in fade-in slide-in-from-bottom-2 mx-auto mt-2 grid w-11/12 grid-cols-5 gap-2 rounded-full p-2 duration-700 sm:w-3/4 sm:gap-3 sm:p-2.5"
    >
      {links.map((link) => {
        const isActive = active === link.href;
        return (
          <button
            key={link.href}
            type="button"
            onClick={() => goTo(link.href)}
            className={`flex items-center justify-center rounded-full px-2.5 py-2 text-center text-xs font-semibold whitespace-nowrap transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-sm ${
              isActive
                ? "neu-pressed bg-primary/15 text-primary"
                : "neu-raised bg-white/10 text-foreground/90 hover:bg-white/25 dark:bg-white/5 dark:hover:bg-white/15"
            }`}
          >
            {link.label}
          </button>
        );
      })}
    </nav>
  );
}

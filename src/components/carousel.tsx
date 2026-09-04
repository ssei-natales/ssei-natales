"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const GAP = 12; // px, coincide con el gap del track

// El box del carrusel es mucho más ancho que alto (28:9), así que el
// object-cover por defecto (centrado) corta cabezas/pies en fotos donde el
// sujeto no queda al centro vertical — para esos casos puntuales se ancla
// el encuadre hacia arriba o abajo en vez de al centro.
const IMAGE_FOCUS: Record<string, "top" | "bottom"> = {
  "/carousel/08.webp": "bottom",
};

function focusClass(src: string) {
  const focus = IMAGE_FOCUS[src];
  if (focus === "bottom") return "object-bottom";
  if (focus === "top") return "object-top";
  return "object-center";
}

export function Carousel({ images, size = "default" }: { images: string[]; size?: "default" | "large" }) {
  const hasPeeks = images.length > 1;
  // Se clona la última imagen antes de la primera y la primera después de
  // la última, así el track puede seguir girando "hacia adelante" al llegar
  // al final en vez de devolverse visualmente hasta el principio.
  const extended = hasPeeks ? [images[images.length - 1], ...images, images[0]] : images;

  const [trackIndex, setTrackIndex] = useState(hasPeeks ? 1 : 0);
  const [animate, setAnimate] = useState(true);
  const [offset, setOffset] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  // Bloquea nuevos movimientos mientras uno está en curso (transición o el
  // "salto" sin animación al hacer el loop), para que clics rápidos o el
  // autoplay no se crucen con una transición a medio terminar.
  const movingRef = useRef(false);
  // Cuenta regresiva del autoplay: se reinicia cada vez que hay un
  // movimiento (manual o automático), así nunca se encima con un clic
  // reciente y produce un "doble salto".
  const autoplayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const index = hasPeeks ? (trackIndex - 1 + images.length) % images.length : 0;

  function scheduleAutoplay() {
    if (!hasPeeks) return;
    if (autoplayRef.current) clearTimeout(autoplayRef.current);
    autoplayRef.current = setTimeout(() => {
      if (!movingRef.current) {
        movingRef.current = true;
        setTrackIndex((i) => i + 1);
        window.setTimeout(settle, 600);
      }
      scheduleAutoplay();
    }, 6000);
  }

  useEffect(() => {
    scheduleAutoplay();
    return () => {
      if (autoplayRef.current) clearTimeout(autoplayRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPeeks]);

  useEffect(() => {
    function measure() {
      const viewport = viewportRef.current;
      const slide = slideRef.current;
      if (!viewport || !slide) return;
      const vw = viewport.clientWidth;
      const sw = slide.offsetWidth;
      setOffset((vw - sw) / 2 - trackIndex * (sw + GAP));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [trackIndex]);

  if (images.length === 0) return null;

  function settle() {
    // Se llama tanto desde onTransitionEnd como desde un timeout de
    // respaldo (por si la transición no llega a disparar el evento, p.ej.
    // con la pestaña en segundo plano) — el guard evita procesarla dos veces.
    if (!hasPeeks || !movingRef.current) return;
    setTrackIndex((i) => {
      if (i === extended.length - 1) {
        setAnimate(false);
        requestAnimationFrame(() => setAnimate(true));
        movingRef.current = false;
        return 1;
      }
      if (i === 0) {
        setAnimate(false);
        requestAnimationFrame(() => setAnimate(true));
        movingRef.current = false;
        return extended.length - 2;
      }
      movingRef.current = false;
      return i;
    });
  }

  function move(updater: (i: number) => number) {
    if (movingRef.current) return;
    movingRef.current = true;
    setTrackIndex(updater);
    window.setTimeout(settle, 600);
    scheduleAutoplay();
  }

  function prev() {
    move((i) => i - 1);
  }

  function next() {
    move((i) => i + 1);
  }

  function goTo(target: number) {
    if (movingRef.current || target === index) return;
    move(() => target + 1);
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 relative w-full overflow-hidden duration-700 md:left-1/2 md:w-screen md:-translate-x-1/2">
      <div
        ref={viewportRef}
        className={`relative mx-auto w-full overflow-hidden ${
          size === "large" ? "max-w-[calc(80rem+12rem)]" : "max-w-[calc(64rem+9.5rem)]"
        }`}
        style={{
          maskImage: "linear-gradient(to right, transparent, black 48px, black calc(100% - 48px), transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 48px, black calc(100% - 48px), transparent)",
        }}
      >
        <div
          onTransitionEnd={settle}
          className={`flex items-stretch ${animate ? "transition-transform duration-500 ease-in-out" : ""}`}
          style={{ transform: `translateX(${offset}px)`, gap: GAP }}
        >
          {extended.map((src, i) => (
            <div
              key={`${src}-${i}`}
              ref={i === 0 ? slideRef : undefined}
              className={`glass glass-glow relative aspect-[64/27] w-full shrink-0 overflow-hidden rounded-3xl sm:aspect-[28/9] ${
                size === "large" ? "max-w-7xl" : "max-w-5xl"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className={`h-full w-full object-cover ${focusClass(src)} transition-[filter,opacity] duration-500 ${
                  i - 1 === index ? "" : "opacity-80 blur-[0.5px]"
                }`}
              />
              {i - 1 !== index && <div className="absolute inset-0 bg-background/20" />}
            </div>
          ))}
        </div>

        {hasPeeks && (
          <>
            <button
              type="button"
              aria-label="Anterior"
              onClick={prev}
              className="glass absolute top-1/2 left-3 z-10 flex h-16 w-9 -translate-y-1/2 items-center justify-center rounded-2xl transition-colors hover:bg-white/20 sm:h-24 sm:w-11"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Siguiente"
              onClick={next}
              className="glass absolute top-1/2 right-3 z-10 flex h-16 w-9 -translate-y-1/2 items-center justify-center rounded-2xl transition-colors hover:bg-white/20 sm:h-24 sm:w-11"
            >
              <ChevronRight className="size-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {images.map((dotSrc, di) => (
                <button
                  key={dotSrc}
                  aria-label={`Ir a la foto ${di + 1}`}
                  onClick={() => goTo(di)}
                  className={`size-1.5 rounded-full transition-all ${di === index ? "w-4 bg-primary" : "bg-white/60"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

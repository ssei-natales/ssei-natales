"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const RUNWAY_HEIGHT = 2000;
// Punto de la pista al que llega el vehículo al terminar el scroll (se deja
// tal cual, el usuario confirmó que ese punto de llegada está bien).
const ARRIVAL_PCT = 90;
// El avión se ubica más abajo, cerca del borde, para que quede un espacio
// entre el vehículo y la aeronave en vez de tocarse.
const PLANE_TOP_PCT = 97;

export function RunwaySidebar() {
  const frameRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const container = document.getElementById("home-scroll");
    const frame = frameRef.current;
    const strip = stripRef.current;
    if (!container || !frame || !strip) return;

    function update() {
      const max = container!.scrollHeight - container!.clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, container!.scrollTop / max)) : 0;

      // El vehículo queda fijo a media altura del riel; lo que se mueve es la
      // pista (con el avión al final), como una cinta que pasa por detrás.
      const vehicleY = frame!.clientHeight / 2;
      const stripStart = RUNWAY_HEIGHT * 0.08;
      const stripEnd = RUNWAY_HEIGHT * (ARRIVAL_PCT / 100);

      setTranslateY(vehicleY - (stripStart + progress * (stripEnd - stripStart)));
    }

    update();
    container.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      container.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={frameRef} className="fixed top-[var(--chrome-h)] bottom-6 left-8 z-10 hidden w-44 overflow-hidden xl:block">
      <div
        ref={stripRef}
        className="absolute left-0 w-full transition-transform duration-150 ease-out"
        style={{ transform: `translateY(${translateY}px)`, height: RUNWAY_HEIGHT }}
      >
        <Image src="/Barra_lateral/pista.webp" alt="" fill sizes="176px" className="object-fill opacity-90" priority />

        <div
          className="absolute left-1/2 w-36 -translate-x-1/2 -rotate-[16deg]"
          style={{ top: `${PLANE_TOP_PCT}%` }}
        >
          <Image src="/Barra_lateral/avion.webp" alt="" width={280} height={420} className="h-auto w-full drop-shadow-lg" />
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 w-24 -translate-x-1/2 -translate-y-1/2">
        <Image src="/Barra_lateral/vsei.webp" alt="" width={280} height={210} className="h-auto w-full -rotate-90 drop-shadow-lg" />
      </div>
    </div>
  );
}

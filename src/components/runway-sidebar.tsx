"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Distancias fijas en píxeles medidas desde el final de la pista (no en %):
// así, si cambia el alto real de la imagen, el avión y el punto de llegada
// del vehículo se mueven juntos y no se pierden fuera del riel visible.
const PLANE_FROM_END = 70;
const ARRIVAL_FROM_END = PLANE_FROM_END + 120;

export function RunwaySidebar() {
  const frameRef = useRef<HTMLDivElement>(null);
  const runwayRef = useRef<HTMLImageElement>(null);
  const [translateY, setTranslateY] = useState(0);
  const [runwayHeight, setRunwayHeight] = useState(0);

  useEffect(() => {
    const container = document.getElementById("home-scroll");
    const frame = frameRef.current;
    const runway = runwayRef.current;
    if (!container || !frame || !runway) return;

    function update() {
      const runwayH = runway!.clientHeight;
      setRunwayHeight(runwayH);

      const max = container!.scrollHeight - container!.clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, container!.scrollTop / max)) : 0;

      // El vehículo queda fijo a media altura del riel; lo que se mueve es la
      // pista (con el avión al final), como una cinta que pasa por detrás.
      const vehicleY = frame!.clientHeight / 2;
      const stripStart = runwayH * 0.08;
      const stripEnd = runwayH - ARRIVAL_FROM_END;

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

  const planeTopPct = runwayHeight > 0 ? ((runwayHeight - PLANE_FROM_END) / runwayHeight) * 100 : 100;

  return (
    <div ref={frameRef} className="fixed top-[var(--chrome-h)] bottom-6 left-6 z-10 hidden w-32 overflow-hidden xl:block">
      <div className="absolute left-0 w-full transition-transform duration-150 ease-out" style={{ transform: `translateY(${translateY}px)` }}>
        <Image
          ref={runwayRef}
          src="/Barra_lateral/pista-completa-v3.webp"
          alt=""
          width={300}
          height={4185}
          sizes="128px"
          className="h-auto w-full opacity-90"
          priority
        />

        <div className="absolute left-1/2 w-24 -translate-x-1/2 -rotate-[16deg]" style={{ top: `${planeTopPct}%` }}>
          <Image src="/Barra_lateral/avion.webp" alt="" width={280} height={420} className="h-auto w-full drop-shadow-lg" />
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 w-16 -translate-x-1/2 -translate-y-1/2">
        <Image src="/Barra_lateral/vsei.webp" alt="" width={280} height={210} className="h-auto w-full -rotate-90 drop-shadow-lg" />
      </div>
    </div>
  );
}

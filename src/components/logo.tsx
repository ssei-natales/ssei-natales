"use client";

import { useEffect, useRef, useState } from "react";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // El error puede haber ocurrido antes de que React hidrate y enganche
    // onError (la imagen ya se estaba cargando desde el HTML del servidor).
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div className={cn("flex items-center justify-center rounded-full bg-primary/15 text-primary", className)}>
        <Flame className="size-1/2" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src="/logo/ssei-logo.png"
      alt="Escudo SSEI Natales"
      className={cn("object-contain", className)}
      onError={() => setFailed(true)}
    />
  );
}

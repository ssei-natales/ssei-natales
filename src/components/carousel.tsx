"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Carousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % images.length), 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="glass glass-glow animate-in fade-in slide-in-from-bottom-4 mt-6 overflow-hidden rounded-3xl duration-700">
      <div className="relative aspect-video w-full sm:aspect-[21/9]">
        {images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Anterior"
              onClick={prev}
              className="glass absolute top-1/2 left-3 -translate-y-1/2 rounded-full"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Siguiente"
              onClick={next}
              className="glass absolute top-1/2 right-3 -translate-y-1/2 rounded-full"
            >
              <ChevronRight className="size-4" />
            </Button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((src, i) => (
                <button
                  key={src}
                  aria-label={`Ir a la foto ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`size-1.5 rounded-full transition-all ${i === index ? "w-4 bg-primary" : "bg-white/60"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

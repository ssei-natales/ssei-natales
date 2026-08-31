"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function FarewellCharacter() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const container = document.getElementById("home-scroll");
    const target = document.getElementById("contacto");
    if (!container || !target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio > 0.5),
      { root: container, threshold: [0, 0.5, 1] },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`pointer-events-none fixed bottom-0 left-1/2 z-20 w-40 -translate-x-1/2 transition-transform duration-700 ease-out sm:w-48 lg:left-[75%] lg:w-96 ${
        visible ? "translate-y-0" : "translate-y-[110%]"
      }`}
    >
      <Image src="/finalpagina/saludo-final.webp" alt="¡Gracias por interesarte en nuestra página web!" width={560} height={700} className="h-auto w-full drop-shadow-2xl" />
    </div>
  );
}

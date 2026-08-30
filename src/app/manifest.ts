import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SSEI Natales",
    short_name: "SSEI Natales",
    description: "Servicio de Salvamento y Extinción de Incendios — Aeródromo Teniente Julio Gallardo",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      { src: "/logo/ssei-logo.png", sizes: "192x192", type: "image/png" },
      { src: "/logo/ssei-logo.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

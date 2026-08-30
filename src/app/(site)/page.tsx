import fs from "fs";
import path from "path";
import { Logo } from "@/components/logo";
import { Carousel } from "@/components/carousel";
import { SecondaryNav } from "@/components/secondary-nav";

function getCarouselImages(): string[] {
  const dir = path.join(process.cwd(), "public", "carousel");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
      .sort()
      .map((f) => `/carousel/${f}`);
  } catch {
    return [];
  }
}

export default function HomePage() {
  const images = getCarouselImages();

  return (
    <>
      <div className="glass glass-glow animate-in fade-in slide-in-from-bottom-4 mt-8 flex flex-col items-start gap-8 rounded-3xl p-10 duration-700 sm:flex-row sm:items-center sm:p-16">
        <Logo className="size-24 shrink-0 sm:size-32" />
        <div>
          <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase">Servicio SSEI</p>
          <h1 className="mt-3 font-[family-name:var(--font-brand)] text-3xl leading-tight sm:text-4xl">
            SEGURIDAD, SALVAMENTO Y EXTINCIÓN DE INCENDIOS EN AERONAVES
          </h1>
          <div className="mt-6 h-px w-24 bg-gradient-to-r from-primary via-blue to-transparent" />
          <p className="mt-6 max-w-md text-sm text-muted-foreground">Puerto Natales - Magallanes, Chile</p>
        </div>
      </div>

      <SecondaryNav />

      <Carousel images={images} />
    </>
  );
}

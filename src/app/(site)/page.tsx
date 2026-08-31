import fs from "fs";
import path from "path";
import { Logo } from "@/components/logo";
import { Carousel } from "@/components/carousel";
import { SecondaryNav } from "@/components/secondary-nav";
import { FuncionesContent } from "@/components/funciones-content";
import { SobreNosotrosContent } from "@/components/sobre-nosotros-content";
import { ProximamentePanel } from "@/components/proximamente-panel";
import { RunwaySidebar } from "@/components/runway-sidebar";
import { FarewellCharacter } from "@/components/farewell-character";

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
      <SecondaryNav />
      <RunwaySidebar />
      <FarewellCharacter />

      <div className="relative left-1/2 -mb-12 w-screen -translate-x-1/2">
        <div
          id="home-scroll"
          className="h-[calc(100dvh-var(--chrome-h))] snap-y snap-proximity overflow-x-hidden overflow-y-auto scroll-smooth"
        >
          <section id="inicio" className="flex min-h-full w-full snap-start flex-col items-center justify-center gap-4 px-6 py-6">
            <div className="glass glass-glow animate-in fade-in slide-in-from-bottom-4 flex w-full max-w-5xl flex-col items-start gap-4 rounded-3xl p-5 duration-700 sm:flex-row sm:items-center sm:p-6">
              <Logo className="size-14 shrink-0 sm:size-16" />
              <div>
                <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase">Servicio SSEI</p>
                <h1 className="mt-2 font-[family-name:var(--font-brand)] text-2xl leading-tight sm:text-3xl">
                  SEGURIDAD, SALVAMENTO Y EXTINCIÓN DE INCENDIOS EN AERONAVES
                </h1>
                <div className="mt-3 h-px w-24 bg-gradient-to-r from-primary via-blue to-transparent" />
                <p className="mt-3 max-w-md text-sm text-muted-foreground">Puerto Natales - Magallanes, Chile</p>
              </div>
            </div>

            <div className="w-full max-w-5xl">
              <Carousel images={images} />
            </div>
          </section>

          <section
            id="sobre-nosotros"
            className="flex min-h-full w-full snap-start items-center justify-center overflow-y-auto px-6 py-4 lg:h-full lg:overflow-hidden"
          >
            <SobreNosotrosContent />
          </section>

          <section id="funciones" className="min-h-full w-full snap-start px-6 py-8">
            <div className="mx-auto max-w-5xl">
              <FuncionesContent />
            </div>
          </section>

          <section
            id="contacto"
            className="flex min-h-full w-full snap-start items-center justify-center overflow-y-auto px-6 py-8 lg:h-full lg:overflow-hidden"
          >
            <ProximamentePanel titulo="Contacto" />
          </section>
        </div>
      </div>
    </>
  );
}

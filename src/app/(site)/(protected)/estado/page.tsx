const DASHBOARD_URL =
  "https://script.google.com/a/macros/dgac.gob.cl/s/AKfycbw4F5SP2-baxpG-sbQDd5-3YpkRdxdjQRiLpjW_pP60wUIRjZVWidYFAPZ1lIENmxQk/exec";

const ESTADO_ERA_URL =
  "https://docs.google.com/presentation/d/1QPLvFgstYcCFffcj3wq7UuAmz_3eEK6Pw28g0pcSLgk/embed?start=false&loop=false&delayms=3000";

export default function EstadoPage() {
  return (
    <div className="relative left-1/2 mt-8 w-screen -translate-x-1/2 space-y-8 px-4">
      <div>
        <p className="mb-2 text-center text-xs font-medium tracking-[0.2em] text-primary uppercase">Estado Cartillas</p>
        <div className="glass glass-glow overflow-hidden rounded-3xl">
          <iframe src={DASHBOARD_URL} title="Dashboard SSEI" className="h-[48vh] w-full" />
        </div>
      </div>

      <div>
        <p className="mb-2 text-center text-xs font-medium tracking-[0.2em] text-primary uppercase">Estado ERA</p>
        <div className="glass glass-glow overflow-hidden rounded-3xl">
          <iframe src={ESTADO_ERA_URL} title="Estado ERA" className="h-[48vh] w-full" allowFullScreen />
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Usá las flechas dentro del visor para pasar entre las dos páginas.
        </p>
      </div>
    </div>
  );
}

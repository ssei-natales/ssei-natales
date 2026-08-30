const ESTADO_ERA_URL =
  "https://docs.google.com/presentation/d/1QPLvFgstYcCFffcj3wq7UuAmz_3eEK6Pw28g0pcSLgk/embed?start=false&loop=false&delayms=3000";

export default function EstadoEraPage() {
  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 px-4">
      <div className="glass glass-glow overflow-hidden rounded-3xl">
        <iframe src={ESTADO_ERA_URL} title="Estado ERA" className="h-[85vh] w-full" allowFullScreen />
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Usá las flechas dentro del visor para pasar entre las dos páginas.
      </p>
    </div>
  );
}

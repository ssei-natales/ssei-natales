export function ProximamentePanel({ titulo }: { titulo: string }) {
  return (
    <div className="glass glass-glow animate-in fade-in slide-in-from-bottom-2 flex w-full max-w-3xl flex-col items-center justify-center rounded-3xl p-10 text-center duration-500 sm:p-16">
      <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase">Servicio SSEI</p>
      <h1 className="mt-3 font-[family-name:var(--font-brand)] text-3xl sm:text-4xl">{titulo}</h1>
      <div className="mt-6 h-px w-24 bg-gradient-to-r from-primary via-blue to-transparent" />
      <p className="mt-10 font-[family-name:var(--font-brand)] text-2xl text-muted-foreground uppercase sm:text-3xl">Próximamente</p>
    </div>
  );
}

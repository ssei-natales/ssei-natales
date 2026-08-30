import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="glass glass-glow animate-in fade-in slide-in-from-bottom-4 mt-8 rounded-3xl p-10 duration-700 sm:p-16">
      <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase">Servicio SSEI</p>
      <h1 className="mt-3 font-[family-name:var(--font-brand)] text-4xl leading-tight sm:text-5xl">
        AERÓDROMO
        <br />
        TENIENTE JULIO GALLARDO
      </h1>
      <div className="mt-6 h-px w-24 bg-gradient-to-r from-primary via-blue to-transparent" />
      <p className="mt-6 max-w-md text-sm text-muted-foreground">
        {user
          ? "Puerto Natales. Elegí una cartilla o documento en el menú de arriba para acceder al material correspondiente."
          : "Puerto Natales. El acceso a cartillas y documentos es exclusivo para funcionarios del servicio — iniciá sesión arriba a la derecha."}
      </p>
    </div>
  );
}

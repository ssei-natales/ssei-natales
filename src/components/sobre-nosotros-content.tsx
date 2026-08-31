const PARRAFOS = [
  "El Servicio de Salvamento y Extinción de Incendios (SSEI) del Aeródromo Teniente Julio Gallardo tiene como misión contribuir permanentemente a la seguridad de las operaciones aéreas y de quienes utilizan nuestro aeródromo.",
  "Somos un servicio especializado, preparado para responder de manera rápida, coordinada y eficaz ante emergencias aeronáuticas y otras situaciones que puedan producirse dentro del recinto aeroportuario.",
  "Nuestra labor se desarrolla bajo los procedimientos, estándares y normativa establecidos por la Dirección General de Aeronáutica Civil de Chile, manteniendo una preparación constante de nuestro personal y equipamiento.",
  "Contamos con vehículos, equipos de extinción, rescate y protección personal destinados a enfrentar distintos escenarios de emergencia.",
  "Nuestro trabajo diario incluye la revisión y mantención operativa de los recursos SSEI, inspecciones, entrenamiento, instrucción y ejercicios orientados a mantener una capacidad de respuesta permanente.",
  "Participamos además en la coordinación con los distintos servicios del aeródromo y con organismos externos que pueden intervenir ante una emergencia.",
  "Las condiciones propias de Puerto Natales y la Región de Magallanes, caracterizadas por bajas temperaturas, fuertes vientos y condiciones meteorológicas variables, forman parte permanente de nuestra preparación operacional.",
  "Cada procedimiento y entrenamiento tiene como objetivo reducir los tiempos de respuesta y proteger la vida de pasajeros, tripulaciones, trabajadores y usuarios del aeródromo.",
  "La prevención constituye también una parte fundamental de nuestro trabajo, identificando riesgos y colaborando activamente con la seguridad operacional del Aeródromo Teniente Julio Gallardo.",
  "Nuestro compromiso es mantener un servicio preparado, profesional y disponible para responder cuando las circunstancias lo requieran.",
];

const LEMA = "SSEI Teniente Julio Gallardo: preparación, prevención y respuesta al servicio de la seguridad operacional.";

export function SobreNosotrosContent() {
  return (
    <div className="glass glass-glow animate-in fade-in slide-in-from-bottom-2 w-full max-w-5xl rounded-3xl p-4 duration-500 sm:p-5">
      <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase">Servicio SSEI</p>
      <h1 className="mt-1 font-[family-name:var(--font-brand)] text-2xl sm:text-3xl">Sobre nosotros</h1>
      <div className="mt-2 h-px w-24 bg-gradient-to-r from-primary via-blue to-transparent" />

      <div className="mt-2 text-sm leading-tight text-muted-foreground sm:columns-2 sm:gap-10">
        {PARRAFOS.map((p) => (
          <p key={p} className="mb-1 break-inside-avoid">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-2 border-t border-border pt-2">
        <p className="font-[family-name:var(--font-brand)] text-base text-foreground">{LEMA}</p>
      </div>
    </div>
  );
}

import { ImageIcon } from "lucide-react";

const FUNCIONES = [
  {
    titulo: "Planificación de la Respuesta de Emergencia",
    texto:
      "Corresponde determinar y asignar responsabilidades, coordinando recursos humanos y logísticos con otros organismos participantes, para enfrentar emergencias que ocurran en un aeropuerto/aeródromo o en sus inmediaciones.",
  },
  {
    titulo: "Control y Reducción del Peligro Aviario",
    texto:
      "Corresponde aplicar los reglamentos y procedimientos técnicos relacionados con el control y reducción del peligro que representan las aves y otros animales a fin de otorgar seguridad a las operaciones aéreas, en el aeropuerto/aeródromo.",
  },
  {
    titulo: "Prevención y Manejo de Incidentes con Mercancías Peligrosas",
    texto:
      "En todos los aeródromos que cuenten con equipos de respuesta para el manejo y control de incidentes con mercancías peligrosas para responder a Emergencias con Materiales Peligrosos - EREMEP.",
  },
  {
    titulo: "Traslado de Aeronaves Inutilizadas",
    texto:
      "El Servicio SSEI es el responsable de aplicar los procedimientos de recuperación y traslado de aeronaves inutilizadas, cuando estos no sean ejecutados por el explotador.",
  },
  {
    titulo: "Control de Incendios Estructurales, Pastizales y Vehiculares",
    texto:
      "El Servicio SSEI es el responsable de aplicar los procedimientos tendientes a controlar un incendio estructural, de pastizales o vehicular que ocurra en el aeropuerto/aeródromo.",
  },
  {
    titulo: "Rescate en Espacios Confinados, en Altura y Vehicular",
    texto:
      "El Servicio SSEI es el responsable de aplicar los procedimientos de la intervención y aplicación de las técnicas de rescate en accidentes o incidentes vehiculares, en espacios confinados o en altura que ocurran en el aeropuerto/aeródromo.",
  },
  {
    titulo: "Prevención de Riesgos y Protección de Incendios Aeroportuarios",
    texto: "El Servicio SSEI es el responsable de aplicar las inspecciones técnicas de prevención de riesgos y protección de incendios a las diferentes instalaciones.",
  },
  {
    titulo: "Mantención Operativa del Estado de las Superficies",
    texto:
      "El Servicio SSEI es el responsable de aplicar los procedimientos relativos a estas materias, Efectuar la medición de eficacia de frenado, a requerimiento de los servicios de tránsito aéreo.",
  },
  {
    titulo: "Supervisión del Área de Movimientos",
    texto: "El Servicio SSEI es el responsable de efectuar las labores de supervisión del área de movimiento de acuerdo a los procedimientos establecidos.",
  },
  {
    titulo: "Mantenimiento de Vehículos y Equipos Nivel I",
    texto:
      "El Servicio SSEI es el responsable de ejecutar el mantenimiento nivel I, de los vehículos extintores y auxiliares, equipos auxiliares, hidráulicos y material menor.",
  },
  {
    titulo: "Atención de Primeros Auxilios",
    texto:
      "El Servicio SSEI debe otorgar atención de primeros auxilios en aquellas situaciones derivadas de accidentes e incidentes de aeronaves, excepto los de tipo invasivo y administración de medicamentos.",
  },
  {
    titulo: "Apoyo a la Comunidad en caso de Emergencias",
    texto:
      "El Servicio SSEI cuando sea requerido por la autoridad competente podrá asistir y cooperar en las funciones inherentes a su especialidad ayudando a la comunidad.",
  },
];

export default function FuncionesPage() {
  return (
    <div className="glass glass-glow animate-in fade-in slide-in-from-bottom-2 mt-8 rounded-3xl p-8 duration-500 sm:p-10">
      <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase">Servicio SSEI</p>
      <h1 className="mt-2 font-[family-name:var(--font-brand)] text-3xl">Funciones</h1>
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-primary via-blue to-transparent" />

      <div className="mt-12 space-y-16">
        {FUNCIONES.map((f, i) => {
          const reverse = i % 2 === 1;
          return (
            <div
              key={f.titulo}
              className={`animate-in fade-in slide-in-from-bottom-2 flex flex-col gap-6 duration-500 sm:items-center sm:gap-10 ${
                reverse ? "sm:flex-row-reverse" : "sm:flex-row"
              }`}
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: "backwards" }}
            >
              <div className="flex aspect-video shrink-0 items-center justify-center rounded-2xl border border-dashed border-border bg-muted/40 sm:w-72">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <ImageIcon className="size-6" />
                  <span className="text-xs">Foto próximamente</span>
                </div>
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-brand)] text-lg uppercase">{f.titulo}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{f.texto}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

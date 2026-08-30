# SSEI Natales

Webapp institucional del Servicio de Salvamento y Extinción de Incendios — Aeródromo Teniente Julio Gallardo, Puerto Natales.

Reemplaza el Google Sites anterior: acceso centralizado a cartillas (formularios) y documentos (carpetas de Drive), con un panel de administración propio para agregar/editar contenido sin tocar código.

## Stack

- Next.js 16 + TypeScript + Tailwind CSS 4 + shadcn/ui (Base UI)
- Supabase (base de datos + auth del panel admin)
- Deploy en Vercel

## Desarrollo local

```bash
npm install
npm run dev
```

Necesita un `.env.local` con `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` del proyecto de Supabase.

-- ============================================================================
-- SSEI Natales — esquema inicial
--
-- Un solo modelo de datos: los botones de "Cartillas" y "Documentos" que
-- hoy son fijos en el Google Sites. Cada fila = un botón (título + link).
-- El panel /admin agrega/edita/borra filas acá; el sitio público las lee
-- y dibuja los botones — nada queda hardcodeado en el código.
--
-- Acceso: lectura pública (cualquiera que visite el sitio ve los botones),
-- escritura solo para usuarios autenticados (las 2-3 personas del panel
-- admin, creadas a mano en Supabase Auth — sin alta pública).
-- ============================================================================

create extension if not exists "pgcrypto";

create table public.links (
  id uuid primary key default gen_random_uuid(),
  categoria text not null check (categoria in ('cartilla', 'documento')),
  titulo text not null,
  url text not null,
  orden integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index links_categoria_orden_idx on public.links(categoria, orden);

alter table public.links enable row level security;

create policy "links_public_read" on public.links
  for select using (true);

create policy "links_admin_write" on public.links
  for insert with check (auth.uid() is not null);

create policy "links_admin_update" on public.links
  for update using (auth.uid() is not null) with check (auth.uid() is not null);

create policy "links_admin_delete" on public.links
  for delete using (auth.uid() is not null);

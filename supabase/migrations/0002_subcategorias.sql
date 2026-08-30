-- ============================================================================
-- SSEI Natales — segundo nivel de menú
-- Seguro para correr más de una vez (no falla si ya se ejecutó antes).
-- ============================================================================

create table if not exists public.subcategorias (
  id uuid primary key default gen_random_uuid(),
  tipo text not null check (tipo in ('cartilla', 'documento')),
  nombre text not null,
  slug text not null,
  orden integer not null default 0,
  created_at timestamptz not null default now(),
  unique (tipo, slug)
);
create index if not exists subcategorias_tipo_orden_idx on public.subcategorias(tipo, orden);

alter table public.subcategorias enable row level security;

drop policy if exists "subcategorias_public_read" on public.subcategorias;
create policy "subcategorias_public_read" on public.subcategorias
  for select using (true);
drop policy if exists "subcategorias_admin_write" on public.subcategorias;
create policy "subcategorias_admin_write" on public.subcategorias
  for insert with check (auth.uid() is not null);
drop policy if exists "subcategorias_admin_update" on public.subcategorias;
create policy "subcategorias_admin_update" on public.subcategorias
  for update using (auth.uid() is not null) with check (auth.uid() is not null);
drop policy if exists "subcategorias_admin_delete" on public.subcategorias;
create policy "subcategorias_admin_delete" on public.subcategorias
  for delete using (auth.uid() is not null);

-- ---------------------------------------------------------------------------
-- links: reemplaza la columna categoria por subcategoria_id.
-- ---------------------------------------------------------------------------
alter table public.links add column if not exists subcategoria_id uuid references public.subcategorias(id) on delete cascade;

drop policy if exists "links_public_read" on public.links;
drop policy if exists "links_admin_write" on public.links;
drop policy if exists "links_admin_update" on public.links;
drop policy if exists "links_admin_delete" on public.links;

alter table public.links drop column if exists categoria;
alter table public.links alter column subcategoria_id set not null;

create index if not exists links_subcategoria_orden_idx on public.links(subcategoria_id, orden);

create policy "links_public_read" on public.links
  for select using (true);
create policy "links_admin_write" on public.links
  for insert with check (auth.uid() is not null);
create policy "links_admin_update" on public.links
  for update using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "links_admin_delete" on public.links
  for delete using (auth.uid() is not null);

-- ---------------------------------------------------------------------------
-- Semilla: subcategorías tal cual el Google Sites actual (no duplica si ya existen).
-- ---------------------------------------------------------------------------
insert into public.subcategorias (tipo, nombre, slug, orden) values
  ('cartilla', 'Jefe de Turno y Supervisor', 'jefe-de-turno-y-supervisor', 0),
  ('cartilla', 'Central SSEI', 'central-ssei', 1),
  ('cartilla', 'SAM', 'sam', 2),
  ('cartilla', 'Vehículos', 'vehiculos', 3),
  ('cartilla', 'Equipos', 'equipos', 4),
  ('cartilla', 'ERA', 'era', 5),
  ('cartilla', 'Primeros Auxilios', 'primeros-auxilios', 6),
  ('cartilla', 'Control Fauna', 'control-fauna', 7),
  ('cartilla', 'HAZMAT y Cuerdas', 'hazmat-y-cuerdas', 8),
  ('documento', 'Cartillas PDF (Hechas)', 'cartillas-pdf-hechas', 0),
  ('documento', 'Operaciones de Emergencia', 'operaciones-de-emergencia', 1),
  ('documento', 'Seguridad Operacional', 'seguridad-operacional', 2),
  ('documento', 'Plan Nieve', 'plan-nieve', 3),
  ('documento', 'Mantenimiento', 'mantenimiento', 4),
  ('documento', 'Instrucción', 'instruccion', 5),
  ('documento', 'Oficina Técnica', 'oficina-tecnica', 6)
on conflict (tipo, slug) do nothing;

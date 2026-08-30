-- Tercer nivel opcional dentro de una subcategoría (ej. dentro de
-- "Vehículos", agrupar los links de "Rescate 1" separados de "Nieve 1").
-- Nullable: la mayoría de subcategorías no lo necesitan.
alter table public.links add column if not exists grupo text;

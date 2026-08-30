-- ============================================================================
-- Tablas creadas por SQL Editor no heredan los GRANT que Supabase aplica
-- solo cuando creás tablas desde el Table Editor del dashboard. RLS por sí
-- sola no alcanza — Postgres exige el privilegio de base ANTES de evaluar
-- las políticas. Sin esto, anon/authenticated reciben "permission denied"
-- aunque las policies estén bien.
-- ============================================================================

grant usage on schema public to anon, authenticated;

grant select on public.subcategorias to anon, authenticated;
grant insert, update, delete on public.subcategorias to authenticated;

grant select on public.links to anon, authenticated;
grant insert, update, delete on public.links to authenticated;

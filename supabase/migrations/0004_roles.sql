-- ============================================================================
-- Tres niveles de acceso:
--   1. Público (sin sesión): solo la página principal.
--   2. Funcionario SSEI (sesión, rol funcionario): puede ver cartillas y
--      documentos.
--   3. Administrador (sesión, rol admin): además puede editar todo en /admin.
-- Seguro para correr más de una vez.
-- ============================================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'funcionario' check (role in ('admin', 'funcionario')),
  nombre text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
grant select, update on public.profiles to authenticated;

drop policy if exists "profiles_self_read" on public.profiles;
create policy "profiles_self_read" on public.profiles
  for select using (id = auth.uid());

-- El primer usuario (el que ya existe, quien arma el sitio) queda como admin.
-- Los que se creen después entran como funcionario por defecto — se
-- promueven a mano cuando corresponda.
insert into public.profiles (id, role)
select id, 'admin' from auth.users
on conflict (id) do nothing;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id) on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

grant execute on function public.is_admin() to authenticated;

-- ---------------------------------------------------------------------------
-- subcategorias: lectura para cualquier usuario logueado, escritura solo admin.
-- ---------------------------------------------------------------------------
drop policy if exists "subcategorias_public_read" on public.subcategorias;
drop policy if exists "subcategorias_authenticated_read" on public.subcategorias;
create policy "subcategorias_authenticated_read" on public.subcategorias
  for select using (auth.uid() is not null);

drop policy if exists "subcategorias_admin_write" on public.subcategorias;
create policy "subcategorias_admin_write" on public.subcategorias
  for insert with check (public.is_admin());
drop policy if exists "subcategorias_admin_update" on public.subcategorias;
create policy "subcategorias_admin_update" on public.subcategorias
  for update using (public.is_admin()) with check (public.is_admin());
drop policy if exists "subcategorias_admin_delete" on public.subcategorias;
create policy "subcategorias_admin_delete" on public.subcategorias
  for delete using (public.is_admin());

-- ---------------------------------------------------------------------------
-- links: mismo criterio.
-- ---------------------------------------------------------------------------
drop policy if exists "links_public_read" on public.links;
drop policy if exists "links_authenticated_read" on public.links;
create policy "links_authenticated_read" on public.links
  for select using (auth.uid() is not null);

drop policy if exists "links_admin_write" on public.links;
create policy "links_admin_write" on public.links
  for insert with check (public.is_admin());
drop policy if exists "links_admin_update" on public.links;
create policy "links_admin_update" on public.links
  for update using (public.is_admin()) with check (public.is_admin());
drop policy if exists "links_admin_delete" on public.links;
create policy "links_admin_delete" on public.links
  for delete using (public.is_admin());

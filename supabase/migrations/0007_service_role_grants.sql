-- Mismo problema que 0003: tablas creadas por SQL Editor no le dan a
-- service_role el permiso base tampoco (bypassa RLS, pero igual necesita
-- el GRANT). Sin esto, la creación masiva de usuarios en /admin/usuarios
-- crea el usuario en Auth pero falla al asignarle el rol en profiles.
grant select, insert, update, delete on public.profiles to service_role;
grant select, insert, update, delete on public.subcategorias to service_role;
grant select, insert, update, delete on public.links to service_role;

-- Mueve el "embed en vivo" de nivel-subcategoría a nivel-link, para poder
-- tener varias carpetas embebidas (cada una con su propio título) en la
-- misma página, en vez de una sola por subcategoría.
alter table public.links add column if not exists es_embed boolean not null default false;

-- Migra Mantenimiento del mecanismo viejo (subcategorias.embed_url) al nuevo.
update public.links set es_embed = true
where subcategoria_id = (select id from public.subcategorias where tipo='documento' and slug='mantenimiento')
and titulo = 'Carpeta de Mantenimiento';

alter table public.subcategorias drop column if exists embed_url;

-- Las carpetas que se acaban de cargar en estas 4 secciones se muestran
-- embebidas, con su propio título arriba, igual que Mantenimiento.
update public.links set es_embed = true
where subcategoria_id in (
  select id from public.subcategorias
  where tipo = 'documento' and slug in ('plan-nieve', 'instruccion', 'operaciones-de-emergencia', 'cartillas-pdf-hechas')
);

-- Permite que una subcategoría muestre un embed en vivo (ej. una carpeta de
-- Drive) además de sus botones normales — igual que estaba en el Sites
-- viejo para "Documentos de Interés".
alter table public.subcategorias add column if not exists embed_url text;

update public.subcategorias
set embed_url = 'https://drive.google.com/embeddedfolderview?id=1n-rfbarF8ziQCpPbxmTX6xCbZH7IJdRN#list'
where tipo = 'documento' and slug = 'mantenimiento';

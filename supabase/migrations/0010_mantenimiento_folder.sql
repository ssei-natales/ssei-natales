insert into public.links (subcategoria_id, titulo, url, orden) values
  ((select id from public.subcategorias where tipo='documento' and slug='mantenimiento'), 'Carpeta de Mantenimiento', 'https://drive.google.com/drive/folders/1n-rfbarF8ziQCpPbxmTX6xCbZH7IJdRN', 0);

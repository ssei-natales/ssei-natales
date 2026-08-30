-- Reemplaza el contenido de 4 subcategorías de Documentos con las carpetas
-- reales que indicó el usuario.

-- Plan Nieve
delete from public.links where subcategoria_id = (select id from public.subcategorias where tipo='documento' and slug='plan-nieve');
insert into public.links (subcategoria_id, titulo, url, orden) values
  ((select id from public.subcategorias where tipo='documento' and slug='plan-nieve'), 'Carpeta de RSSEI', 'https://drive.google.com/drive/folders/1CDN0EzIlqmMo3DjRwB4BIgveUOWkmfc-', 0),
  ((select id from public.subcategorias where tipo='documento' and slug='plan-nieve'), 'Carpeta de RCR', 'https://drive.google.com/drive/folders/1bXHQL_TRfrq3txSmJ4uJ8k4ISdvkjVzq', 1),
  ((select id from public.subcategorias where tipo='documento' and slug='plan-nieve'), 'Documentos de Interés', 'https://drive.google.com/drive/folders/1Eflt5rI-4w2nv7VWvmZPP8eQS90Ye5MN', 2);

-- Instrucción
delete from public.links where subcategoria_id = (select id from public.subcategorias where tipo='documento' and slug='instruccion');
insert into public.links (subcategoria_id, titulo, url, orden) values
  ((select id from public.subcategorias where tipo='documento' and slug='instruccion'), 'Documentos de Interés', 'https://drive.google.com/drive/folders/1T3_DTu30cvOsSSKD2oScU4pe4lFPMhoi', 0);

-- Operaciones de Emergencia
delete from public.links where subcategoria_id = (select id from public.subcategorias where tipo='documento' and slug='operaciones-de-emergencia');
insert into public.links (subcategoria_id, titulo, url, orden) values
  ((select id from public.subcategorias where tipo='documento' and slug='operaciones-de-emergencia'), 'Documentos de Interés', 'https://drive.google.com/drive/folders/1akONxMogDbkKX-WdVXAmu3bGUEpzqs2X', 0);

-- Cartillas PDF (Hechas): 2 arriba sin grupo, línea separadora, 5 abajo agrupadas
delete from public.links where subcategoria_id = (select id from public.subcategorias where tipo='documento' and slug='cartillas-pdf-hechas');
insert into public.links (subcategoria_id, titulo, url, orden) values
  ((select id from public.subcategorias where tipo='documento' and slug='cartillas-pdf-hechas'), 'Libro Jefe de Turno', 'https://drive.google.com/drive/folders/1WD8xkSDVLHFuG1K__EZIBaI6Z6ad2Adf', 0),
  ((select id from public.subcategorias where tipo='documento' and slug='cartillas-pdf-hechas'), 'Libro Extensiones', 'https://drive.google.com/drive/folders/14fgLZioafEfKXQiUO3osXZoxPcIhJ_W6', 1);

insert into public.links (subcategoria_id, titulo, url, grupo, orden) values
  ((select id from public.subcategorias where tipo='documento' and slug='cartillas-pdf-hechas'), 'Cartillas SAM', 'https://drive.google.com/drive/folders/1D74ohRSEo34xzcOhkVa4uAB0It2HN0Nb', 'Cartillas por categoría', 0),
  ((select id from public.subcategorias where tipo='documento' and slug='cartillas-pdf-hechas'), 'Cartillas HAZMAT', 'https://drive.google.com/drive/folders/1WCzs7W50AXDDEIjEVfj8LVSnNIPHfIWE', 'Cartillas por categoría', 1),
  ((select id from public.subcategorias where tipo='documento' and slug='cartillas-pdf-hechas'), 'Cartillas Vehículos', 'https://drive.google.com/drive/folders/1TeaOXiW7EVdIgxudGMsGTV6xrZLzMvGA', 'Cartillas por categoría', 2),
  ((select id from public.subcategorias where tipo='documento' and slug='cartillas-pdf-hechas'), 'Cartillas Fauna', 'https://drive.google.com/drive/folders/1Ik-ocaWsoOiSanVRG3FQuvheRK0eBcM1', 'Cartillas por categoría', 3),
  ((select id from public.subcategorias where tipo='documento' and slug='cartillas-pdf-hechas'), 'Cartillas Equipos Menores', 'https://drive.google.com/drive/folders/1c63XQoyzr5gkQUM6LWCRUgVke5MNwWbr', 'Cartillas por categoría', 4);

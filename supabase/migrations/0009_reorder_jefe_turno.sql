-- Reordena los botones de "Jefe de Turno y Supervisor" para que queden
-- en 2 columnas en este orden visual.
update public.links set orden = 0
  where subcategoria_id = (select id from public.subcategorias where tipo='cartilla' and slug='jefe-de-turno-y-supervisor')
  and titulo = 'Libro Jefe de Turno';

update public.links set orden = 1
  where subcategoria_id = (select id from public.subcategorias where tipo='cartilla' and slug='jefe-de-turno-y-supervisor')
  and titulo = 'Libro Jefe de Turno Extensión SVC';

update public.links set orden = 2
  where subcategoria_id = (select id from public.subcategorias where tipo='cartilla' and slug='jefe-de-turno-y-supervisor')
  and titulo = 'Cartilla PMM';

update public.links set orden = 3
  where subcategoria_id = (select id from public.subcategorias where tipo='cartilla' and slug='jefe-de-turno-y-supervisor')
  and titulo = 'Cartilla COE';

update public.links set orden = 4
  where subcategoria_id = (select id from public.subcategorias where tipo='cartilla' and slug='jefe-de-turno-y-supervisor')
  and titulo = 'R-SSEI-044 (Líquido)';

update public.links set orden = 5
  where subcategoria_id = (select id from public.subcategorias where tipo='cartilla' and slug='jefe-de-turno-y-supervisor')
  and titulo = 'R-SSEI-038 (Sólido)';

update public.links set orden = 6
  where subcategoria_id = (select id from public.subcategorias where tipo='cartilla' and slug='jefe-de-turno-y-supervisor')
  and titulo = 'Registro R-SSEI-024';

update public.links set orden = 7
  where subcategoria_id = (select id from public.subcategorias where tipo='cartilla' and slug='jefe-de-turno-y-supervisor')
  and titulo = 'Correlativo Fases 2026';

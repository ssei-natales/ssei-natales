-- ============================================================================
-- Carga inicial de links reales, extraídos del Google Sites actual.
-- Usa subqueries por slug para no depender de IDs. Pensado para correr una
-- sola vez sobre subcategorias ya sembradas (0002_subcategorias.sql).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- CARTILLAS
-- ---------------------------------------------------------------------------

-- Jefe de Turno y Supervisor
insert into public.links (subcategoria_id, titulo, url, orden) values
  ((select id from public.subcategorias where tipo='cartilla' and slug='jefe-de-turno-y-supervisor'), 'Libro Jefe de Turno', 'https://docs.google.com/spreadsheets/d/1x3SNSCXvi2EsfQNthzNKSW3_XeRxspse8nq0lJMtp3g/edit?gid=408324412#gid=408324412', 0),
  ((select id from public.subcategorias where tipo='cartilla' and slug='jefe-de-turno-y-supervisor'), 'Cartilla PMM', 'https://docs.google.com/forms/d/e/1FAIpQLSffHWgV3-6yNk58c5564mTvSg1vOc4T7SR0D65noqmiXzHyAw/viewform?usp=header', 1),
  ((select id from public.subcategorias where tipo='cartilla' and slug='jefe-de-turno-y-supervisor'), 'Libro Jefe de Turno Extensión SVC', 'https://docs.google.com/spreadsheets/d/1P6t60MkB8kH8iWV1Ln-d00Brw9dcTu1Clx5WNx5I1EA/edit?gid=906952597#gid=906952597', 2),
  ((select id from public.subcategorias where tipo='cartilla' and slug='jefe-de-turno-y-supervisor'), 'Cartilla COE', 'https://docs.google.com/forms/d/e/1FAIpQLSfOVT02hppkJ4a4sq99Qs_hJNDgEJr29m8tKULl_1CkrIT1ew/viewform?usp=header', 3),
  ((select id from public.subcategorias where tipo='cartilla' and slug='jefe-de-turno-y-supervisor'), 'Registro R-SSEI-024', 'https://docs.google.com/spreadsheets/d/1xt7Mgu1RR80cHmmKjkHKhiL-nybUGm2p/edit?gid=1687059036#gid=1687059036', 4),
  ((select id from public.subcategorias where tipo='cartilla' and slug='jefe-de-turno-y-supervisor'), 'R-SSEI-038 (Sólido)', 'https://docs.google.com/spreadsheets/d/16Zm3IBU_rK25LOA60MPjuhYB8U3x2g3lZc83Nf1W2Wc/edit?gid=0#gid=0', 5),
  ((select id from public.subcategorias where tipo='cartilla' and slug='jefe-de-turno-y-supervisor'), 'R-SSEI-044 (Líquido)', 'https://docs.google.com/spreadsheets/d/1y6Uvcf82UKhHIxseLMkBSpfEHL5YYXPh0kmm3wQ-kgE/edit?gid=0#gid=0', 6),
  ((select id from public.subcategorias where tipo='cartilla' and slug='jefe-de-turno-y-supervisor'), 'Correlativo Fases 2026', 'https://docs.google.com/spreadsheets/d/1SihZFRe_WEvaqSsS_SXpbgSO969zPLfRThv_qogQKU4/edit?gid=891834841#gid=891834841', 7);

-- Central SSEI
insert into public.links (subcategoria_id, titulo, url, orden) values
  ((select id from public.subcategorias where tipo='cartilla' and slug='central-ssei'), 'Recepción Central de Comunicaciones y Alarma', 'https://docs.google.com/forms/d/e/1FAIpQLSfvrE9_vivYsGaBQikjDfZjvGkcyxWrQBz5LjAw6tqbQlhE-w/viewform?usp=header', 0),
  ((select id from public.subcategorias where tipo='cartilla' and slug='central-ssei'), 'Cartilla Cargos Diarios', 'https://forms.gle/tzk7PE5AakcxzKC96', 1),
  ((select id from public.subcategorias where tipo='cartilla' and slug='central-ssei'), 'DRIVE Central CCA', 'https://docs.google.com/spreadsheets/d/1CCUF-EHLc7YuERMBYQLQaZbrjprc-Eh9qs-QKIbys54/edit?gid=1495201329#gid=1495201329', 2);

-- SAM
insert into public.links (subcategoria_id, titulo, url, orden) values
  ((select id from public.subcategorias where tipo='cartilla' and slug='sam'), 'Cartilla SAM por Vuelo', 'https://docs.google.com/forms/d/e/1FAIpQLScue_O22-rN2Cyhg7ALA_fkqdUw3BZYsAapVpfKmow_L9mmfg/viewform?usp=publish-editor', 0),
  ((select id from public.subcategorias where tipo='cartilla' and slug='sam'), 'Cartilla Chequeo de Pista', 'https://docs.google.com/forms/d/e/1FAIpQLSddNKyLunV0i9aA5KrpdbhZzT3PuSuUPz-X9LVJNOdiH2NvPg/viewform?usp=header', 1),
  ((select id from public.subcategorias where tipo='cartilla' and slug='sam'), 'RCR', 'https://docs.google.com/spreadsheets/d/1TJ1ZCw7aQJI19ZwH98jrXCs8P73-RS8bEagqI_YGrwY/edit?gid=0#gid=0', 2),
  ((select id from public.subcategorias where tipo='cartilla' and slug='sam'), 'Registro de FOD', 'https://docs.google.com/spreadsheets/d/1pA_ZDp9zhGxsrcwRkJ2GeTrqL_b1D5QoeQexM5ZTM_4/edit?usp=sharing', 3);

-- Vehículos (agrupado por vehículo)
insert into public.links (subcategoria_id, titulo, url, grupo, orden) values
  ((select id from public.subcategorias where tipo='cartilla' and slug='vehiculos'), 'Lista de Chequeo Diario', 'https://docs.google.com/forms/d/e/1FAIpQLSeR4aoFSc9_whjG5VbjM8a5N1vdHq0AAKlh0fVyM_gcKErrpA/viewform?usp=header', 'Rescate 1', 0),
  ((select id from public.subcategorias where tipo='cartilla' and slug='vehiculos'), 'Lista de Chequeo Semanal', 'https://docs.google.com/forms/d/e/1FAIpQLSc6r_RqegtVy9fDCwjGkVDuUdqIfIe_pfhMYa6Pn7eLzhdoJw/viewform?usp=header', 'Rescate 1', 1),
  ((select id from public.subcategorias where tipo='cartilla' and slug='vehiculos'), 'Lista de Chequeo Mensual', 'https://docs.google.com/forms/d/e/1FAIpQLSfRXJ8DsBxOlxvU587UfeOixLWhvheidDZHKOrzu02pi3OT5w/viewform?usp=header', 'Rescate 1', 2),

  ((select id from public.subcategorias where tipo='cartilla' and slug='vehiculos'), 'Lista de Chequeo Diario', 'https://docs.google.com/forms/d/e/1FAIpQLSdMZ46tNh5a0OGJLVTaT5Ii9rD0SUwGtwodEyxBbw-4fLAVlg/viewform?usp=header', 'Camioneta 019', 0),
  ((select id from public.subcategorias where tipo='cartilla' and slug='vehiculos'), 'Lista de Chequeo Semanal', 'https://docs.google.com/forms/d/e/1FAIpQLScWcK2BLKUO6ZBPokhFst9df1SmCMq2p4iMm3ACpUVTRa9fGQ/viewform?usp=publish-editor', 'Camioneta 019', 1),

  ((select id from public.subcategorias where tipo='cartilla' and slug='vehiculos'), 'Lista de Chequeo Diario', 'https://docs.google.com/forms/d/e/1FAIpQLSfgtFKpqZPefcFGSLCsZouB16Tnz6Y8uW00-byF4CpJy73efQ/viewform?usp=publish-editor', 'Nieve 1', 0),
  ((select id from public.subcategorias where tipo='cartilla' and slug='vehiculos'), 'Lista de Chequeo Semanal', 'https://docs.google.com/forms/d/e/1FAIpQLSeqYo-G2udkjA3yIL_5OyHxbjQp9vCKxDIxzY6BbYizorMNZw/viewform?usp=header', 'Nieve 1', 1),
  ((select id from public.subcategorias where tipo='cartilla' and slug='vehiculos'), 'Lista de Chequeo Mensual', 'https://docs.google.com/forms/d/e/1FAIpQLScLJ7Ho1t3VazCeRrbf9dbPM9anL0EBMB1gxWo_29rHXWuPfQ/viewform?usp=header', 'Nieve 1', 2),

  ((select id from public.subcategorias where tipo='cartilla' and slug='vehiculos'), 'Lista de Chequeo Diario', 'https://docs.google.com/forms/d/e/1FAIpQLScUckl5HHoMRzTdByyd44A5Yn5vmt8cgpSYlXHVl9F7_iZj7g/viewform?usp=publish-editor', 'Nieve 2', 0),
  ((select id from public.subcategorias where tipo='cartilla' and slug='vehiculos'), 'Lista de Chequeo Semanal', 'https://docs.google.com/forms/d/e/1FAIpQLScYsTgtup4A6h-PkEO0C_xCqlLArMHlJc1mp4ArIfFczDNK9A/viewform?usp=publish-editor', 'Nieve 2', 1),
  ((select id from public.subcategorias where tipo='cartilla' and slug='vehiculos'), 'Lista de Chequeo Mensual', 'https://docs.google.com/forms/d/e/1FAIpQLSexUwsaqwbxPoHULE6PE04mEG-b79CNuVJPkRWVn2JDccnDlQ/viewform?usp=header', 'Nieve 2', 2),

  ((select id from public.subcategorias where tipo='cartilla' and slug='vehiculos'), 'Lista de Chequeo Diario', 'https://docs.google.com/forms/d/e/1FAIpQLSeuEkx8ib000MjPtzR4HcksevANKV1hZ1WW5yzbL4-F3L9wVA/viewform?usp=header', 'Minicargador', 0),
  ((select id from public.subcategorias where tipo='cartilla' and slug='vehiculos'), 'Lista de Chequeo Semanal', 'https://docs.google.com/forms/d/e/1FAIpQLSdAWrlANS0vNNF3y8jpC5oSb5oh65GNBOFYidztlF8xRLENvg/viewform?usp=publish-editor', 'Minicargador', 1),
  ((select id from public.subcategorias where tipo='cartilla' and slug='vehiculos'), 'Lista de Chequeo Mensual', 'https://docs.google.com/forms/d/e/1FAIpQLSc80RjBMAsDoZzxLfzaExR68vOvJLubkJJYsNLsPLihABEhqQ/viewform?usp=header', 'Minicargador', 2),

  ((select id from public.subcategorias where tipo='cartilla' and slug='vehiculos'), 'Lista de Chequeo Diario', 'https://docs.google.com/forms/d/e/1FAIpQLScN843XwDMZ2FsFycyjUIsLBKFQ3I_Vtpjq5LWsOtsA_BDiiQ/viewform?usp=header', 'Grúa Horquilla', 0),
  ((select id from public.subcategorias where tipo='cartilla' and slug='vehiculos'), 'Lista de Chequeo Semanal', 'https://docs.google.com/forms/d/e/1FAIpQLScY5nyGyIoU1MIGTcQy8oxCrT-6HifE5YItgydlkzTpRUreow/viewform?usp=publish-editor', 'Grúa Horquilla', 1),
  ((select id from public.subcategorias where tipo='cartilla' and slug='vehiculos'), 'Lista de Chequeo Mensual', 'https://docs.google.com/forms/d/e/1FAIpQLSe5UeUWbyxIUH2SVjORN-cWJBvRIfmC9bVdReUJkOhNgE2Rnw/viewform?usp=header', 'Grúa Horquilla', 2);

insert into public.links (subcategoria_id, titulo, url, orden) values
  ((select id from public.subcategorias where tipo='cartilla' and slug='vehiculos'), 'Esparcidores', 'https://docs.google.com/forms/d/e/1FAIpQLSccR9wO6rGybHCbcqziVFjNJ-EAm7Bpli8UwL3KYqMGxUuwGg/viewform?usp=sharing', 3);

-- Equipos (Cartillas Equipos)
insert into public.links (subcategoria_id, titulo, url, orden) values
  ((select id from public.subcategorias where tipo='cartilla' and slug='equipos'), 'Equipos Milwaukee', 'https://docs.google.com/forms/d/e/1FAIpQLSe5UjuUpJ0PHGpBJvcPdJrjKpZZOT7bSZl3rxrsWVj2eCB81g/viewform?usp=header', 0),
  ((select id from public.subcategorias where tipo='cartilla' and slug='equipos'), 'Generador Kolvok', 'https://docs.google.com/forms/d/e/1FAIpQLSfMuL4gHQFUloyHH4ilrgzYlY16G-PulhO-tmKbF0z_Bt0XJQ/viewform?usp=header', 1),
  ((select id from public.subcategorias where tipo='cartilla' and slug='equipos'), 'Motobomba DWP40 (DIESEL)', 'https://docs.google.com/forms/d/e/1FAIpQLScXd7cW_Z58Xg0_z2ZBCL993_Zjf8x8tzWFj8z5JVZ6Oc2fdg/viewform', 2),
  ((select id from public.subcategorias where tipo='cartilla' and slug='equipos'), 'Equipos LUKAS', 'https://docs.google.com/forms/d/e/1FAIpQLSeLBT1n8mSoSLcBVgC4KhVY2h6FkwM0XJGPo8v7HcnX3tnplg/viewform?usp=header', 3),
  ((select id from public.subcategorias where tipo='cartilla' and slug='equipos'), 'Oceanus-W', 'https://docs.google.com/forms/d/e/1FAIpQLScOlkI53aVuT_XZwBK2OMq0u1NGMSD5HV6zv14uBdTxyrwY3g/viewform?usp=header', 4),
  ((select id from public.subcategorias where tipo='cartilla' and slug='equipos'), 'Motobomba DWP20 (Gasolina)', 'https://docs.google.com/forms/d/e/1FAIpQLSev6rL_D0nwxwZa_sRv2UnJAuGTLEh2IJChmMHlwBdwXKmTFQ/viewform', 5),
  ((select id from public.subcategorias where tipo='cartilla' and slug='equipos'), 'Motosierra Husqvarna', 'https://docs.google.com/forms/d/e/1FAIpQLSdy1e4QslKTbrOOaMuxzr1ic01COej5CMNXNov_8uvObHOX9g/viewform?usp=header', 6),
  ((select id from public.subcategorias where tipo='cartilla' and slug='equipos'), 'Partidor batería Class 5000', 'https://docs.google.com/forms/d/e/1FAIpQLScTveeJ1wwhVh345RFP59U-RzaH0c9eW-3E09lddnCemusITw/viewform?usp=header', 7),
  ((select id from public.subcategorias where tipo='cartilla' and slug='equipos'), 'Compresor Krafter', 'https://docs.google.com/forms/d/e/1FAIpQLSeH8dZ-bBiqnCkKsby86ScrBvbCX0ybp8MZP2u4I6QcnnWfwg/viewform?usp=header', 8),
  ((select id from public.subcategorias where tipo='cartilla' and slug='equipos'), 'Partidor batería Class 630', 'https://docs.google.com/forms/d/e/1FAIpQLSetmltfvK5LT76YNufGznDfFrPECKjlpavNyjjHqEGhUAOs2A/viewform?usp=header', 9);

-- ERA
insert into public.links (subcategoria_id, titulo, url, orden) values
  ((select id from public.subcategorias where tipo='cartilla' and slug='era'), 'ERA Semanal', 'https://forms.gle/zNn7WPTLSUr4KFXZ8', 0),
  ((select id from public.subcategorias where tipo='cartilla' and slug='era'), 'ERA Trimestral', 'https://forms.gle/9oyvQnjjHxjrFAPs6', 1),
  ((select id from public.subcategorias where tipo='cartilla' and slug='era'), 'ERA Usos y Mantenimiento', 'https://forms.gle/DZTScwfzGCxxZYVF7', 2),
  ((select id from public.subcategorias where tipo='cartilla' and slug='era'), 'Hojas de Vida ERA (Equipos y Cilindros)', 'https://docs.google.com/document/d/1wGhbE5PPGJ1lPnEX3eMwI_mDpTQSTXSEplKpVtht7sY/edit', 3);

insert into public.links (subcategoria_id, titulo, url, grupo, orden) values
  ((select id from public.subcategorias where tipo='cartilla' and slug='era'), 'ERA N°1', 'https://forms.gle/dsGYQG9X1fE3A5XH9', 'ERA Diario', 0),
  ((select id from public.subcategorias where tipo='cartilla' and slug='era'), 'ERA N°2', 'https://forms.gle/UWuC872ELNByS9Kx7', 'ERA Diario', 1),
  ((select id from public.subcategorias where tipo='cartilla' and slug='era'), 'ERA N°3', 'https://forms.gle/qmx9M3sE9BBtVipAA', 'ERA Diario', 2),
  ((select id from public.subcategorias where tipo='cartilla' and slug='era'), 'ERA N°4', 'https://forms.gle/mM4m5oW7ydqc17Ax7', 'ERA Diario', 3),
  ((select id from public.subcategorias where tipo='cartilla' and slug='era'), 'ERA N°5', 'https://forms.gle/TbdRjTgCQ5g1QBSH7', 'ERA Diario', 4),
  ((select id from public.subcategorias where tipo='cartilla' and slug='era'), 'ERA N°6', 'https://forms.gle/szvDidg32hhbPqq67', 'ERA Diario', 5),
  ((select id from public.subcategorias where tipo='cartilla' and slug='era'), 'ERA N°7', 'https://forms.gle/YyKjfh5sDsiBjVSH9', 'ERA Diario', 6),
  ((select id from public.subcategorias where tipo='cartilla' and slug='era'), 'ERA N°8', 'https://forms.gle/BuYz3bE4b6j6FkXm8', 'ERA Diario', 7),
  ((select id from public.subcategorias where tipo='cartilla' and slug='era'), 'ERA N°9', 'https://forms.gle/ki88RyP8HqLXzkK67', 'ERA Diario', 8),
  ((select id from public.subcategorias where tipo='cartilla' and slug='era'), 'ERA N°10', 'https://forms.gle/AsiCLrrgBFtbFw7o9', 'ERA Diario', 9);

-- Primeros Auxilios
insert into public.links (subcategoria_id, titulo, url, orden) values
  ((select id from public.subcategorias where tipo='cartilla' and slug='primeros-auxilios'), 'Primeros Auxilios', 'https://forms.gle/CabaVUn72FGzqCtKA', 0);

-- Control Fauna
insert into public.links (subcategoria_id, titulo, url, orden) values
  ((select id from public.subcategorias where tipo='cartilla' and slug='control-fauna'), 'Cartilla de Fauna', 'https://docs.google.com/forms/d/e/1FAIpQLSdA-HkULyk8nH2QzAvzpPH1HVEAvnWL51abf8tw_F-1ElVtKw/viewform?usp=header', 0),
  ((select id from public.subcategorias where tipo='cartilla' and slug='control-fauna'), 'BASHTOOL', 'https://sites.google.com/dgac.gob.cl/bashoperations/home', 1);

-- HAZMAT y Cuerdas
insert into public.links (subcategoria_id, titulo, url, orden) values
  ((select id from public.subcategorias where tipo='cartilla' and slug='hazmat-y-cuerdas'), 'HAZMAT', 'https://docs.google.com/forms/d/e/1FAIpQLScNzQ-3QpcI5Vdn8xQKCK9QW2fTF7GWMnjqOcrOrBaT6z-N0Q/viewform?usp=header', 0),
  ((select id from public.subcategorias where tipo='cartilla' and slug='hazmat-y-cuerdas'), 'Cuerdas', 'https://docs.google.com/forms/d/e/1FAIpQLSdHXT3Q20PD0aQMin2Jt57MKmc-dEJjpB7p209-IOyQpUEWHQ/viewform', 1);

-- ---------------------------------------------------------------------------
-- DOCUMENTOS
-- ---------------------------------------------------------------------------

-- Cartillas PDF (Hechas)
insert into public.links (subcategoria_id, titulo, url, orden) values
  ((select id from public.subcategorias where tipo='documento' and slug='cartillas-pdf-hechas'), 'Cartillas en PDF de HAZMAT', 'https://drive.google.com/drive/folders/1WCzs7W50AXDDEIjEVfj8LVSnNIPHfIWE?usp=sharing', 0),
  ((select id from public.subcategorias where tipo='documento' and slug='cartillas-pdf-hechas'), 'Cartillas en PDF de Vehículos', 'https://drive.google.com/drive/folders/1TeaOXiW7EVdIgxudGMsGTV6xrZLzMvGA?usp=sharing', 1),
  ((select id from public.subcategorias where tipo='documento' and slug='cartillas-pdf-hechas'), 'Cartillas en PDF de Fauna', 'https://drive.google.com/drive/folders/1Ik-ocaWsoOiSanVRG3FQuvheRK0eBcM1?usp=sharing', 2),
  ((select id from public.subcategorias where tipo='documento' and slug='cartillas-pdf-hechas'), 'Cartillas en PDF de Equipos Menores', 'https://drive.google.com/drive/folders/1c63XQoyzr5gkQUM6LWCRUgVke5MNwWbr?usp=sharing', 3);

-- Operaciones de Emergencia
insert into public.links (subcategoria_id, titulo, url, orden) values
  ((select id from public.subcategorias where tipo='documento' and slug='operaciones-de-emergencia'), '1er Ejercicio Técnico 2026', 'https://drive.google.com/file/d/1pB7ldo6AAy5-KrbnV630qoYzW44K9BO4/view', 0);

-- Plan Nieve
insert into public.links (subcategoria_id, titulo, url, orden) values
  ((select id from public.subcategorias where tipo='documento' and slug='plan-nieve'), 'R-SSEI-38 (Jul. 2026)', 'https://drive.google.com/file/d/19QYB-KUiNXR2hrHOHxccPerv0MJpx-WV/view', 0),
  ((select id from public.subcategorias where tipo='documento' and slug='plan-nieve'), 'R-SSEI-44 (Jul. 2026)', 'https://drive.google.com/file/d/1rmLkAka7Hlfzx-F_1LQ3qCNXqkoxOTIF/view', 1);

-- Instrucción
insert into public.links (subcategoria_id, titulo, url, orden) values
  ((select id from public.subcategorias where tipo='documento' and slug='instruccion'), 'Presentaciones PAI 2026', 'https://drive.google.com/drive/folders/13TGyfRru3XpJSGAbQ685fr9pozDyhQYU', 0);

-- Oficina Técnica > Biblioteca (agrupado)
insert into public.links (subcategoria_id, titulo, url, grupo, orden) values
  ((select id from public.subcategorias where tipo='documento' and slug='oficina-tecnica'), 'Resol 07 Aprobación de programas y procedimientos SSEI SCNT', 'https://drive.google.com/file/d/1U7lzHVZgKb68UQgT9HYOnbqDuQMTkCpN/view?usp=drive_link', 'Resoluciones', 0),
  ((select id from public.subcategorias where tipo='documento' and slug='oficina-tecnica'), 'Resol 015 Aprueba Documentos del servicio SSEI', 'https://drive.google.com/file/d/1Ezzn9dD_CtHKkgYZsGkhb_JMvEOVYYw2/view?usp=drive_link', 'Resoluciones', 1),
  ((select id from public.subcategorias where tipo='documento' and slug='oficina-tecnica'), 'Resol 016 Aprobación PROC pase vehicular', 'https://drive.google.com/file/d/1NFLuxG1Cb3nLQewo2-m7Y6gHKWwqAmM2/view?usp=drive_link', 'Resoluciones', 2),
  ((select id from public.subcategorias where tipo='documento' and slug='oficina-tecnica'), 'Resol 021 Aprueba Plan Nieve SCNT', 'https://drive.google.com/file/d/1dX21VpY1GPGn8W-BVdZFz5ADJLEtOB-R/view?usp=drive_link', 'Resoluciones', 3),

  ((select id from public.subcategorias where tipo='documento' and slug='oficina-tecnica'), 'Programa de instrucción SCNT', 'https://drive.google.com/file/d/1SPRyMh5uy5W_Do4LGqjzCaohy3K7s4Ii/view?usp=drive_link', 'Programas', 0),
  ((select id from public.subcategorias where tipo='documento' and slug='oficina-tecnica'), 'Programa local de gestión aviario y fauna silvestre', 'https://drive.google.com/file/d/1LqH_VBwmbgv1kBlZCyluSyoKnzr9VgyF/view?usp=drive_link', 'Programas', 1),
  ((select id from public.subcategorias where tipo='documento' and slug='oficina-tecnica'), 'Programa mantenimiento equipos SSEI', 'https://drive.google.com/file/d/1CYGawr6-Q0tmv_SQL6a5z2m32uv6vJpl/view?usp=drive_link', 'Programas', 2),
  ((select id from public.subcategorias where tipo='documento' and slug='oficina-tecnica'), 'Programa mantenimiento vehículos SSEI', 'https://drive.google.com/file/d/1hlEJyCnJPAHJjxNODUq0d8ZdstgLGSag/view?usp=drive_link', 'Programas', 3),
  ((select id from public.subcategorias where tipo='documento' and slug='oficina-tecnica'), 'Programa de gestión y control de F.O.D', 'https://drive.google.com/file/d/1Kl5Gi8g35gVKDwJJ5bKNk5c8rqRzSsQN/view?usp=drive_link', 'Programas', 4),

  ((select id from public.subcategorias where tipo='documento' and slug='oficina-tecnica'), 'PRO Seguridad Operacional', 'https://drive.google.com/file/d/1Po6fYhpuPESvIZ_RY99ZJX7QQNnf5Vfq/view?usp=drive_link', 'Procedimientos', 0),
  ((select id from public.subcategorias where tipo='documento' and slug='oficina-tecnica'), 'PRO SAM SSEI', 'https://drive.google.com/file/d/1pQkvbcG0zsyoeAGK4L_ipm61__NRS2C5/view?usp=drive_link', 'Procedimientos', 1),
  ((select id from public.subcategorias where tipo='documento' and slug='oficina-tecnica'), 'PRO Tiempo de Respuesta', 'https://drive.google.com/file/d/1TWySzR41H-Y7xNTRy112kdIaeJngpdgR/view?usp=drive_link', 'Procedimientos', 2),
  ((select id from public.subcategorias where tipo='documento' and slug='oficina-tecnica'), 'PRO Postura de traje de combate y ERA', 'https://drive.google.com/file/d/1nSVJbYsLWu3D8njuj2Yz9Kb8kNA1UUcE/view?usp=drive_link', 'Procedimientos', 3),
  ((select id from public.subcategorias where tipo='documento' and slug='oficina-tecnica'), 'PRO Degradación de categoría', 'https://drive.google.com/file/d/1sAkH3ohJNFefXg-KntDVaRvpyI8izbsK/view?usp=drive_link', 'Procedimientos', 4),
  ((select id from public.subcategorias where tipo='documento' and slug='oficina-tecnica'), 'PRO Notificación de impacto con fauna silvestre', 'https://drive.google.com/file/d/1KVqTC0609oQyla6oFnxaOSePPkT9b3eA/view?usp=drive_link', 'Procedimientos', 5);

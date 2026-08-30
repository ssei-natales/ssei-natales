update public.profiles
set role = 'admin'
where id in (
  select id from auth.users
  where email in ('franco.arellano@dgac.gob.cl', 'cristopher.gomez@dgac.gob.cl')
);

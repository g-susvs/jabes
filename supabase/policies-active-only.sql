-- Endurece las políticas de lectura: la key pública solo ve filas activas.
-- Aplicar en: Supabase Dashboard → SQL Editor → New query.
-- Idempotente: se puede re-ejecutar sin problema.

drop policy if exists "public read categories" on categories;
create policy "public read categories"
  on categories for select to anon, authenticated using (active);

drop policy if exists "public read products" on products;
create policy "public read products"
  on products for select to anon, authenticated using (active);

drop policy if exists "public read services" on services;
create policy "public read services"
  on services for select to anon, authenticated using (active);

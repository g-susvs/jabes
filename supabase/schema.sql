-- Esquema de datos del catálogo para Supabase (Postgres).
-- Ejecutar una sola vez en: Supabase Dashboard → SQL Editor → New query.
--
-- Espejo de los content-types de Strapi (product, category, service),
-- aplanando media a URLs de Cloudinary y componentes a jsonb.

-- ── Tablas ─────────────────────────────────────────────

create table if not exists categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  description text,
  active      boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  description text,
  price       numeric(10, 2),
  image_url   text,
  image_alt   text,
  -- [{ "url": "...", "alt": "..." }]
  gallery     jsonb not null default '[]'::jsonb,
  -- [{ "text": "..." }]
  features    jsonb not null default '[]'::jsonb,
  -- { "metaTitle", "metaDescription", "keywords", "canonicalUrl", "shareImageUrl" }
  seo         jsonb,
  featured    boolean not null default false,
  active      boolean not null default true,
  category_id uuid references categories (id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists services (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  description text,
  icon        text,
  image_url   text,
  image_alt   text,
  seo         jsonb,
  featured    boolean not null default false,
  active      boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── Índices para las consultas del frontend ────────────

create index if not exists products_category_id_idx on products (category_id);
create index if not exists products_active_name_idx on products (active, name);
create index if not exists products_featured_idx on products (featured) where featured;
create index if not exists categories_active_order_idx on categories (active, sort_order);
create index if not exists services_active_order_idx on services (active, sort_order);

-- ── updated_at automático ──────────────────────────────

create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists categories_set_updated_at on categories;
create trigger categories_set_updated_at
  before update on categories
  for each row execute function set_updated_at();

drop trigger if exists products_set_updated_at on products;
create trigger products_set_updated_at
  before update on products
  for each row execute function set_updated_at();

drop trigger if exists services_set_updated_at on services;
create trigger services_set_updated_at
  before update on services
  for each row execute function set_updated_at();

-- ── Row Level Security ─────────────────────────────────
-- Lectura pública (anon) para el frontend; escritura solo con la
-- service_role key (bypasa RLS), usada por el script de seed y
-- futuros paneles admin server-side.

alter table categories enable row level security;
alter table products enable row level security;
alter table services enable row level security;

drop policy if exists "public read categories" on categories;
create policy "public read categories"
  on categories for select to anon, authenticated using (true);

drop policy if exists "public read products" on products;
create policy "public read products"
  on products for select to anon, authenticated using (true);

drop policy if exists "public read services" on services;
create policy "public read services"
  on services for select to anon, authenticated using (true);

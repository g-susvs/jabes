// Carga los datos exportados de Strapi (supabase/data/*.json) en Supabase.
// Idempotente: hace upsert por slug, se puede re-ejecutar sin duplicar.
//
// Requiere (en variables de entorno o en .env / .env.local):
//   SUPABASE_URL          p. ej. https://xxxx.supabase.co
//                         (o SUPABASE_ID=xxxx y se deriva la URL)
//   SUPABASE_SECRET_KEY   Settings → API Keys → secret key (sb_secret_...);
//                         también acepta SUPABASE_SERVICE_ROLE_KEY (legacy).
//                         Secreta: NUNCA usarla en el frontend.
//
// Uso:
//   npm run supabase:seed
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = resolve(__dirname, "../supabase/data");

// ── Cargar credenciales (env > .env.local > .env) ──────

async function loadEnvFile(path) {
  try {
    const text = await readFile(path, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (match && !(match[1] in process.env) && match[2] !== "") {
        process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    // archivo inexistente: ignorar
  }
}

await loadEnvFile(resolve(__dirname, "../.env.local"));
await loadEnvFile(resolve(__dirname, "../.env"));

const SUPABASE_URL =
  process.env.SUPABASE_URL?.replace(/\/$/, "") ??
  (process.env.SUPABASE_ID
    ? `https://${process.env.SUPABASE_ID}.supabase.co`
    : undefined);
const SERVICE_KEY =
  process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    "Faltan credenciales. Define SUPABASE_URL (o SUPABASE_ID) y\n" +
      "SUPABASE_SECRET_KEY (sb_secret_...) en el entorno o en jabes-front/.env"
  );
  process.exit(1);
}

if (/^sb_publishable_/.test(SERVICE_KEY)) {
  console.error(
    "La key configurada es publishable (solo lectura). El seed necesita la\n" +
      "secret key: Dashboard → Settings → API Keys → 'secret keys' (sb_secret_...)"
  );
  process.exit(1);
}

// ── Helpers ────────────────────────────────────────────

const mediaAlt = (media) => media?.alternativeText ?? null;

const mapSeo = (seo) =>
  seo
    ? {
        metaTitle: seo.metaTitle ?? null,
        metaDescription: seo.metaDescription ?? null,
        keywords: seo.keywords ?? null,
        canonicalUrl: seo.canonicalUrl ?? null,
        shareImageUrl: seo.shareImage?.url ?? null,
      }
    : null;

/** Upsert por slug vía PostgREST. Devuelve las filas resultantes. */
async function upsert(table, rows) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/${table}?on_conflict=slug`,
    {
      method: "POST",
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify(rows),
    }
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${table} → HTTP ${response.status}: ${body}`);
  }

  return response.json();
}

const readData = async (file) =>
  JSON.parse(await readFile(resolve(DATA_DIR, file), "utf8"));

// ── Seed ───────────────────────────────────────────────

// 1. Categorías (primero: los productos las referencian)
const strapiCategories = await readData("categories.json");
const categoryRows = strapiCategories.map((cat) => ({
  name: cat.name,
  slug: cat.slug,
  description: cat.description ?? null,
  active: cat.active ?? true,
  sort_order: cat.order ?? 0,
}));
const categories = await upsert("categories", categoryRows);
const categoryIdBySlug = new Map(categories.map((c) => [c.slug, c.id]));
console.log(`✔ categories: ${categories.length} upserted`);

// 2. Productos
const strapiProducts = await readData("products.json");
const productRows = strapiProducts.map((product) => ({
  name: product.name,
  slug: product.slug,
  description: product.description ?? null,
  price: product.price ?? null,
  image_url: product.image?.url ?? null,
  image_alt: mediaAlt(product.image),
  gallery: (product.gallery ?? []).map((img) => ({
    url: img.url,
    alt: mediaAlt(img),
  })),
  features: (product.features ?? []).map((f) => ({ text: f.text ?? "" })),
  seo: mapSeo(product.seo),
  featured: product.featured ?? false,
  active: product.active ?? true,
  category_id: categoryIdBySlug.get(product.category?.slug) ?? null,
}));
const products = await upsert("products", productRows);
console.log(`✔ products: ${products.length} upserted`);

const orphans = productRows.filter((p) => p.category_id === null);
if (orphans.length > 0) {
  console.warn(
    `⚠ ${orphans.length} producto(s) sin categoría: ` +
      orphans.map((p) => p.slug).join(", ")
  );
}

// 3. Servicios
const strapiServices = await readData("services.json");
const serviceRows = strapiServices.map((service) => ({
  title: service.title,
  slug: service.slug,
  description: service.description ?? null,
  icon: service.icon ?? null,
  image_url: service.image?.url ?? null,
  image_alt: mediaAlt(service.image),
  seo: mapSeo(service.seo),
  featured: service.featured ?? false,
  active: service.active ?? true,
  sort_order: service.order ?? 0,
}));
const services = await upsert("services", serviceRows);
console.log(`✔ services: ${services.length} upserted`);

console.log("\nSeed completado.");

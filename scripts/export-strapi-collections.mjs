// Exporta las colecciones de Strapi (products, categories, services) a JSON
// en supabase/data/, como insumo para la migración a Supabase.
//
// Uso:
//   node scripts/export-strapi-collections.mjs [STRAPI_URL]
//   npm run cms:export:collections
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_STRAPI_URL =
  "https://passionate-festival-44192e4acb.strapiapp.com";
const STRAPI_URL = (process.argv[2] ?? DEFAULT_STRAPI_URL).replace(/\/$/, "");

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../supabase/data");

const COLLECTIONS = [
  {
    file: "products.json",
    path: "/api/products",
    query:
      "populate[image]=true" +
      "&populate[gallery]=true" +
      "&populate[category]=true" +
      "&populate[features]=true" +
      "&populate[seo][populate]=shareImage" +
      "&sort=name:asc",
  },
  {
    file: "categories.json",
    path: "/api/categories",
    query: "sort=order:asc",
  },
  {
    file: "services.json",
    path: "/api/services",
    query:
      "populate[image]=true" +
      "&populate[seo][populate]=shareImage" +
      "&sort=order:asc",
  },
];

const PAGE_SIZE = 100;

/** Descarga todas las páginas de una colección Strapi v5. */
async function fetchAll(path, query) {
  const items = [];
  let page = 1;
  let pageCount = 1;

  while (page <= pageCount) {
    const url =
      `${STRAPI_URL}${path}?${query}` +
      `&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`${path} → HTTP ${response.status}`);
    }

    const json = await response.json();
    items.push(...(json.data ?? []));
    pageCount = json.meta?.pagination?.pageCount ?? 1;
    page++;
  }

  return items;
}

await mkdir(OUT_DIR, { recursive: true });

let failures = 0;

for (const { file, path, query } of COLLECTIONS) {
  try {
    const items = await fetchAll(path, query);
    const text = JSON.stringify(items, null, 2);
    await writeFile(resolve(OUT_DIR, file), text + "\n", "utf8");
    console.log(`✔ ${file}: ${items.length} registros (${(text.length / 1024).toFixed(1)} KB)`);
  } catch (error) {
    console.error(`✖ ${file}: ${error.message}`);
    failures++;
  }
}

if (failures > 0) {
  console.error(`\n${failures} colección(es) fallaron.`);
  process.exit(1);
}

console.log(`\nExportado desde ${STRAPI_URL} hacia supabase/data.`);

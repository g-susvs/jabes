// Exporta los single-types de Strapi a JSON estáticos en src/data/cms.
// Usa los MISMOS populate que los servicios del frontend para que cada JSON
// tenga exactamente la forma de la respuesta de la API de Strapi v5 y los
// mappers existentes se puedan reutilizar sin cambios.
//
// Uso:
//   node scripts/export-strapi-content.mjs [STRAPI_URL]
//   npm run cms:export                     (usa la URL de Strapi Cloud)
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_STRAPI_URL =
  "https://passionate-festival-44192e4acb.strapiapp.com";
const STRAPI_URL = (process.argv[2] ?? DEFAULT_STRAPI_URL).replace(/\/$/, "");

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../src/data/cms");

const SINGLE_TYPES = [
  {
    file: "home-page.json",
    path: "/api/home-page",
    query:
      "populate[heroImage]=true" +
      "&populate[servicesButton]=true" +
      "&populate[productsButton]=true" +
      "&populate[seo][populate]=shareImage" +
      "&populate[featuredServices][populate][0]=image" +
      "&populate[featuredProducts][populate][0]=image" +
      "&populate[featuredProducts][populate][1]=category",
  },
  {
    file: "products-page.json",
    path: "/api/products-page",
    query: "populate[seo][populate]=shareImage",
  },
  {
    file: "product-detail-page.json",
    path: "/api/product-detail-page",
    query: "populate[seo]=true",
  },
  {
    file: "services-page.json",
    path: "/api/services-page",
    query:
      "populate[services][populate]=image" +
      "&populate[cta][populate]=button" +
      "&populate[seo][populate]=shareImage",
  },
];

await mkdir(OUT_DIR, { recursive: true });

let failures = 0;

for (const { file, path, query } of SINGLE_TYPES) {
  const url = `${STRAPI_URL}${path}?${query}`;
  const response = await fetch(url);

  if (!response.ok) {
    console.error(`✖ ${path} → HTTP ${response.status}`);
    failures++;
    continue;
  }

  const json = await response.json();
  const text = JSON.stringify(json, null, 2);

  await writeFile(resolve(OUT_DIR, file), text + "\n", "utf8");
  console.log(`✔ ${file} (${(text.length / 1024).toFixed(1)} KB) ← ${path}`);
}

if (failures > 0) {
  console.error(`\n${failures} single-type(s) fallaron. JSON previos intactos.`);
  process.exit(1);
}

console.log(`\nExportado desde ${STRAPI_URL} hacia src/data/cms.`);

# Jabes — Frontend (jabes-front)

Sitio web del vivero y jardinería **Jabes**, construido con [Next.js 15](https://nextjs.org) (App Router) y React 19. El contenido público (inicio, productos, servicios y detalle de producto) se obtiene de **múltiples fuentes de datos intercambiables**: un snapshot local en JSON para el texto editorial y **Supabase** para el catálogo, con **Strapi** disponible como fuente alternativa.

## 🧱 Stack

- **Next.js** `15.5` con App Router y Turbopack
- **React** `19`
- **TailwindCSS** `4`
- **Supabase** (Postgres + API REST/PostgREST) como base de datos del catálogo
- **TanStack Query** (`@tanstack/react-query`) para datos del cliente
- **Metadata API** de Next.js para SEO dinámico
- **React Hook Form**, **react-toastify**, **react-icons**

## 🔌 Fuentes de datos

El contenido se divide en dos tipos, cada uno con su fuente:

### 1. Contenido editorial de páginas (textos, banners, hero, CTAs, SEO)

Vive en snapshots JSON embebidos en el build: [`src/data/cms/*.json`](src/data/cms) (`home-page.json`, `products-page.json`, `product-detail-page.json`, `services-page.json`). **Cero requests en runtime.** Se regeneran desde Strapi con `npm run cms:export`.

### 2. Catálogo (productos, categorías, servicios)

Vive en **Supabase** y se consulta en vivo vía su API REST con la *anon key* (solo lectura, protegida por RLS). Incluye los servicios de la página de servicios y los destacados del home.

### Selección de fuente (patrón fachada)

Los componentes **nunca** consultan una fuente concreta: usan fachadas que deciden de dónde salen los datos. Cambiar de fuente es editar una línea, sin tocar la UI.

| Fachada | Rol | Fuente por defecto |
| --- | --- | --- |
| [`shared/services/product.service.ts`](src/shared/services/product.service.ts) | Productos | Supabase |
| [`shared/services/category.service.ts`](src/shared/services/category.service.ts) | Categorías | Supabase |
| [`shared/services/service.service.ts`](src/shared/services/service.service.ts) | Servicios | Supabase |
| [`shared/services/content/get-*-content.ts`](src/shared/services/content) | Contenido de página | Local (JSON + Supabase) |

- **Implementaciones de catálogo:** `shared/services/external/{supabase,strapi}-*.service.ts`. Todas exponen la misma firma y mapean a los mismos DTOs, por lo que son intercambiables.
- **Fuentes de contenido:** `shared/services/content/local/get-json-*.ts` (JSON editorial + catálogo de Supabase) y `content/strapi/get-strapi-*.ts` (todo desde el CMS). El mapper de la forma CMS → interfaz del front es compartido por ambas.
- **Importante:** la consulta al catálogo de Supabase ocurre **solo en la fuente local**; la fuente Strapi permanece pura (usa sus listas embebidas), sin verse afectada.

Para volver una página al CMS, en su fachada `content/get-*-content.ts` se apunta a `getStrapi*Content` en lugar de `getJson*Content`.

## 🖼️ Media

Las imágenes provienen de **Cloudinary** (gestionadas originalmente por Strapi; en Supabase se guardan como URLs absolutas). El helper [`src/libs/strapi/index.ts`](src/libs/strapi/index.ts) (`getMediaUrl`) resuelve las URLs: si son absolutas (Cloudinary) las usa tal cual; si son relativas les antepone el host de Strapi. Cloudinary está autorizado en `next.config.ts` (`images.remotePatterns`).

## ⚡ Caché y rendimiento

- Los fetch al catálogo usan **ISR** (`next.revalidate`): 1 h para contenido editorial, 10 min para catálogo. Ver `REVALIDATE_*` en [`src/shared/constants`](src/shared/constants).
- Las llamadas repetidas por request (p. ej. `generateMetadata` + componente) se **deduplican** con `React.cache()`.
- El cliente de Supabase ([`src/libs/supabase/index.ts`](src/libs/supabase/index.ts)) aplica un **timeout** (15 s): si Supabase tarda (p. ej. un proyecto free despertando), la petición aborta y la página cae a su respaldo JSON en lugar de colgar el build o la request.

## 🔎 SEO dinámico

Cada página genera sus metadatos con la **Metadata API** (`generateMetadata`), tomando los valores del componente `seo` (`metaTitle`, `metaDescription`, `keywords`, `canonicalUrl`, `shareImage`), venga de JSON, Supabase o Strapi.

- **Helper central:** [`src/shared/seo/build-metadata.ts`](src/shared/seo/build-metadata.ts) (`buildMetadata`) → objeto `Metadata` de Next.js (Open Graph con `locale: es_PE`).
- **Prioridad:** valor de la fuente → *fallback* de la página → template global del layout.
- **Fallbacks por página:** [`src/shared/constants/seo-fallback.ts`](src/shared/constants/seo-fallback.ts).
- **URLs absolutas:** el `metadataBase` del layout resuelve `canonical` y `og:image` con `NEXT_PUBLIC_SITE_URL`.

## 🔑 Variables de entorno

Crea un archivo `.env` (o `.env.local`) a partir de [`example.env`](example.env). `.env*` está en `.gitignore`.

```bash
# Sitio
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CONTACT_PHONE=

# Supabase — catálogo (frontend, solo lectura vía RLS)
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxxxxxxx

# Supabase — solo para scripts de seed (NO usar en el frontend)
SUPABASE_ID=xxxx                       # o SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SECRET_KEY=sb_secret_xxxxxxxx # ignora RLS: mantener secreta

# Strapi — fuente alternativa del contenido (local o Cloud)
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

Las variables públicas se centralizan en [`src/config/env/environment.ts`](src/config/env/environment.ts).

## 🚀 Puesta en marcha

```bash
npm install
npm run dev   # http://localhost:3000
```

Con la configuración por defecto el sitio funciona **sin Strapi**: el contenido editorial sale de los JSON y el catálogo de Supabase. Solo necesitas las variables `NEXT_PUBLIC_SUPABASE_*`. Para editar contenido editorial y regenerar los JSON, o para usar Strapi como fuente, necesitas el CMS (`jabes-back`) corriendo.

### Base de datos (Supabase)

La configuración del esquema, políticas RLS, semilla y detalles de migración están en [`supabase/README.md`](supabase/README.md).

### Scripts disponibles

| Script | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo (Turbopack) |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build de producción |
| `npm run lint` | Ejecuta ESLint |
| `npm run cms:export` | Exporta los *single types* de Strapi → `src/data/cms/*.json` (los importa el build) |
| `npm run cms:export:collections` | Exporta las colecciones (productos, categorías, servicios) → `supabase/data/*.json` |
| `npm run supabase:seed` | Carga `supabase/data/*.json` en Supabase (upsert por `slug`, idempotente) |

## 🗂️ Estructura

```
src/
├─ app/                      # Rutas (App Router): (public)/home, products, services...
├─ data/cms/                 # Snapshots JSON del contenido editorial (embebidos en el build)
├─ modules/public/           # Páginas y componentes por dominio
├─ libs/
│  ├─ supabase/              # Cliente REST de Supabase (con timeout)
│  └─ strapi/                # getMediaUrl y tipos de media
├─ config/env/               # Variables de entorno tipadas
└─ shared/
   ├─ services/
   │  ├─ product|category|service.service.ts   # Fachadas de catálogo
   │  ├─ external/            # Implementaciones supabase-*/strapi-* (misma firma)
   │  └─ content/             # Contenido de página: fachada + local (json) + strapi
   ├─ seo/                    # buildMetadata + interfaces del componente seo
   └─ ...                     # Componentes, hooks, constantes, interfaces

supabase/                     # Esquema SQL, políticas RLS, semilla y datos (ver su README)
scripts/                      # Export desde Strapi y seed a Supabase
```

## 📝 Editar contenido

- **Catálogo y destacados** (productos, categorías, servicios; columna `featured` del home): en el **Table Editor de Supabase**. Los cambios se ven en el sitio en ≤ 10 min (revalidación ISR), sin deploy.
- **Textos de páginas** (banners, hero, CTAs): editar en Strapi → `npm run cms:export` → commit, o editar el JSON de `src/data/cms/` directamente.

## 📦 Despliegue

Optimizado para [Vercel](https://vercel.com/new). En el panel del proyecto define **todas** las variables públicas de Supabase (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`), además de `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_PHONE` y, si usas Strapi como fuente, `NEXT_PUBLIC_STRAPI_URL`. Sin las variables de Supabase, el catálogo no cargará.

> **Plan free de Supabase:** el proyecto se pausa tras ~7 días de inactividad; la primera petición que lo despierta puede ser lenta. El timeout del cliente evita que eso rompa el build, pero para evitar las pausas conviene un *keep-alive* (una petición periódica al proyecto).

Configura `NEXT_PUBLIC_SITE_URL` con el dominio de producción para que `canonical` y `og:image` apunten a URLs estables. Consulta la [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying).

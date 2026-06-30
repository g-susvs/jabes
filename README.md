# Jabes — Frontend (jabes-front)

Sitio web del vivero y jardinería **Jabes**, construido con [Next.js 15](https://nextjs.org) (App Router) y React 19. El contenido público (inicio, productos, servicios y detalle de producto) **se obtiene desde el CMS de Strapi** (`jabes-back`), no de archivos locales.

## 🧱 Stack

- **Next.js** `15.5` con App Router y Turbopack
- **React** `19`
- **TailwindCSS** `4`
- **TanStack Query** (`@tanstack/react-query`) para datos del cliente
- **Metadata API** de Next.js para SEO dinámico desde el CMS
- **React Hook Form**, **AJV**, **react-toastify**, **react-icons**

## ✨ Cambios respecto al proyecto inicial

- El contenido de las páginas públicas **ya no vive en archivos locales**: ahora se consume del **CMS de Strapi**. Los servicios en `src/modules/public/**/services/get-strapi-*.ts` consultan los endpoints de Strapi (`/api/home-page`, `/api/products`, etc.) y mapean la respuesta a las interfaces del front.
- Las imágenes provienen de **Cloudinary** (servidas por Strapi). El helper [`src/libs/strapi/index.ts`](src/libs/strapi/index.ts) (`getMediaUrl`) resuelve las URLs de media: si ya son absolutas (Cloudinary) las usa tal cual, y si son relativas las antepone con el host de Strapi.
- **SEO dinámico desde el CMS** (ver sección [🔎 SEO dinámico](#-seo-dinámico)): cada página genera sus metadatos (`title`, `description`, `canonical`, Open Graph) a partir del componente `seo` de Strapi, con valores por defecto cuando el CMS no los provee.

## 🔎 SEO dinámico

Las páginas públicas generan sus metadatos en tiempo de ejecución mediante la **Metadata API** de Next.js (`generateMetadata`), tomando los valores del componente `seo` de Strapi (`metaTitle`, `metaDescription`, `keywords`, `canonicalUrl`, `shareImage`).

- **Helper central:** [`src/shared/seo/build-metadata.ts`](src/shared/seo/build-metadata.ts) (`buildMetadata`) convierte el componente `seo` de Strapi en el objeto `Metadata` de Next.js (incluye Open Graph con `locale: es_PE`).
- **Prioridad de resolución:** valor del CMS → *fallback* de la página → template global del layout.
- **Fallbacks por página:** definidos en [`src/shared/constants/seo-fallback.ts`](src/shared/constants/seo-fallback.ts) (home, productos, servicios y detalle de producto).
- **Detalle de producto:** usa el SEO propio del producto; si el producto no existe se devuelve `robots: { index: false }` para no indexar páginas vacías.
- **URLs absolutas:** el `metadataBase` del layout ([`src/app/layout.tsx`](src/app/layout.tsx)) resuelve `canonical` y `og:image` usando `NEXT_PUBLIC_SITE_URL`.

## 🔌 Fuentes de datos

- **CMS / Strapi** (`NEXT_PUBLIC_STRAPI_URL`): contenido público de las páginas, productos, servicios, media y metadatos SEO. Las consultas se hacen con `fetch` nativo.
- **API propia** (`NEXT_PUBLIC_API_URL`): endpoints para `auth`, `categories` y `products` (zona autenticada).

## 🔑 Variables de entorno

Crea un archivo `.env` (o `.env.local`) con:

```bash
# CMS Strapi (contenido público y media)
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# API propia (auth / categorías / productos)
NEXT_PUBLIC_API_URL=http://localhost:1337/api

# URL pública del sitio (para canonical y og:image absolutos en el SEO)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Teléfono de contacto mostrado en el sitio
NEXT_PUBLIC_CONTACT_PHONE=

# Cloudinary (subida directa desde el front, si aplica)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Las variables se centralizan en [`src/config/env/environment.ts`](src/config/env/environment.ts).

## 🚀 Puesta en marcha

Asegúrate de tener el CMS (`jabes-back`) corriendo y `NEXT_PUBLIC_STRAPI_URL` apuntando a él. Luego:

```bash
npm install
npm run dev   # http://localhost:3000
```

### Scripts disponibles

| Script | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo (Turbopack) |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build de producción |
| `npm run lint` | Ejecuta ESLint |

## 🗂️ Estructura

```
src/
├─ app/                 # Rutas (App Router): (public)/home, products, services...
├─ modules/public/      # Páginas y componentes por dominio
│  └─ */services/       # Servicios que consumen el CMS de Strapi
├─ libs/                # strapi (getMediaUrl), cloudinary, query...
├─ config/env/          # Variables de entorno tipadas
└─ shared/              # Componentes, hooks, servicios, SEO e interfaces reutilizables
   └─ seo/              # buildMetadata + interfaces del componente seo de Strapi
```

## 📦 Despliegue

Optimizado para [Vercel](https://vercel.com/new). Define las variables de entorno (`NEXT_PUBLIC_STRAPI_URL`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL`, etc.) en el panel del proyecto. Configura `NEXT_PUBLIC_SITE_URL` con el dominio de producción para que los `canonical` y `og:image` apunten a URLs estables. Consulta la [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying).

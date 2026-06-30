# Jabes — Frontend (jabes-front)

Sitio web del vivero y jardinería **Jabes**, construido con [Next.js 15](https://nextjs.org) (App Router) y React 19. El contenido público (inicio, productos, servicios y detalle de producto) **se obtiene desde el CMS de Strapi** (`jabes-back`), no de archivos locales.

## 🧱 Stack

- **Next.js** `15.5` con App Router y Turbopack
- **React** `19`
- **TailwindCSS** `4`
- **TanStack Query** (`@tanstack/react-query`) para datos del cliente
- **Axios** para llamadas a la API
- **React Hook Form**, **AJV**, **react-toastify**, **react-icons**

## ✨ Cambios respecto al proyecto inicial

- El contenido de las páginas públicas **ya no vive en archivos locales**: ahora se consume del **CMS de Strapi**. Los servicios en `src/modules/public/**/services/get-strapi-*.ts` consultan los endpoints de Strapi (`/api/home-page`, `/api/products`, etc.) y mapean la respuesta a las interfaces del front.
- Las imágenes provienen de **Cloudinary** (servidas por Strapi). El helper [`src/libs/strapi/index.ts`](src/libs/strapi/index.ts) (`getMediaUrl`) resuelve las URLs de media: si ya son absolutas (Cloudinary) las usa tal cual, y si son relativas las antepone con el host de Strapi.

## 🔌 Fuentes de datos

- **CMS / Strapi** (`NEXT_PUBLIC_STRAPI_URL`): contenido público de las páginas, productos, servicios y media.
- **API propia** (`NEXT_PUBLIC_API_URL`): instancias de Axios en [`src/libs/axios.ts`](src/libs/axios.ts) para `auth`, `categories` y `products` (zona autenticada; incluye interceptor de token y redirección a login ante 401/403).

## 🔑 Variables de entorno

Crea un archivo `.env` (o `.env.local`) con:

```bash
# CMS Strapi (contenido público y media)
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# API propia (auth / categorías / productos)
NEXT_PUBLIC_API_URL=http://localhost:1337/api

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
├─ libs/                # axios, strapi (getMediaUrl), cloudinary, query...
├─ config/env/          # Variables de entorno tipadas
└─ shared/              # Componentes, hooks, servicios e interfaces reutilizables
```

## 📦 Despliegue

Optimizado para [Vercel](https://vercel.com/new). Define las variables de entorno (`NEXT_PUBLIC_STRAPI_URL`, `NEXT_PUBLIC_API_URL`, etc.) en el panel del proyecto. Consulta la [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying).

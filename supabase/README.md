# Supabase — catálogo (products, categories, services)

Base de datos del catálogo. El contenido editorial de páginas (single types)
vive aparte, en `src/data/cms/*.json`.

## Contenido

- `schema.sql` — tablas, índices, triggers y políticas RLS. Fuente de verdad del esquema; recrea la base desde cero.
- `policies-active-only.sql` — endurece las políticas de lectura para que la key pública solo vea filas activas. Idempotente.
- `data/*.json` — **semilla inicial** exportada de Strapi (ver nota abajo).

## Puesta en marcha (una sola vez)

1. Crear el proyecto en [supabase.com](https://supabase.com) (plan gratuito).
2. Dashboard → **SQL Editor** → ejecutar `schema.sql` (ya incluye las políticas endurecidas).
3. En `jabes-front/.env` definir las credenciales (NO se comitean; `.env` está en `.gitignore`):

   ```
   SUPABASE_ID=xxxx                         # o SUPABASE_URL=https://xxxx.supabase.co
   SUPABASE_SECRET_KEY=sb_secret_...        # Settings → API Keys → secret key
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...   # publishable: solo lectura, segura en el front
   ```

4. Cargar la semilla:

   ```
   npm run supabase:seed
   ```

## ⚠️ Sobre `data/*.json` — es una semilla, no un espejo

Estos JSON son una **foto del catálogo en el momento de la migración**, pensada
para recrear una base desde cero (`npm run supabase:seed`) o levantar un entorno
de desarrollo/pruebas.

**La fuente de verdad viva del catálogo es Supabase**, no estos archivos. Una vez
en producción, los datos se editan en el **Table Editor de Supabase**; esos
cambios NO se reflejan aquí y este JSON quedará desactualizado con el tiempo.
Eso es esperado — no lo re-comitees en cada cambio de catálogo.

Solo regenéralo a propósito (para refrescar la semilla) con:

```
npm run cms:export:collections    # reexporta products, categories y services desde Strapi
```

## Scripts relacionados

- `npm run cms:export` — single types de página → `src/data/cms/*.json` (los importa el build).
- `npm run cms:export:collections` — colecciones del catálogo → `supabase/data/*.json`.
- `npm run supabase:seed` — carga `supabase/data/*.json` en Supabase (upsert por `slug`, idempotente).

import type { Metadata } from "next";
import { getMediaUrl } from "@/libs/strapi";
import { IStrapiSeo } from "./interfaces";

// TODO: evaluate source to this value
const SITE_NAME = "Jardinería Jabes";

/**
 * Imagen Open Graph por defecto (1200x630, en /public). Se usa cuando el CMS
 * no define `shareImage`, de modo que TODA página compartida en WhatsApp/redes
 * muestre siempre una vista previa con imagen. La ruta relativa se resuelve a
 * URL absoluta mediante `metadataBase` (definido en el layout raíz).
 */
const DEFAULT_OG_IMAGE = "/og-default.png";

interface IBuildMetadataParams {
  /** Componente `seo` proveniente de Strapi (puede venir vacío o null). */
  seo?: IStrapiSeo | null;
  /** Valores por defecto cuando el CMS no trae `metaTitle`/`metaDescription`. */
  fallback: {
    title: string;
    description: string;
  };
  /**
   * Ruta canónica relativa de la página, p.ej. "/products" o
   * "/products/rosa-roja". Se usa para `canonical` y `og:url` si el CMS
   * no define `canonicalUrl`. Debe ser absoluta gracias a `metadataBase`.
   */
  path?: string;
}

/**
 * Convierte el componente `seo` de Strapi en el objeto `Metadata` de Next.js.
 *
 * Prioridad: valor del CMS → fallback de la página → template global del layout.
 * Negocio peruano → locale `es_PE` en Open Graph.
 */
export const buildMetadata = ({
  seo,
  fallback,
  path,
}: IBuildMetadataParams): Metadata => {
  const metaTitle = seo?.metaTitle?.trim();
  const description = seo?.metaDescription?.trim() || fallback.description;

  // Si el CMS trae título completo, usamos `absolute` para NO aplicar el
  // template "%s | Jabes" del layout (evita marca duplicada). Si no, devolvemos
  // un string simple y el layout le añade el sufijo de marca.
  const title: Metadata["title"] = metaTitle
    ? { absolute: metaTitle }
    : fallback.title;

  const keywords = seo?.keywords
    ? seo.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
    : undefined;

  const canonical = seo?.canonicalUrl?.trim() || path;
  const ogTitle = metaTitle ?? fallback.title;

  // Imagen del CMS si existe; si no, la imagen OG de marca por defecto.
  // Solo la default tiene dimensiones conocidas (1200x630) para el hint OG.
  const cmsImage = getMediaUrl(seo?.shareImage);
  const ogImage = cmsImage
    ? { url: cmsImage, alt: ogTitle }
    : { url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: ogTitle };

  return {
    title,
    description,
    keywords,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: ogTitle,
      description,
      siteName: SITE_NAME,
      locale: "es_PE",
      type: "website",
      ...(canonical ? { url: canonical } : {}),
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage.url],
    },
  };
};

import type { Metadata } from "next";
import { getMediaUrl } from "@/libs/strapi";
import { IStrapiSeo } from "./interfaces";

// TODO: evaluate source to this value
const SITE_NAME = "Jardinería Jabes";

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
  const imageUrl = getMediaUrl(seo?.shareImage);

  return {
    title,
    description,
    keywords,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: metaTitle ?? fallback.title,
      description,
      siteName: SITE_NAME,
      locale: "es_PE",
      type: "website",
      ...(canonical ? { url: canonical } : {}),
      ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
    },
    // TODO: remove until implement this social network
    // twitter: {
    //   card: imageUrl ? "summary_large_image" : "summary",
    //   title: metaTitle ?? fallback.title,
    //   description,
    //   ...(imageUrl ? { images: [imageUrl] } : {}),
    // },
  };
};

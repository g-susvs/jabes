import { IStrapiMedia } from "@/libs/strapi/interfaces";

/**
 * Componente SEO compartido de Strapi (shared.seo).
 * Mismos campos que define el CMS para cada página/producto.
 */
export interface IStrapiSeo {
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string | null;
  canonicalUrl?: string | null;
  shareImage?: IStrapiMedia | null;
}

/**
 * Contenido SEO por defecto (en duro) de cada página pública.
 * Se usa cuando el componente `seo` del CMS (Strapi) viene vacío.
 * Centralizado aquí para mantener las páginas del App Router limpias.
 */

export interface ISeoFallbackContent {
  title: string;
  description: string;
}

export const SEO_FALLBACK = {
  home: {
    title: "Vivero y jardinería en Perú",
    description:
      "Jabes: vivero y jardinería en Perú. Plantas, diseño de jardines y mantenimiento. Cotiza por WhatsApp.",
  },
  services: {
    title: "Servicios de jardinería",
    description:
      "Diseño de jardines, mantenimiento y servicios de jardinería en Perú. Escríbenos por WhatsApp para una cotización.",
  },
  products: {
    title: "Catálogo de plantas y productos",
    description:
      "Explora nuestro catálogo de plantas y productos de vivero en Perú. Consulta disponibilidad y precios por WhatsApp.",
  },
} satisfies Record<string, ISeoFallbackContent>;

/** Título para el detalle cuando el producto no existe. */
export const PRODUCT_NOT_FOUND_TITLE = "Producto no encontrado";

/**
 * Fallback dinámico del detalle de producto, construido a partir de los
 * propios datos del producto cuando no tiene `seo` en el CMS.
 */
export const buildProductDetailFallback = (
  name: string,
  description?: string | null
): ISeoFallbackContent => ({
  title: name,
  description:
    description?.trim() ||
    `${name} disponible en Jabes. Consulta precio y disponibilidad por WhatsApp.`,
});

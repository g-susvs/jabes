import { IProductDetailPageContent } from "@/modules/public/product-detail/interface/product-detail";
import { getJsonProductDetailContent } from "@/shared/services/content/local/get-json-product-detail-content";

/**
 * Fuente del contenido editorial de la ficha de producto.
 * Cambiar a getStrapiProductDetailContent para volver a leer del CMS.
 */
export const getProductDetailContent = getJsonProductDetailContent;


// ── Strapi response types (forma de la API v5 y del JSON exportado) ──

export interface IStrapiProductDetailPage {
  headerAction?: string | null;
  detailSubtitle?: string | null;
  detailAction?: string | null;
  detailExtraInfo?: string | null;
  relatedProductsTitle?: string | null;
}

export interface IStrapiProductDetailPageResponse {
  data?: IStrapiProductDetailPage | null;
}

// ── Mapper compartido por las fuentes strapi y json ────

export const mapProductDetailContent = (
  data: IStrapiProductDetailPage
): IProductDetailPageContent => ({
  header: {
    action: data.headerAction ?? "",
  },
  detail: {
    subtitle: data.detailSubtitle ?? "",
    action: data.detailAction ?? "",
    extraInfo: data.detailExtraInfo ?? "",
  },
  relatedProducts: {
    title: data.relatedProductsTitle ?? "",
  },
});

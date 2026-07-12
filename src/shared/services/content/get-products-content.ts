import { getJsonProductsContent } from "@/shared/services/content/local/get-json-products-content";
import { IStrapiSeo } from "@/shared/seo/interfaces";
import { IProductsPageContent } from "@/modules/public/products/interface/products";

/**
 * Fuente del contenido editorial de la página de productos.
 * Cambiar a getStrapiProductsContent para volver a leer del CMS.
 */
export const getProductsContent = getJsonProductsContent;


// ── Strapi response types (forma de la API v5 y del JSON exportado) ──

export interface IStrapiProductsPage {
  bannerTitle?: string | null;
  bannerDescription?: string | null;
  filtersTitle?: string | null;
  emptyStateTitle?: string | null;
  emptyStateDescription?: string | null;
  allCategoriesLabel?: string | null;
  productCardActionLabel?: string | null;
  seo?: IStrapiSeo | null;
}

export interface IStrapiProductsPageResponse {
  data?: IStrapiProductsPage | null;
}

// ── Mapper compartido por las fuentes strapi y json ────

export const mapProductsContent = (
  data: IStrapiProductsPage
): IProductsPageContent => ({
  banner: {
    title: data.bannerTitle ?? "",
    description: data.bannerDescription ?? "",
  },
  main: {
    title: data.filtersTitle ?? "",
    categories: [
      {
        label: data.allCategoriesLabel ?? "",
        value: "all",
      },
    ],
    cardContent: {
      label: data.productCardActionLabel ?? "",
    },
    emptyState: {
      title: data.emptyStateTitle ?? "No hay productos disponibles",
      description:
        data.emptyStateDescription ??
        "Prueba con otra categoría o vuelve más tarde.",
    },
  },
  seo: data.seo ?? null,
});

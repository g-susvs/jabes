import { environment } from "@/config/env/environment";
import { IProductsPageContent } from "../interface/products";

const STRAPI_URL = environment.strapiHost;

const PRODUCTS_PAGE_QUERY = "populate[seo]=true";

// ── Strapi response types ──────────────────────────────

interface IStrapiProductsPage {
  bannerTitle?: string | null;
  bannerDescription?: string | null;
  filtersTitle?: string | null;
  emptyStateTitle?: string | null;
  emptyStateDescription?: string | null;
  allCategoriesLabel?: string | null;
  productCardActionLabel?: string | null;
}

interface IStrapiProductsPageResponse {
  data?: IStrapiProductsPage | null;
}

export const getStrapiProductsContent =
  async (): Promise<IProductsPageContent | null> => {

    try {
      const response = await fetch(
        `${STRAPI_URL}/api/products-page?${PRODUCTS_PAGE_QUERY}`,
        { cache: "no-store" }
      );

      if (!response.ok) return null;

      const json = (await response.json()) as IStrapiProductsPageResponse;
      const data = json.data;

      if (!data) return null;

      return {
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
      };
    } catch {
      return null;
    }
  };

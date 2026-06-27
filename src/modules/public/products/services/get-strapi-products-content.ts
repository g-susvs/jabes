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
          categories: [],
          cardContent: {
            label: data.emptyStateTitle ?? "",
          },
        },
      };
    } catch {
      return null;
    }
  };

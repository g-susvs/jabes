import { getContent } from "@/libs/get-content";
import { IProductsPageContent } from "../interface/products";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

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

// ── Main function ──────────────────────────────────────

const getProductsFallback = async () => {
  return (await getContent("products")) as IProductsPageContent;
};

export const getStrapiProductsContent =
  async (): Promise<IProductsPageContent> => {
    const fallback = await getProductsFallback();

    try {
      const response = await fetch(
        `${STRAPI_URL}/api/products-page?${PRODUCTS_PAGE_QUERY}`,
        { cache: "no-store" }
      );

      if (!response.ok) return fallback;

      const json = (await response.json()) as IStrapiProductsPageResponse;
      const data = json.data;

      if (!data) return fallback;

      return {
        banner: {
          title: data.bannerTitle ?? fallback.banner.title,
          description: data.bannerDescription ?? fallback.banner.description,
        },
        main: {
          title: data.filtersTitle ?? fallback.main.title,
          categories: fallback.main.categories,
          products: fallback.main.products,
          cardContent: fallback.main.cardContent,
        },
      };
    } catch {
      return fallback;
    }
  };

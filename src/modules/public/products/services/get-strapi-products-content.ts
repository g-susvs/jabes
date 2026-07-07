import { cache } from "react";
import { environment } from "@/config/env/environment";
import { IProductsPageContent } from "../interface/products";
import { IStrapiSeo } from "@/shared/seo/interfaces";
import { REVALIDATE_CONTENT_SECONDS } from "@/shared/constants";

const STRAPI_URL = environment.strapiHost;

const PRODUCTS_PAGE_QUERY = "populate[seo][populate]=shareImage";

// ── Strapi response types ──────────────────────────────

interface IStrapiProductsPage {
  bannerTitle?: string | null;
  bannerDescription?: string | null;
  filtersTitle?: string | null;
  emptyStateTitle?: string | null;
  emptyStateDescription?: string | null;
  allCategoriesLabel?: string | null;
  productCardActionLabel?: string | null;
  seo?: IStrapiSeo | null;
}

interface IStrapiProductsPageResponse {
  data?: IStrapiProductsPage | null;
}

// cache() deduplica la doble llamada generateMetadata + componente en una
// misma request; el fetch con revalidate cachea entre visitas (ISR).
export const getStrapiProductsContent = cache(
  async (): Promise<IProductsPageContent | null> => {

    try {
      const response = await fetch(
        `${STRAPI_URL}/api/products-page?${PRODUCTS_PAGE_QUERY}`,
        { next: { revalidate: REVALIDATE_CONTENT_SECONDS } }
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
        seo: data.seo ?? null,
      };
    } catch {
      return null;
    }
  }
);

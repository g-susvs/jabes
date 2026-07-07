import { cache } from "react";
import { environment } from "@/config/env/environment";
import { REVALIDATE_CONTENT_SECONDS } from "@/shared/constants";
import { IProductsPageContent } from "@/modules/public/products/interface/products";
import { IStrapiProductsPageResponse, mapProductsContent } from "../get-products-content";


const STRAPI_URL = environment.strapiHost;

const PRODUCTS_PAGE_QUERY = "populate[seo][populate]=shareImage";

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

      return json.data ? mapProductsContent(json.data) : null;
    } catch {
      return null;
    }
  }
);

import { cache } from "react";
import { environment } from "@/config/env/environment";
import { REVALIDATE_CONTENT_SECONDS } from "@/shared/constants";
import { IProductDetailPageContent } from "@/modules/public/product-detail/interface/product-detail";
import { IStrapiProductDetailPageResponse, mapProductDetailContent } from "../get-product-detail-content";


const STRAPI_URL = environment.strapiHost;

const PRODUCT_DETAIL_PAGE_QUERY = "populate[seo]=true";

// cache() deduplica llamadas repetidas dentro de una misma request; el
// fetch con revalidate cachea entre visitas (ISR).
export const getStrapiProductDetailContent = cache(
  async (): Promise<IProductDetailPageContent | null> => {
    try {
      const response = await fetch(
        `${STRAPI_URL}/api/product-detail-page?${PRODUCT_DETAIL_PAGE_QUERY}`,
        { next: { revalidate: REVALIDATE_CONTENT_SECONDS } }
      );

      if (!response.ok) return null;

      const json = (await response.json()) as IStrapiProductDetailPageResponse;

      return json.data ? mapProductDetailContent(json.data) : null;
    } catch {
      return null;
    }
  }
);

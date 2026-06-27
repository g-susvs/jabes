import { environment } from "@/config/env/environment";
import { IProductDetailPageContent } from "../interface/product-detail";

const STRAPI_URL = environment.strapiHost;

const PRODUCT_DETAIL_PAGE_QUERY = "populate[seo]=true";

interface IStrapiProductDetailPage {
  headerAction?: string | null;
  detailSubtitle?: string | null;
  detailAction?: string | null;
  detailExtraInfo?: string | null;
  relatedProductsTitle?: string | null;
}

interface IStrapiProductDetailPageResponse {
  data?: IStrapiProductDetailPage | null;
}

export const getStrapiProductDetailContent =
  async (): Promise<IProductDetailPageContent | null> => {
    try {
      const response = await fetch(
        `${STRAPI_URL}/api/product-detail-page?${PRODUCT_DETAIL_PAGE_QUERY}`,
        { cache: "no-store" }
      );

      if (!response.ok) return null;

      const json = (await response.json()) as IStrapiProductDetailPageResponse;
      const data = json.data;

      if (!data) return null;

      return {
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
      };
    } catch {
      return null;
    }
  };

import productDetailPageJson from "@/data/cms/product-detail-page.json";
import { IProductDetailPageContent } from "@/modules/public/product-detail/interface/product-detail";
import { IStrapiProductDetailPageResponse, mapProductDetailContent } from "../get-product-detail-content";

/**
 * Contenido de la ficha de producto desde el snapshot exportado de Strapi
 * (src/data/cms/product-detail-page.json, regenerable con `npm run cms:export`).
 * Cero requests en runtime: el JSON se embebe en el build.
 */
export const getJsonProductDetailContent =
  async (): Promise<IProductDetailPageContent | null> => {
    const data = (
      productDetailPageJson as unknown as IStrapiProductDetailPageResponse
    ).data;
    return data ? mapProductDetailContent(data) : null;
  };

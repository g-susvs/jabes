import productsPageJson from "@/data/cms/products-page.json";
import { IStrapiProductsPageResponse, mapProductsContent } from "../get-products-content";
import { IProductsPageContent } from "@/modules/public/products/interface/products";

/**
 * Contenido de la página de productos desde el snapshot exportado de Strapi
 * (src/data/cms/products-page.json, regenerable con `npm run cms:export`).
 * Cero requests en runtime: el JSON se embebe en el build.
 */
export const getJsonProductsContent =
  async (): Promise<IProductsPageContent | null> => {
    const data = (productsPageJson as unknown as IStrapiProductsPageResponse)
      .data;
    return data ? mapProductsContent(data) : null;
  };

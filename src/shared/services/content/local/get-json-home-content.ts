import homePageJson from "@/data/cms/home-page.json";
import { IStrapiHomeResponse, mapHomeContent } from "../get-home-content";
import { IHomePageContent } from "@/modules/public/home/interface/home";

/**
 * Contenido de Home desde el snapshot exportado de Strapi
 * (src/data/cms/home-page.json, regenerable con `npm run cms:export`).
 * Cero requests en runtime: el JSON se embebe en el build.
 */
export const getJsonHomeContent = async (): Promise<IHomePageContent | null> => {
  const data = (homePageJson as unknown as IStrapiHomeResponse).data;
  return data ? mapHomeContent(data) : null;
};

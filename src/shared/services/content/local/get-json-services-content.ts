import servicesPageJson from "@/data/cms/services-page.json";
import { IServicesPageContent } from "@/modules/public/services/interface/services";
import { IStrapiServicesPageResponse, mapServicesContent } from "../get-services-content";


/**
 * Contenido de la página de servicios desde el snapshot exportado de Strapi
 * (src/data/cms/services-page.json, regenerable con `npm run cms:export`).
 * Cero requests en runtime: el JSON se embebe en el build.
 */
export const getJsonServicesContent =
  async (): Promise<IServicesPageContent | null> => {
    const data = (servicesPageJson as unknown as IStrapiServicesPageResponse)
      .data;
    return data ? mapServicesContent(data) : null;
  };

import { cache } from "react";
import { environment } from "@/config/env/environment";
import { REVALIDATE_CONTENT_SECONDS } from "@/shared/constants";
import { IServicesPageContent } from "@/modules/public/services/interface/services";
import { IStrapiServicesPageResponse, mapServicesContent } from "../get-services-content";


const STRAPI_URL = environment.strapiHost;

const SERVICES_PAGE_QUERY =
  "populate[services][populate]=image" +
  "&populate[cta][populate]=button" +
  "&populate[seo][populate]=shareImage";

// cache() deduplica la doble llamada generateMetadata + componente en una
// misma request; el fetch con revalidate cachea entre visitas (ISR).
export const getStrapiServicesContent = cache(
  async (): Promise<IServicesPageContent | null> => {

    try {
      const response = await fetch(
        `${STRAPI_URL}/api/services-page?${SERVICES_PAGE_QUERY}`,
        { next: { revalidate: REVALIDATE_CONTENT_SECONDS } }
      );

      if (!response.ok) return null;

      const json = (await response.json()) as IStrapiServicesPageResponse;

      return json.data ? mapServicesContent(json.data) : null;
    } catch {
      return null;
    }
  }
);

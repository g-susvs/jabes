import { cache } from "react";
import { IHomePageContent } from "../interface/home";
import { environment } from "@/config/env/environment";
import { REVALIDATE_CONTENT_SECONDS } from "@/shared/constants";
import { IStrapiHomeResponse, mapHomeContent } from "./map-home-content";

const STRAPI_URL = environment.strapiHost;
const HOME_PAGE_QUERY =
  "populate[heroImage]=true" +
  "&populate[servicesButton]=true" +
  "&populate[productsButton]=true" +
  "&populate[seo][populate]=shareImage" +
  "&populate[featuredServices][populate][0]=image" +
  "&populate[featuredProducts][populate][0]=image" +
  "&populate[featuredProducts][populate][1]=category";

// cache() deduplica la doble llamada generateMetadata + componente en una
// misma request; el fetch con revalidate cachea entre visitas (ISR).
export const getStrapiHomeContent = cache(async (): Promise<IHomePageContent | null> => {

  try {
    const response = await fetch(`${STRAPI_URL}/api/home-page?${HOME_PAGE_QUERY}`, {
      next: { revalidate: REVALIDATE_CONTENT_SECONDS },
    });

    if (!response.ok) return null;

    const json = (await response.json()) as IStrapiHomeResponse;

    return json.data ? mapHomeContent(json.data) : null;
  } catch {
    return null;
  }
});

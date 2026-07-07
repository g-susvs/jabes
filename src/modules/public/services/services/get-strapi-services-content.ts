import { cache } from "react";
import { environment } from "@/config/env/environment";
import { IServicesPageContent } from "../interface/services";
import { IStrapiMedia } from "@/libs/strapi/interfaces";
import { IStrapiSeo } from "@/shared/seo/interfaces";
import { getMediaUrl } from "@/libs/strapi";
import { REVALIDATE_CONTENT_SECONDS } from "@/shared/constants";

const STRAPI_URL = environment.strapiHost;

const SERVICES_PAGE_QUERY =
  "populate[services][populate]=image" +
  "&populate[cta][populate]=button" +
  "&populate[seo][populate]=shareImage";

// ── Strapi response types ──────────────────────────────

interface IStrapiButtonLink {
  label?: string | null;
  url?: string | null;
  isExternal?: boolean | null;
}

interface IStrapiCta {
  title?: string | null;
  description?: string | null;
  button?: IStrapiButtonLink | null;
}

interface IStrapiService {
  id?: number;
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  icon?: string | null;
  image?: IStrapiMedia | null;
  active?: boolean | null;
  order?: number | null;
  featured?: boolean | null;
}

interface IStrapiServicesPage {
  bannerTitle?: string | null;
  bannerDescription?: string | null;
  mainTitle?: string | null;
  services?: IStrapiService[] | null;
  cta?: IStrapiCta | null;
  seo?: IStrapiSeo | null;
}

interface IStrapiServicesPageResponse {
  data?: IStrapiServicesPage | null;
}

// ── Main function ──────────────────────────────────────

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
      const data = json.data;

      if (!data) return null;

      // Map services from Strapi to frontend interface
      const cards = data.services?.length
        ? data.services.map((service) => ({
          title: service.title ?? "",
          description: service.description ?? "",
          img: {
            alt:
              service.image?.alternativeText ??
              service.title ??
              "",
            src: getMediaUrl(service.image),
          },
          icon: service.icon ?? "MdOutlineContentCut",
        }))
        : [];

      // Map CTA from Strapi to frontend interface
      const callToAction = {
        title: data?.cta?.title ?? "",
        description:
          data?.cta?.description ?? "",
        link: {
          label:
            data?.cta?.button?.label ?? "",
          href: data?.cta?.button?.url ?? "",
        },
      }

      return {
        banner: {
          title: data.bannerTitle ?? "",
          description: data.bannerDescription ?? "",
        },
        main: {
          title: data.mainTitle ?? "",
          cards,
        },
        callToAction,
        seo: data.seo ?? null,
      };
    } catch {
      return null;
    }
  }
);

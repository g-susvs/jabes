import { getContent } from "@/libs/get-content";
import { IServicesPageContent } from "../interface/services";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const PLACEHOLDER_IMAGE = "https://placehold.co/600x400?text=Servicio";

const SERVICES_PAGE_QUERY =
  "populate[services][populate]=image" +
  "&populate[cta][populate]=button" +
  "&populate[seo]=true";

// ── Strapi response types ──────────────────────────────

interface IStrapiMediaFormat {
  url?: string | null;
}

interface IStrapiMedia {
  url?: string | null;
  alternativeText?: string | null;
  formats?: {
    thumbnail?: IStrapiMediaFormat | null;
    small?: IStrapiMediaFormat | null;
    medium?: IStrapiMediaFormat | null;
    large?: IStrapiMediaFormat | null;
  } | null;
}

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
}

interface IStrapiServicesPageResponse {
  data?: IStrapiServicesPage | null;
}

// ── Helpers ────────────────────────────────────────────

const getMediaUrl = (
  media?: IStrapiMedia | null,
  placeholder = PLACEHOLDER_IMAGE
) => {
  const url =
    media?.formats?.medium?.url ??
    media?.formats?.small?.url ??
    media?.formats?.thumbnail?.url ??
    media?.url;

  if (!url) return placeholder;
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
};

// ── Main function ──────────────────────────────────────

const getServicesFallback = async () => {
  return (await getContent("services")) as IServicesPageContent;
};

export const getStrapiServicesContent =
  async (): Promise<IServicesPageContent> => {
    const fallback = await getServicesFallback();

    try {
      const response = await fetch(
        `${STRAPI_URL}/api/services-page?${SERVICES_PAGE_QUERY}`,
        { cache: "no-store" }
      );

      if (!response.ok) return fallback;

      const json = (await response.json()) as IStrapiServicesPageResponse;
      const data = json.data;

      if (!data) return fallback;

      // Map services from Strapi to frontend interface
      const cards = data.services?.length
        ? data.services.map((service) => ({
            title: service.title ?? "",
            description: service.description ?? "",
            img: {
              alt:
                service.image?.alternativeText ??
                service.title ??
                "Servicio de jardinería",
              src: getMediaUrl(service.image),
            },
            icon: service.icon ?? "MdOutlineContentCut",
          }))
        : fallback.main.cards;

      // Map CTA from Strapi to frontend interface
      const callToAction = data.cta
        ? {
            title: data.cta.title ?? fallback.callToAction.title,
            description:
              data.cta.description ?? fallback.callToAction.description,
            link: {
              label:
                data.cta.button?.label ?? fallback.callToAction.link.label,
              href: data.cta.button?.url ?? fallback.callToAction.link.href,
            },
          }
        : fallback.callToAction;

      return {
        banner: {
          title: data.bannerTitle ?? fallback.banner.title,
          description: data.bannerDescription ?? fallback.banner.description,
        },
        main: {
          title: data.mainTitle ?? fallback.main.title,
          cards,
        },
        callToAction,
      };
    } catch {
      return fallback;
    }
  };

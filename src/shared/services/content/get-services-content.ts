import { getJsonServicesContent } from "@/shared/services/content/local/get-json-services-content";
import { IStrapiMedia } from "@/libs/strapi/interfaces";
import { IStrapiSeo } from "@/shared/seo/interfaces";
import { getMediaUrl } from "@/libs/strapi";
import { IServicesPageContent } from "@/modules/public/services/interface/services";

/**
 * Fuente del contenido de la página de servicios. Por defecto la local
 * (JSON editorial + servicios de Supabase). Cambiar a getStrapiServicesContent
 * para volver a leer todo del CMS.
 */
export const getServicesContent = getJsonServicesContent;



// ── Strapi response types (forma de la API v5 y del JSON exportado) ──

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

export interface IStrapiServicesPage {
  bannerTitle?: string | null;
  bannerDescription?: string | null;
  mainTitle?: string | null;
  services?: IStrapiService[] | null;
  cta?: IStrapiCta | null;
  seo?: IStrapiSeo | null;
}

export interface IStrapiServicesPageResponse {
  data?: IStrapiServicesPage | null;
}

// ── Mapper compartido por las fuentes strapi y json ────

export const mapServicesContent = (
  data: IStrapiServicesPage
): IServicesPageContent => {
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
};

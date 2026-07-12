import { getJsonHomeContent } from "@/shared/services/content/local/get-json-home-content";
import { IStrapiMedia } from "@/libs/strapi/interfaces";
import { IStrapiSeo } from "@/shared/seo/interfaces";
import { getMediaUrl } from "@/libs/strapi";
import { IHomePageContent } from "@/modules/public/home/interface/home";

/**
 * Fuente del contenido editorial de Home.
 * Cambiar a getStrapiHomeContent para volver a leer del CMS.
 */
export const getHomeContent = getJsonHomeContent;


// ── Strapi response types (forma de la API v5 y del JSON exportado) ──

interface IStrapiButton {
  label?: string | null;
  url?: string | null;
}

interface IStrapiHomeService {
  id?: number;
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  image?: IStrapiMedia | null;
}

interface IStrapiHomeProduct {
  id?: number;
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  image?: IStrapiMedia | null;
  price?: number | string | null;
  category?: { name?: string | null } | null;
}

export interface IStrapiHomePage {
  heroTitle?: string | null;
  heroTitleHighlight?: string | null;
  heroSubtitle?: string | null;
  heroImage?: IStrapiMedia | null;
  servicesTitle?: string | null;
  servicesDescription?: string | null;
  servicesButton?: IStrapiButton | null;
  featuredServices?: IStrapiHomeService[] | null;
  productsTitle?: string | null;
  productsDescription?: string | null;
  productCardActionLabel?: string | null;
  productsButton?: IStrapiButton | null;
  featuredProducts?: IStrapiHomeProduct[] | null;
  seo?: IStrapiSeo | null;
}

export interface IStrapiHomeResponse {
  data?: IStrapiHomePage | null;
}

// ── Mapper compartido por las fuentes strapi y json ────

export const mapHomeContent = (data: IStrapiHomePage): IHomePageContent => {
  const services = data.featuredServices?.length
    ? data.featuredServices.map((service) => ({
        title: service.title ?? "",
        description: service.description ?? "",
        button: {
          label: data.servicesButton?.label ?? "",
          link: data.servicesButton?.url ?? "",
        },
        img: {
          src: getMediaUrl(service.image),
          alt: service.image?.alternativeText ?? service.title ?? "Servicio de jardineria",
        },
      }))
    : []

  const products = data.featuredProducts?.length
    ? data.featuredProducts.map((product) => ({
        id: product.id ?? 0,
        title: product.name ?? "",
        description: product.description ?? "",
        imageUrl: getMediaUrl(product.image),
        category: product.category?.name ?? "",
        price: product?.price ?? null,
        button: {
          label: data.productCardActionLabel ?? "Ver detalles",
          link: `/products/${product.slug ?? ""}`,
        },
      }))
    : []

  return {
    hero: {
      title: data.heroTitle ?? "",
      titleHighlight: data.heroTitleHighlight ?? "",
      subtitle: data.heroSubtitle ?? "",
      imageUrl: getMediaUrl(data.heroImage),
    },
    ourServices: {
      title: data.servicesTitle ?? "",
      description: data.servicesDescription ?? "",
      button: {
        label: data.servicesButton?.label ?? "",
        link: data.servicesButton?.url ?? "",
      },
      services,
    },
    ourProducts: {
      title: data.productsTitle ?? "",
      description: data.productsDescription ?? "",
      actionCardLabel: data.productCardActionLabel ?? "",
      action: {
        label: data.productsButton?.label ?? "",
        link: data.productsButton?.url ?? "",
      },
      products,
    },
    seo: data.seo ?? null,
  };
};

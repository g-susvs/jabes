import { IStrapiMedia } from "@/libs/strapi/interfaces";
import { IHomePageContent } from "../interface/home";
import { IStrapiSeo } from "@/shared/seo/interfaces";
import { environment } from "@/config/env/environment";
import { getMediaUrl } from "@/libs/strapi";

const STRAPI_URL = environment.strapiHost;
const HOME_PAGE_QUERY =
  "populate[heroImage]=true" +
  "&populate[servicesButton]=true" +
  "&populate[productsButton]=true" +
  "&populate[seo][populate]=shareImage" +
  "&populate[featuredServices][populate][0]=image" +
  "&populate[featuredProducts][populate][0]=image" +
  "&populate[featuredProducts][populate][1]=category";

interface IStrapiButton {
  label?: string | null;
  url?: string | null;
}

interface IStrapiService {
  id?: number;
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  image?: IStrapiMedia | null;
}

interface IStrapiProduct {
  id?: number;
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  image?: IStrapiMedia | null;
  category?: { name?: string | null } | null;
}

interface IStrapiHomePage {
  heroTitle?: string | null;
  heroTitleHighlight?: string | null;
  heroSubtitle?: string | null;
  heroImage?: IStrapiMedia | null;
  servicesTitle?: string | null;
  servicesDescription?: string | null;
  servicesButton?: IStrapiButton | null;
  featuredServices?: IStrapiService[] | null;
  productsTitle?: string | null;
  productsDescription?: string | null;
  productCardActionLabel?: string | null;
  productsButton?: IStrapiButton | null;
  featuredProducts?: IStrapiProduct[] | null;
  seo?: IStrapiSeo | null;
}

interface IStrapiHomeResponse {
  data?: IStrapiHomePage | null;
}

export const getStrapiHomeContent = async (): Promise<IHomePageContent | null> => {

  try {
    const response = await fetch(`${STRAPI_URL}/api/home-page?${HOME_PAGE_QUERY}`, {
      cache: "no-store",
    });

    if (!response.ok) return null;

    const json = (await response.json()) as IStrapiHomeResponse;
    const data = json.data;

    if (!data) return null;

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
  } catch {
    return null;
  }
};

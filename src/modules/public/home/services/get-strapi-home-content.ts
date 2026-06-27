import { IHomePageContent } from "../interface/home";
import { environment } from "@/config/env/environment";

const STRAPI_URL = environment.strapiHost;
const HERO_PLACEHOLDER_IMAGE = "https://placehold.co/800x600?text=Jabes";
const CARD_PLACEHOLDER_IMAGE = "https://placehold.co/600x400?text=Jabes";
const HOME_PAGE_QUERY =
  "populate[heroImage]=true" +
  "&populate[servicesButton]=true" +
  "&populate[productsButton]=true" +
  "&populate[seo]=true" +
  "&populate[featuredServices][populate][0]=image" +
  "&populate[featuredProducts][populate][0]=image" +
  "&populate[featuredProducts][populate][1]=category";

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
}

interface IStrapiHomeResponse {
  data?: IStrapiHomePage | null;
}

const withStrapiUrl = (url?: string | null, placeholder = CARD_PLACEHOLDER_IMAGE) => {
  if (!url) return placeholder;
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
};

const getMediaUrl = (
  media?: IStrapiMedia | null,
  placeholder = CARD_PLACEHOLDER_IMAGE
) => {
  const url =
    media?.formats?.medium?.url ??
    media?.formats?.small?.url ??
    media?.formats?.thumbnail?.url ??
    media?.url;

  return withStrapiUrl(url, placeholder);
};

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
        imageUrl: getMediaUrl(data.heroImage, HERO_PLACEHOLDER_IMAGE),
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
    };
  } catch {
    return null;
  }
};

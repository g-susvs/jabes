import { getContent } from "@/libs/get-content";
import { IHomePageContent } from "../interface/home";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
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

const getHomeFallback = async () => {
  return (await getContent("home")) as IHomePageContent;
};

export const getStrapiHomeContent = async (): Promise<IHomePageContent> => {
  const fallback = await getHomeFallback();

  try {
    const response = await fetch(`${STRAPI_URL}/api/home-page?${HOME_PAGE_QUERY}`, {
      cache: "no-store",
    });

    if (!response.ok) return fallback;

    const json = (await response.json()) as IStrapiHomeResponse;
    const data = json.data;

    if (!data) return fallback;

    const services = data.featuredServices?.length
      ? data.featuredServices.map((service) => ({
          title: service.title ?? "",
          description: service.description ?? "",
          button: {
            label: data.servicesButton?.label ?? fallback.ourServices.services[0]?.button.label ?? "Ver servicios",
            link: data.servicesButton?.url ?? "/services",
          },
          img: {
            src: getMediaUrl(service.image),
            alt: service.image?.alternativeText ?? service.title ?? "Servicio de jardineria",
          },
        }))
      : fallback.ourServices.services.map((service) => ({
          ...service,
          img: {
            ...service.img,
            src: service.img.src || CARD_PLACEHOLDER_IMAGE,
          },
        }));

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
      : fallback.ourProducts.products.map((product) => ({
          ...product,
          imageUrl: product.imageUrl || CARD_PLACEHOLDER_IMAGE,
        }));

    return {
      hero: {
        title: data.heroTitle ?? fallback.hero.title,
        titleHighlight: data.heroTitleHighlight ?? fallback.hero.titleHighlight,
        subtitle: data.heroSubtitle ?? fallback.hero.subtitle,
        imageUrl: getMediaUrl(data.heroImage, HERO_PLACEHOLDER_IMAGE),
      },
      ourServices: {
        title: data.servicesTitle ?? fallback.ourServices.title,
        description: data.servicesDescription ?? fallback.ourServices.description,
        services,
      },
      ourProducts: {
        title: data.productsTitle ?? fallback.ourProducts.title,
        description: data.productsDescription ?? fallback.ourProducts.description,
        actionCardLabel: data.productCardActionLabel ?? fallback.ourProducts.actionCardLabel,
        action: {
          label: data.productsButton?.label ?? fallback.ourProducts.action.label,
          link: data.productsButton?.url ?? fallback.ourProducts.action.link,
        },
        products,
      },
    };
  } catch {
    return fallback;
  }
};

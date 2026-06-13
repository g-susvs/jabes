import { getContent } from "@/libs/get-content";
import { IHomePageContent } from "../interface/home";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const PLACEHOLDER_IMAGE = "https://placehold.co/800x600?text=Jabes";
const HOME_PAGE_QUERY =
  "populate[heroImage]=true" +
  "&populate[servicesButton]=true" +
  "&populate[productsButton]=true" +
  "&populate[seo]=true" +
  "&populate[featuredServices][populate][0]=image" +
  "&populate[featuredProducts][populate][0]=image" +
  "&populate[featuredProducts][populate][1]=category";

interface IStrapiMedia {
  url?: string | null;
  alternativeText?: string | null;
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

const withStrapiUrl = (url?: string | null) => {
  if (!url) return PLACEHOLDER_IMAGE;
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
};

const getHomeFallback = async () => {
  return (await getContent("home")) as IHomePageContent;
};

export const getStrapiHomeContent = async (): Promise<IHomePageContent> => {
  const fallback = await getHomeFallback();

  try {
    const response = await fetch(`${STRAPI_URL}/api/home-page?${HOME_PAGE_QUERY}`, {
      next: { revalidate: 60 },
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
            src: withStrapiUrl(service.image?.url),
            alt: service.image?.alternativeText ?? service.title ?? "Servicio de jardineria",
          },
        }))
      : fallback.ourServices.services.map((service) => ({
          ...service,
          img: {
            ...service.img,
            src: service.img.src || PLACEHOLDER_IMAGE,
          },
        }));

    const products = data.featuredProducts?.length
      ? data.featuredProducts.map((product) => ({
          id: product.id ?? 0,
          title: product.name ?? "",
          description: product.description ?? "",
          imageUrl: withStrapiUrl(product.image?.url),
          button: {
            label: data.productCardActionLabel ?? "Ver detalles",
            link: `/products/${product.slug ?? ""}`,
          },
        }))
      : fallback.ourProducts.products.map((product) => ({
          ...product,
          imageUrl: product.imageUrl || PLACEHOLDER_IMAGE,
        }));

    return {
      hero: {
        title: data.heroTitle ?? fallback.hero.title,
        titleHighlight: data.heroTitleHighlight ?? fallback.hero.titleHighlight,
        subtitle: data.heroSubtitle ?? fallback.hero.subtitle,
        imageUrl: withStrapiUrl(data.heroImage?.url),
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

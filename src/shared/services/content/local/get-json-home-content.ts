import { cache } from "react";
import homePageJson from "@/data/cms/home-page.json";
import { IStrapiHomeResponse, mapHomeContent } from "../get-home-content";
import {
  IHomePageContent,
  IOurProductsSection,
  IOurServicesSection,
} from "@/modules/public/home/interface/home";
import { IServiceDTO } from "@/shared/interfaces/service";
import { IProductDTO } from "@/shared/interfaces/product";
import { ServiceService } from "@/shared/services/service.service";
import { ProductService } from "@/shared/services/product.service";

/** Cuántos ítems destacados muestra el home por sección. */
const HOME_SERVICES_LIMIT = 3;
const HOME_PRODUCTS_LIMIT = 4;

/** Servicio de la BD → ítem destacado del home (botón = botón de sección). */
const toHomeService = (
  service: IServiceDTO,
  section: IOurServicesSection
): IOurServicesSection["services"][number] => ({
  title: service.title,
  description: service.description,
  button: section.button,
  img: {
    src: service.imgUrl,
    alt: service.imgAlt || service.title || "Servicio de jardineria",
  },
});

/** Producto de la BD → ítem destacado del home. */
const toHomeProduct = (
  product: IProductDTO,
  index: number,
  section: IOurProductsSection
): IOurProductsSection["products"][number] => ({
  id: index,
  title: product.name,
  description: product.description ?? "",
  imageUrl: product.imgUrl ?? "",
  category: product.category?.name ?? "",
  price: product.price ?? null,
  button: {
    label: section.actionCardLabel || "Ver detalles",
    link: `/products/${product.slug}`,
  },
});

/**
 * Contenido de Home (fuente local): el texto editorial (hero, títulos,
 * botones, SEO) viene del snapshot `src/data/cms/home-page.json`; los
 * servicios y productos destacados se consultan en vivo a Supabase vía
 * ServiceService/ProductService ("featured con respaldo"). Si la BD no
 * devuelve ítems, se conservan los del JSON como respaldo.
 *
 * cache() deduplica la doble llamada generateMetadata + componente por request.
 */
export const getJsonHomeContent = cache(
  async (): Promise<IHomePageContent | null> => {
    const data = (homePageJson as unknown as IStrapiHomeResponse).data;
    if (!data) return null;

    const [content, services, products] = await Promise.all([
      Promise.resolve(mapHomeContent(data)),
      ServiceService.getHighlighted(HOME_SERVICES_LIMIT),
      ProductService.getHighlighted(HOME_PRODUCTS_LIMIT),
    ]);

    const ourServices = services.length
      ? {
          ...content.ourServices,
          services: services.map((s) => toHomeService(s, content.ourServices)),
        }
      : content.ourServices;

    const ourProducts = products.length
      ? {
          ...content.ourProducts,
          products: products.map((p, i) =>
            toHomeProduct(p, i, content.ourProducts)
          ),
        }
      : content.ourProducts;

    return { ...content, ourServices, ourProducts };
  }
);

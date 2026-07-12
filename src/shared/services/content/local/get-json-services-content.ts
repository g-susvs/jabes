import { cache } from "react";
import servicesPageJson from "@/data/cms/services-page.json";
import {
  IServicesPageContent,
  IServiceCard,
} from "@/modules/public/services/interface/services";
import { IServiceDTO } from "@/shared/interfaces/service";
import { ServiceService } from "@/shared/services/service.service";
import { IStrapiServicesPageResponse, mapServicesContent } from "../get-services-content";

/** Servicio de la BD → card de la página de servicios. */
const toServiceCard = (service: IServiceDTO): IServiceCard => ({
  title: service.title,
  description: service.description,
  img: {
    alt: service.imgAlt || service.title,
    src: service.imgUrl,
  },
  icon: service.icon,
});

/**
 * Contenido de la página de servicios (fuente local): el texto editorial
 * (banner, título, CTA, SEO) viene del snapshot `src/data/cms/services-page.json`;
 * las cards se consultan en vivo a Supabase vía ServiceService. Si la BD no
 * devuelve servicios, se conservan los del JSON como respaldo.
 *
 * cache() deduplica la doble llamada generateMetadata + componente por request.
 */
export const getJsonServicesContent = cache(
  async (): Promise<IServicesPageContent | null> => {
    const data = (servicesPageJson as unknown as IStrapiServicesPageResponse)
      .data;
    if (!data) return null;

    const [content, services] = await Promise.all([
      Promise.resolve(mapServicesContent(data)),
      ServiceService.getAll(),
    ]);

    if (!services.length) return content;

    return {
      ...content,
      main: { ...content.main, cards: services.map(toServiceCard) },
    };
  }
);

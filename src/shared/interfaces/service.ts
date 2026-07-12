import { IStrapiSeo } from "@/shared/seo/interfaces";

export interface IServiceDTO {
  serviceId: string;
  title: string;
  description: string;
  slug: string;
  imgUrl: string;
  imgAlt: string;
  icon: string;
  featured: boolean;
  active: boolean;
  seo?: IStrapiSeo | null;
}

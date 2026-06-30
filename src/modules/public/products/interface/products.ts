import { IStrapiSeo } from "@/shared/seo/interfaces";

export interface IProductsPageContent {
  banner: IBannerSection;
  main: IMainSection;
  seo?: IStrapiSeo | null;
}

export interface IBannerSection {
  title: string;
  description: string;
}

export interface IMainSection {
  title: string;
  categories: ICategoryItem[];
  cardContent: IProductCardContent;
  emptyState: IEmptyState;
}

export interface IEmptyState {
  title: string;
  description: string;
}

export interface IProductCardContent {
  label: string;
}

export interface ICategoryItem {
  label: string;
  value: string;
}

export interface IFeature {
  id: string;
  text: string;
}

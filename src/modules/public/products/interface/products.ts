export interface IProductsPageContent {
  banner: IBannerSection;
  main: IMainSection;
}

export interface IBannerSection {
  title: string;
  description: string;
}

export interface IMainSection {
  title: string;
  categories: ICategoryItem[];
  products: IProduct[];
  cardContent: IProductCardContent;
}

export interface IProductCardContent {
  label: string;
}

export interface ICategoryItem {
  label: string;
  value: string;
}

export interface IProduct {
  id: number;
  name: string;
  categoryLabel: string;
  categoryId: string;
  description: string;
  imgUrl: string;
  slug: string;
  features: IFeature[];
}

export interface IFeature {
  id: string;
  text: string;
}

export interface IProductDetailPageContent {
  header: IHeaderSection;
  detail: IDetailSection;
  relatedProducts: IRelatedProductsSection;
}

export interface IHeaderSection {
  action: string;
}

export interface IDetailSection {
  subtitle: string;
  action: string;
  extraInfo: string;
}

export interface IRelatedProductsSection {
  title: string;
}

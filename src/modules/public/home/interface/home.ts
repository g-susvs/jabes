export interface IHomePageContent {
  hero: IHeroSection;
  ourServices: IOurServicesSection;
  ourProducts: IOurProductsSection;
}

export interface IHeroSection {
  title: string;
  titleHighlight: string;
  subtitle: string;
}

export interface IOurServicesSection {
  title: string;
  description: string;
  services: IService[];
}

export interface IOurProductsSection {
  title: string;
  description: string;
  actionCardLabel: string;
  action: {
    label: string;
    link: string;
  };
  products: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    button: {
      label: string;
      link: string;
    }
  }[]
}

interface IService {
  title: string;
  description: string;
  button: {
    link: string;
    label: string;
  };
  img: {
    src: string;
    alt: string;
  };
}

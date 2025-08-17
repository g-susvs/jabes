export interface IServicesPageContent {
  banner: IBannerSection;
  main: IMainSection;
  callToAction: ICallToActionSection;
}

export interface IBannerSection {
  title: string;
  description: string;
}

export interface IMainSection {
  title: string;
  cards: IServiceCard[];
}

export interface IServiceCard {
  title: string;
  description: string;
  img: IImage;
  icon: string;
}

interface IImage {
  alt: string;
  src: string;
}

export interface ICallToActionSection {
  title: string;
  description: string;
  link: ILink;
}

interface ILink {
  label: string;
  href: string;
}

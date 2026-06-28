import { HeroSection } from "./components/hero";
import { OurServicesSection } from "./components/our-services";
import { OurProductsSection } from "./components/our-products";
import { IHomePageContent } from "./interface/home";

interface IProps{
    content: IHomePageContent
}

export default function HomePage({content}: IProps) {

  return (
    <>
      <HeroSection content={content.hero}/>
      <OurServicesSection content={content.ourServices}/>
      <OurProductsSection content={content.ourProducts}/>
    </>
  );
}

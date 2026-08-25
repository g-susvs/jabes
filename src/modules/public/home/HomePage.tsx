import { HeroSection } from "./components/hero";
import { OurServicesSection } from "./components/our-services";
import { OurProductsSection } from "./components/our-products";
import { FaqSection } from "./components/faq";
import { CtaSection } from "./components/cta";
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
      <FaqSection
        title={content.faq.title}
        description={content.faq.description}
        items={content.faq.items}
      />
      <CtaSection
        title={content.cta.title}
        description={content.cta.description}
        whatsappMessage={content.cta.whatsappMessage}
      />
    </>
  );
}

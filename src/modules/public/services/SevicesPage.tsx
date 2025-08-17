import { Banner } from "@/shared/components/banner";
import { IServicesPageContent } from "./interface/services";
import { MainSection } from "./components/main";
import { CallToActionSection } from "./components/call-to-action";

interface IProps {
  content: IServicesPageContent;
}

export const SevicesPage = ({ content }: IProps) => {
  return (
    <>
      <Banner content={content.banner} />
      <MainSection content={content.main}/>
      <CallToActionSection content={content.callToAction}/>
    </>
  );
};

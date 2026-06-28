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
      {/* TODO: mover a CMS (eyebrow del banner) */}
      <Banner content={content.banner} eyebrow="Jardinería profesional" />
      <MainSection content={content.main}/>
      <CallToActionSection content={content.callToAction}/>
    </>
  );
};

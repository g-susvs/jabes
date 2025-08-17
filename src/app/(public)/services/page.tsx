import { getContent } from "@/libs/get-content";
import { IServicesPageContent } from "@/modules/public/services/interface/services";
import { SevicesPage } from "@/modules/public/services/SevicesPage";

export default async function Home() {
  const content = (await getContent("services")) as IServicesPageContent;

  return <SevicesPage content={content} />;
}

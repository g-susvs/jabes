import { getStrapiServicesContent } from "@/modules/public/services/services/get-strapi-services-content";
import { SevicesPage } from "@/modules/public/services/SevicesPage";

export default async function Home() {
  const content = await getStrapiServicesContent();

  return <SevicesPage content={content} />;
}

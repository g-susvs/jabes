import type { Metadata } from "next";
import { getStrapiServicesContent } from "@/modules/public/services/services/get-strapi-services-content";
import { SevicesPage } from "@/modules/public/services/SevicesPage";
import { buildMetadata } from "@/shared/seo/build-metadata";
import { SEO_FALLBACK } from "@/shared/constants/seo-fallback";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getStrapiServicesContent();

  return buildMetadata({
    seo: content?.seo,
    path: "/services",
    fallback: SEO_FALLBACK.services,
  });
}

export default async function Home() {
  const content = await getStrapiServicesContent();

  if(!content) return <div>Content not found</div>;

  return <SevicesPage content={content} />;
}

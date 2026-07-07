import type { Metadata } from "next";
import HomePage from "@/modules/public/home/HomePage";
import { getHomeContent } from "@/shared/services/content/get-home-content";
import { buildMetadata } from "@/shared/seo/build-metadata";
import { SEO_FALLBACK } from "@/shared/constants/seo-fallback";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHomeContent();

  return buildMetadata({
    seo: content?.seo,
    path: "/home",
    fallback: SEO_FALLBACK.home,
  });
}

export default async function Home() {
  const content = await getHomeContent();

  if(!content) return <div>Content not found</div>;

  return <HomePage content={content}/>;
}

import HomePage from "@/modules/public/home/HoomePage";
import { getStrapiHomeContent } from "@/modules/public/home/services/get-strapi-home-content";

export default async function Home() {
  const content = await getStrapiHomeContent();

  return <HomePage content={content}/>;
}

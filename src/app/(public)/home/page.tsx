import HomePage from "@/modules/public/home/HoomePage";
import { getStrapiHomeContent } from "@/modules/public/home/services/get-strapi-home-content";

export default async function Home() {
  const content = await getStrapiHomeContent();
  
  if(!content) return <div>Content not found</div>;

  return <HomePage content={content}/>;
}

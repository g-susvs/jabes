import { getContent } from "@/libs/get-content";
import HomePage from "@/modules/public/home/HoomePage";
import { IHomePageContent } from "@/modules/public/home/interface/home";

export default async function Home() {

  const content = await getContent("home") as IHomePageContent;

  return <HomePage content={content}/>;
}

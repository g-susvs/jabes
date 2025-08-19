import { Banner } from "@/shared/components/banner";
import { IProductsPageContent } from "./interface/products";
import { MainSection } from "./components/main";

interface IProps {
  content: IProductsPageContent;
}

export const ProductsPage = ({ content }: IProps) => {
  return (
    <>
      <Banner content={content.banner} />
      <MainSection content={content.main} />
    </>
  );
};

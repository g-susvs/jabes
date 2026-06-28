import { Banner } from "@/shared/components/banner";
import { IProductsPageContent } from "./interface/products";
import { MainSection } from "./components/main";

interface IProps {
  content: IProductsPageContent;
}

export const ProductsPage = ({ content }: IProps) => {
  return (
    <>
      {/* TODO: mover a CMS (eyebrow del banner) */}
      <Banner content={content.banner} eyebrow="Catálogo" />
      <MainSection content={content.main} />
    </>
  );
};

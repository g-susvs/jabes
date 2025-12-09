import { IProductDTO } from "@/shared/interfaces/product";
import { HeaderSection } from "./components/header";
import { MainSection } from "./components/main";
import { RelatedProductSection } from "./components/related-products";
import { IProductDetailPageContent } from "./interface/product-detail";

interface IProps {
  content: IProductDetailPageContent;
  product: IProductDTO | undefined;
}

export const ProductDetailPage = ({ content, product }: IProps) => {
  return (
    <>
      <HeaderSection content={content.header} />
      {product && <MainSection content={content.detail} product={product} />}
      {product && (
        <RelatedProductSection
          content={content.relatedProducts}
          categoryId={product?.categoryId}
        />
      )}
    </>
  );
};

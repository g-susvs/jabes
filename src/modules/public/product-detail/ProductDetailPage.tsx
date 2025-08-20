import { IProduct } from "../products/interface/products";
import { HeaderSection } from "./components/header";
import { MainSection } from "./components/main";
import { RelatedProductSection } from "./components/related-products";
import { IProductDetailPageContent } from "./interface/product-detail";

interface IProps {
  content: IProductDetailPageContent;
  product: IProduct | undefined;
}

export const ProductDetailPage = ({ content, product }: IProps) => {
  return (
    <>
      <HeaderSection content={content.header} />
      {product && <MainSection content={content.detail} product={product}/>}
      <RelatedProductSection content={content.relatedProducts} />
    </>
  );
};

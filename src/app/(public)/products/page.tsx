import { getContent } from "@/libs/get-content";
import { IProductsPageContent } from "@/modules/public/products/interface/products";
import { ProductsPage } from "@/modules/public/products/ProductsPage";

export default async function Products() {
  const content = (await getContent("products")) as IProductsPageContent;

  return <ProductsPage content={content} />;
}

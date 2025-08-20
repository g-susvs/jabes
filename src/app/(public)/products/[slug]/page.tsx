import { getContent } from "@/libs/get-content";
import { IProductDetailPageContent } from "@/modules/public/product-detail/interface/product-detail";
import { ProductDetailPage } from "@/modules/public/product-detail/ProductDetailPage";
import { IProductsPageContent } from "@/modules/public/products/interface/products";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const productsContent = (await getContent(
    "products"
  )) as IProductsPageContent;

  const products = productsContent.main.products;
  const findProduct = products.find((product) => product.slug === slug);

  const content = (await getContent(
    "product-detail"
  )) as IProductDetailPageContent;
  
  return <ProductDetailPage content={content} product={findProduct} />;
}

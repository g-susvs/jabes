import { getStrapiProductsContent } from "@/modules/public/products/services/get-strapi-products-content";
import { ProductsPage } from "@/modules/public/products/ProductsPage";

export default async function Products() {
  const content = await getStrapiProductsContent();

  return <ProductsPage content={content} />;
}


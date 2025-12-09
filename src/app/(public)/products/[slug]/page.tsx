import { environment } from "@/config/env/environment";
import { getContent } from "@/libs/get-content";
import { IProductDetailPageContent } from "@/modules/public/product-detail/interface/product-detail";
import { ProductDetailPage } from "@/modules/public/product-detail/ProductDetailPage";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const response = await fetch(
    environment.apiHost + `/products/by-slug/${slug}`
  );
  const json = await response.json();

  const content = (await getContent(
    "product-detail"
  )) as IProductDetailPageContent;

  return <ProductDetailPage content={content} product={json} />;
}

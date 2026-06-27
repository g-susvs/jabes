import { getContent } from "@/libs/get-content";
import { IProductDetailPageContent } from "@/modules/public/product-detail/interface/product-detail";
import { ProductDetailPage } from "@/modules/public/product-detail/ProductDetailPage";
import { StrapiProductService } from "@/shared/services/strapi-product.service";

export type paramsType = Promise<{ slug: string }>;
export default async function ProductDetail({
  params,
}: {
  params: paramsType;
}) {
  const { slug } = await params;

  const product = await StrapiProductService.getBySlug(slug);

  //TODO: Change this to get content from strapi when the content is available in strapi
  const content = (await getContent(
    "product-detail"
  )) as IProductDetailPageContent;

  return <ProductDetailPage content={content} product={product} />;
}

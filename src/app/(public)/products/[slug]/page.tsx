import { ProductDetailPage } from "@/modules/public/product-detail/ProductDetailPage";
import { getStrapiProductDetailContent } from "@/modules/public/product-detail/services/get-strapi-product-detail-content";
import { StrapiProductService } from "@/shared/services/strapi-product.service";

export type paramsType = Promise<{ slug: string }>;
export default async function ProductDetail({
  params,
}: {
  params: paramsType;
}) {
  const { slug } = await params;

  const product = await StrapiProductService.getBySlug(slug);

  const content = await getStrapiProductDetailContent();

  if (!content) return <div>Content not found</div>;

  return <ProductDetailPage content={content} product={product} />;
}

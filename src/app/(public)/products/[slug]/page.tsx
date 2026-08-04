import type { Metadata } from "next";
import { ProductDetailPage } from "@/modules/public/product-detail/ProductDetailPage";
import { getProductDetailContent } from "@/shared/services/content/get-product-detail-content";
import { ProductService } from "@/shared/services/product.service";
import { buildMetadata } from "@/shared/seo/build-metadata";
import {
  PRODUCT_NOT_FOUND_TITLE,
  buildProductDetailFallback,
} from "@/shared/constants/seo-fallback";

export type paramsType = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: paramsType;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await ProductService.getBySlug(slug);

  // Producto inexistente: título genérico, evitamos indexar una página vacía.
  if (!product) {
    return {
      title: PRODUCT_NOT_FOUND_TITLE,
      robots: { index: false, follow: true },
    };
  }

  const metadata = buildMetadata({
    seo: product.seo,
    path: `/products/${product.slug}`,
    fallback: buildProductDetailFallback(product.name, product.description),
  });

  if (product.imgUrl && metadata) {
    const ogImage = { url: product.imgUrl, alt: product.name };
    
    if(metadata.openGraph) metadata.openGraph.images = [ogImage];
  }

  return metadata;
}

export default async function ProductDetail({
  params,
}: {
  params: paramsType;
}) {
  const { slug } = await params;

  const product = await ProductService.getBySlug(slug);

  const content = await getProductDetailContent();

  if (!content) return <div>Content not found</div>;

  return <ProductDetailPage content={content} product={product} />;
}

import type { Metadata } from "next";
import { ProductDetailPage } from "@/modules/public/product-detail/ProductDetailPage";
import { getStrapiProductDetailContent } from "@/modules/public/product-detail/services/get-strapi-product-detail-content";
import { StrapiProductService } from "@/shared/services/strapi-product.service";
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
  const product = await StrapiProductService.getBySlug(slug);

  // Producto inexistente: título genérico, evitamos indexar una página vacía.
  if (!product) {
    return {
      title: PRODUCT_NOT_FOUND_TITLE,
      robots: { index: false, follow: true },
    };
  }

  // Prioridad: SEO propio del producto (CMS) → datos del propio producto.
  return buildMetadata({
    seo: product.seo,
    path: `/products/${product.slug}`,
    fallback: buildProductDetailFallback(product.name, product.description),
  });
}

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

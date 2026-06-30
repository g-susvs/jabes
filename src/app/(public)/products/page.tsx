import type { Metadata } from "next";
import { getStrapiProductsContent } from "@/modules/public/products/services/get-strapi-products-content";
import { ProductsPage } from "@/modules/public/products/ProductsPage";
import { buildMetadata } from "@/shared/seo/build-metadata";
import { SEO_FALLBACK } from "@/shared/constants/seo-fallback";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getStrapiProductsContent();

  return buildMetadata({
    seo: content?.seo,
    path: "/products",
    fallback: SEO_FALLBACK.products,
  });
}

export default async function Products() {
  const content = await getStrapiProductsContent();

  if (!content) return <div>Content not found</div>;

  return <ProductsPage content={content} />;
}

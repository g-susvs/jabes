import type { Metadata } from "next";
import { getStrapiProductsContent } from "@/modules/public/products/services/get-strapi-products-content";
import { ProductsPage } from "@/modules/public/products/ProductsPage";
import { buildMetadata } from "@/shared/seo/build-metadata";
import { SEO_FALLBACK } from "@/shared/constants/seo-fallback";
import { StrapiProductService } from "@/shared/services/strapi-product.service";
import { StrapiCategoryService } from "@/shared/services/strapi-category.service";
import { buildProductsHref, parseSearchParams } from "@/modules/public/products/helpers";
import { PRODUCTS_PAGE_SIZE } from "@/shared/constants";

type SearchParams = Promise<{ page?: string; category?: string }>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { page, category } = parseSearchParams(await searchParams);
  const content = await getStrapiProductsContent();

  return buildMetadata({
    seo: content?.seo,
    path: buildProductsHref(page, category),
    fallback: SEO_FALLBACK.products,
  });
}

export default async function Products({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page, category } = parseSearchParams(await searchParams);

  const [content, categories, paged] = await Promise.all([
    getStrapiProductsContent(),
    StrapiCategoryService.getAll(),
    StrapiProductService.getPaged({
      page,
      size: PRODUCTS_PAGE_SIZE,
      categorySlug: category,
    }),
  ]);

  if (!content) return <div>Content not found</div>;

  return (
    <ProductsPage
      content={content}
      products={paged.items}
      categories={categories}
      pagination={paged.pagination}
      selectedCategory={category}
    />
  );
}

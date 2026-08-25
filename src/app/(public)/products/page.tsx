import type { Metadata } from "next";
import { getProductsContent } from "@/shared/services/content/get-products-content";
import { ProductsPage } from "@/modules/public/products/ProductsPage";
import { buildMetadata } from "@/shared/seo/build-metadata";
import { SEO_FALLBACK } from "@/shared/constants/seo-fallback";
import { ProductService } from "@/shared/services/product.service";
import { CategoryService } from "@/shared/services/category.service";
import { buildProductsHref, parseSearchParams } from "@/modules/public/products/helpers";
import { PRODUCTS_PAGE_SIZE } from "@/shared/constants";

type SearchParams = Promise<{ page?: string; category?: string; search?: string }>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { page, category, search } = parseSearchParams(await searchParams);
  const content = await getProductsContent();

  return buildMetadata({
    seo: content?.seo,
    path: buildProductsHref(page, category, search),
    fallback: SEO_FALLBACK.products,
  });
}

export default async function Products({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page, category, search } = parseSearchParams(await searchParams);

  const [content, categories, paged] = await Promise.all([
    getProductsContent(),
    CategoryService.getAll(),
    ProductService.getPaged({
      page,
      size: PRODUCTS_PAGE_SIZE,
      categorySlug: category,
      search,
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
      searchQuery={search}
    />
  );
}

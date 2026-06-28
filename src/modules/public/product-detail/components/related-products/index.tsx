"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/shared/components/container";
import { IRelatedProductsSection } from "../../interface/product-detail";
import { useGetRelatedProducts } from "../hooks/useGetRelatedProducts";
import { ReleatedProductsSkeleton } from "./releated-products-skeleton";
import { IMAGE_NOT_FOUND_URL } from "@/shared/constants";

interface IProps {
  content: IRelatedProductsSection;
  categoryId: string;
}

export const RelatedProductSection = ({ content, categoryId }: IProps) => {
  const { data, isLoading } = useGetRelatedProducts({
    page: 1,
    size: 10,
    categoryId,
  });

  return (
    <Container className="px-4 py-20 sm:py-24">
      <div className="flex items-end justify-between gap-4">
        <h2 className="heading-3 font-bold text-ink">{content.title}</h2>
        <Link
          href="/products"
          className="shrink-0 font-semibold text-accent-dark transition-colors hover:text-accent-deep"
        >
          Ver todos →
        </Link>
      </div>

      <section className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading && <ReleatedProductsSkeleton />}
        {data &&
          !isLoading &&
          data.map((product) => {
            const productImage = product.imgUrl || IMAGE_NOT_FOUND_URL;
            return (
              <article
                key={product.productId}
                className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card transition-shadow hover:shadow-lg"
              >
                <figure className="h-[200px] w-full overflow-hidden">
                  <Image
                    width={320}
                    height={240}
                    alt={product.name}
                    src={productImage}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </figure>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  {product.category?.name && (
                    <span className="w-max rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-ink">
                      {product.category.name}
                    </span>
                  )}
                  <h3 className="heading-6 font-bold text-ink">
                    {product.name}
                  </h3>
                  <p className="paragraph-lg line-clamp-2 flex-1 text-muted">
                    {product.description}
                  </p>
                  <Link
                    href={`/products/${product.slug}`}
                    className="mt-1 inline-flex w-max items-center gap-1 font-semibold text-accent-dark transition-colors hover:text-accent-deep"
                  >
                    Ver detalles →
                  </Link>
                </div>
              </article>
            );
          })}
      </section>
    </Container>
  );
};

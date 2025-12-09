/* eslint-disable @next/next/no-img-element */
"use client";

import { Container } from "@/shared/components/container";
import { IRelatedProductsSection } from "../../interface/product-detail";
import { useRouter } from "next/navigation";
import { useGetRelatedProducts } from "../hooks/useGetRelatedProducts";
import { ReleatedProductsSkeleton } from "./releated-products-skeleton";

interface IProps {
  content: IRelatedProductsSection;
  categoryId: string;
}

export const RelatedProductSection = ({ content, categoryId }: IProps) => {
  const router = useRouter();
  const { data, isLoading } = useGetRelatedProducts({
    page: 1,
    size: 10,
    categoryId,
  });

  const handleViewDetail = (slug: string) => router.push(`/products/${slug}`);

  return (
    <Container className="px-4 py-[100px]">
      <h2 className="heading-5 sm:heading-4 md:heading-3 font-semibold text-zinc-800">
        {content.title}
      </h2>
      <section className="flex flex-row gap-8 overflow-x-auto w-full mt-4 pb-4">
        {isLoading && <ReleatedProductsSkeleton />}
        {data &&
          !isLoading &&
          data.map((product) => (
            <article
              key={product.productId}
              className="flex min-w-[280px] max-w-[320px] flex-col gap-2 w-full object-cover overflow-hidden"
            >
              <figure className="w-full h-[231px] object-cover rounded-2xl overflow-hidden">
                <img
                  width={300}
                  height={300}
                  alt={product.name}
                  src={product.imgUrl}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="flex flex-col justify-between flex-grow gap-2">
                <div>
                  <span className="heading-5 text-zinc-800">
                    {product.name}
                  </span>
                  <p className="paragraph-lg text-start text-zinc-600">
                    {product.description}
                  </p>
                </div>
                <button
                  className="w-max py-1 px-2 rounded-lg text-primary-600 border-1 border-primary-600"
                  onClick={() => handleViewDetail(product.slug)}
                >
                  <span>Ver detalles</span>
                </button>
              </div>
            </article>
          ))}
      </section>
    </Container>
  );
};

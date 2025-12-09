/* eslint-disable @next/next/no-img-element */
"use client";

import { IProductCardContent } from "../../interface/products";
import { useRouter } from "next/navigation";
import { IProductDTO } from "@/shared/interfaces/product";

interface IProps {
  product: IProductDTO;
  content: IProductCardContent;
}

export const ProductCard = ({ product, content }: IProps) => {
  const router = useRouter();

  const handleViewDetail = (slug: string) => router.push(`/products/${slug}`);

  return (
    <article
      key={product.productId}
      className="overflow-hidden rounded-2xl shadow-xl flex flex-col"
    >
      <figure className="w-full h-[250px] overflow-hidden">
        <img
          width={200}
          height={200}
          src={product.imgUrl}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-[1.1] transition-all"
        />
      </figure>
      <div className="p-4 flex flex-col justify-between flex-grow font-medium">
        <div className="flex flex-col gap-2 items-start">
          <span className="rounded-xl bg-primary-600 text-white px-4 py-[2px]">
            {product.category.name}
          </span>
          <div className="">
            <span className="heading-6 sm:heading-5 text-zinc-600">
              {product.name}
            </span>
            <p className="paragraph-lg text-zinc-600 line-clamp-2">
              {product.description}
            </p>
          </div>
        </div>
        <button
          className="bg-zinc-800 hover:bg-zinc-950 transition-all text-white px-4 py-2 rounded-lg cursor-pointer mt-4"
          onClick={() => handleViewDetail(product.slug)}
        >
          {content.label}
        </button>
      </div>
    </article>
  );
};

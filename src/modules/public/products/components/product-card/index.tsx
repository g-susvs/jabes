"use client";

import Image from "next/image";
import { IProduct, IProductCardContent } from "../../interface/products";
import { useRouter } from "next/navigation";

interface IProps {
  product: IProduct;
  content: IProductCardContent;
}

export const ProductCard = ({ product, content }: IProps) => {

  const router = useRouter();

  const handleViewDetail = (slug: string) => router.push(`/products/${slug}`)

  return (
    <article
      key={product.id}
      className="overflow-hidden rounded-2xl shadow-xl flex flex-col"
    >
      <figure className="w-full h-[250px] overflow-hidden">
        <Image
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
            {product.categoryLabel}
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

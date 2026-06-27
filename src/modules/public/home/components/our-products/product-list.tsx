/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { IOurProductsSection } from "../../interface/home";

interface IProps {
  content: IOurProductsSection;
}

export const ProductList = ({ content }: IProps) => {
  const router = useRouter();

  const handleViewDetail = (link: string) => {
    if (!link || link === "#") {
      router.push(content.action.link);
      return;
    }

    router.push(link);
  };

  return (
    <div className="flex flex-row gap-6 lg:justify-center overflow-x-auto pb-4 mt-6 w-full">
      {content.products.map((product) => (
        <article
          key={product.id}
          className="flex min-w-[280px] max-w-[320px] flex-col gap-2 w-full object-cover overflow-hidden"
        >
          <figure className="w-full h-[231px] object-cover rounded-2xl overflow-hidden">
            <img
              src={product.imageUrl}
              width={300}
              height={300}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="flex flex-col justify-between flex-grow gap-2">
            <div>
              <span className="heading-5 text-zinc-800">{product.title}</span>
              <p className="paragraph-lg text-start text-zinc-600">
                {product.description}
              </p>
            </div>
            <button
              className="w-max py-1 px-2 rounded-lg text-primary-600 border-1 border-primary-600"
              onClick={() => handleViewDetail(product.button.link)}
            >
              <span>{content.actionCardLabel}</span>
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

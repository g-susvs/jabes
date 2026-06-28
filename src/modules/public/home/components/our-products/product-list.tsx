/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { IOurProductsSection } from "../../interface/home";
import { IMAGE_NOT_FOUND_URL } from "@/shared/constants";
import { IoArrowForward } from "react-icons/io5";

interface IProps {
  content: IOurProductsSection;
}

export const ProductList = ({ content }: IProps) => {
  return (
    <div className="mt-12 flex flex-wrap justify-center gap-8">
      {content.products.map((product) => {
        const productImage = product.imageUrl || IMAGE_NOT_FOUND_URL;
        const href =
          product.button.link && product.button.link !== "#"
            ? product.button.link
            : content.action.link || "/products";

        return (
          <article
            key={product.id}
            className="group flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition-shadow hover:shadow-lg sm:w-[270px]"
          >
            <figure className="h-[200px] w-full overflow-hidden">
              <img
                src={productImage}
                alt={product.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </figure>
            <div className="flex flex-1 flex-col gap-2 p-5">
              {product.category && (
                <span className="w-max rounded-full bg-primary-200 px-3 py-0.5 text-xs font-semibold text-primary-700">
                  {product.category}
                </span>
              )}
              <h3 className="heading-6 font-bold text-ink">{product.title}</h3>
              <p className="paragraph-lg line-clamp-2 flex-1 text-muted">
                {product.description}
              </p>
              <Link
                href={href}
                className="mt-1 inline-flex w-max items-center gap-1 font-semibold text-accent-dark transition-colors hover:text-accent-deep"
              >
                <span>
                  {content.actionCardLabel}
                </span>
                <IoArrowForward />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
};

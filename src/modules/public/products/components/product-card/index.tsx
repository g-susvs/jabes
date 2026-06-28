import Link from "next/link";
import Image from "next/image";
import { IProductCardContent } from "../../interface/products";
import { IProductDTO } from "@/shared/interfaces/product";
import { IMAGE_NOT_FOUND_URL } from "@/shared/constants";
import { IoArrowForward } from "react-icons/io5";

interface IProps {
  product: IProductDTO;
  content: IProductCardContent;
}

export const ProductCard = ({ product, content }: IProps) => {
  const productImage = product.imgUrl || IMAGE_NOT_FOUND_URL;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card transition-shadow hover:shadow-lg">
      <figure className="h-[230px] w-full overflow-hidden">
        <Image
          width={400}
          height={300}
          src={productImage}
          alt={`Imagen del producto ${product.name}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </figure>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="w-max rounded-full bg-primary-200 px-3 py-0.5 text-xs font-semibold text-primary-700">
          {product.category.name}
        </span>
        <h3 className="heading-6 font-bold text-ink">{product.name}</h3>
        <p className="paragraph-lg line-clamp-2 flex-1 text-muted">
          {product.description}
        </p>
        <Link
          href={`/products/${product.slug}`}
          className="mt-1 inline-flex w-max items-center gap-1 font-semibold text-accent-dark transition-colors hover:text-accent-deep"
        >
          <span>
            {content.label} 
          </span>
          <IoArrowForward />
        </Link>
      </div>
    </article>
  );
};

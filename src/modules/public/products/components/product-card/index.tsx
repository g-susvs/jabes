import Link from "next/link";
import Image from "next/image";
import { IProductCardContent } from "../../interface/products";
import { IProductDTO } from "@/shared/interfaces/product";
import { IMAGE_NOT_FOUND_URL } from "@/shared/constants";
import { formatPrice } from "@/libs/format-price";

interface IProps {
  product: IProductDTO;
  content: IProductCardContent;
}

export const ProductCard = ({ product, content }: IProps) => {
  const productImage = product.imgUrl || IMAGE_NOT_FOUND_URL;
  const price = formatPrice(product.price);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card transition-shadow hover:shadow-lg"
    >
      <figure className="h-[230px] w-full overflow-hidden">
        <Image
          width={400}
          height={300}
          src={productImage}
          alt={`Imagen del producto ${product.name}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </figure>
      <div className="flex flex-1 flex-col gap-2 py-4 px-2 xs:p-5">
        <span className="w-max rounded-full bg-primary-200 px-3 py-0.5 text-xs font-semibold text-primary-700">
          {product.category.name}
        </span>
        <div className="px-2 xs:px-0">
          <h3 className="line-clamp-2 font-bold text-ink text-sm sm:text-lg">
            {product.name}
          </h3>
          <p className="paragraph-lg hidden line-clamp-2 flex-1 text-muted md:block">
            {product.description}
          </p>
          {price && (
            <p className="heading-6 font-bold text-accent-dark">{price}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

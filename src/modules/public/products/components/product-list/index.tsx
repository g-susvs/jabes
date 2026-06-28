import { IProductDTO } from "@/shared/interfaces/product";
import { IProductCardContent } from "../../interface/products";
import { ProductCard } from "../product-card";

interface IProps {
  products: IProductDTO[];
  content: IProductCardContent;
}
export const ProductList = ({ products, content }: IProps) => {
  return (
    <section className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.productId}
          product={product}
          content={content}
        />
      ))}
    </section>
  );
};

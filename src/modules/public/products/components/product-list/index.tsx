import { IProduct, IProductCardContent } from "../../interface/products";
import { ProductCard } from "../product-card";

interface IProps {
  products: IProduct[];
  content: IProductCardContent;
}
export const ProductList = ({ products, content }: IProps) => {
  return (
    <section className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} content={content} />
      ))}
    </section>
  );
};

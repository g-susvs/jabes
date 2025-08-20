import { Container } from "@/shared/components/container";
import { IOurProductsSection } from "../../interface/home";
import { ProductList } from "./product-list";
interface IProps {
  content: IOurProductsSection;
}

export const OurProductsSection = ({ content }: IProps) => {
  return (
    <section className="py-[100px] px-4">
      <Container>
        <div>
          <h2 className="heading-4 sm:heading-3 md:heading-2 text-primary-800 font-bold text-center">
            {content.title}
          </h2>
          <p className="paragraph-lg text-zinc-500 text-center">
            {content.description}
          </p>
        </div>
        <ProductList content={content} />
      </Container>
    </section>
  );
};

import { Container } from "@/shared/components/container";
import { IOurProductsSection } from "../../interface/home";
import Image from "next/image";
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
        <div className="flex flex-row gap-6 lg:justify-center overflow-x-auto pb-4 mt-6 w-full">
          {content.products.map((product) => (
            <article
              key={product.id}
              className="flex min-w-[280px] max-w-[320px] flex-col gap-2 w-full object-cover overflow-hidden"
            >
              <figure className="w-full h-[231px] object-cover rounded-2xl overflow-hidden">
                <Image
                  width={300}
                  height={300}
                  alt={product.title}
                  src={product.imageUrl}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="flex flex-col justify-between flex-grow gap-2">
                <div>
                  <span className="heading-5 text-zinc-800">
                    {product.title}
                  </span>
                  <p className="paragraph-lg text-start text-zinc-600">
                    {product.description}
                  </p>
                </div>
                <button className="w-max py-1 px-2 rounded-lg text-primary-600 border-1 border-primary-600">
                  <span>{content.actionCardLabel}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

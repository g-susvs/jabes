"use client";
import { Container } from "@/shared/components/container";
import { IMainSection, IProduct } from "../../interface/products";
import { clsx } from "@/libs/clsx";
import { useEffect, useState } from "react";
import { ProductList } from "../product-list";

interface IProps {
  content: IMainSection;
}

export const MainSection = ({ content }: IProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<IProduct[] | []>([]);

  useEffect(() => {
    if (!selectedCategory || selectedCategory === "all") {
      return setFilteredProducts(content.products);
    }
    const filteredProducts = content.products.filter(
      (item) => item.categoryId === selectedCategory
    );

    setFilteredProducts(filteredProducts);
  }, [selectedCategory]);

  return (
    <Container className="py-6 md:py-8 px-4">
      <section className="flex flex-col gap-2">
        <h3 className="heading-5 text-zinc-700">{content.title}</h3>
        <div className="flex gap-4 w-full overflow-x-auto pb-2">
          {content.categories.map((category, index) => (
            <div
              key={index}
              className={clsx(
                "w-max text-nowrap paragraph-lg rounded-lg px-4 py-1 font-semibold border-1 border-primary-500 text-primary-500 hover:bg-primary-700 hover:text-white transition-all cursor-pointer",
                selectedCategory === category.value &&
                  "text-white bg-primary-500"
              )}
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
            </div>
          ))}
        </div>
      </section>
      <ProductList products={filteredProducts} content={content.cardContent} />
    </Container>
  );
};

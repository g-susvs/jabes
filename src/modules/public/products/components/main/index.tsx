"use client";
import { Container } from "@/shared/components/container";
import { ICategoryItem, IMainSection } from "../../interface/products";
import { clsx } from "@/libs/clsx";
import { useEffect, useState } from "react";
import { ProductList } from "../product-list";
import { useGetCategories } from "@/modules/shared/hooks/useGetCategories";
import { useGetProducts } from "@/modules/shared/hooks/useGetProducts";
import { IProductDTO } from "@/shared/interfaces/product";
import { CategorySkeletonLoader } from "../category-skeleton-loader";
import { ProductsSkeletonLoader } from "../product-skeleton-loader";

interface IProps {
  content: IMainSection;
}

export const MainSection = ({ content }: IProps) => {
  const [categories, setCategories] = useState<ICategoryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<IProductDTO[] | []>(
    []
  );
  const { data: catgoriesData, isLoading: isLoadingCategories } =
    useGetCategories();
  const { data: productsData, isLoading: isLoadingProducts } = useGetProducts();

  useEffect(() => {
    if (!selectedCategory || (selectedCategory === "all" && productsData)) {
      return setFilteredProducts(productsData ?? []);
    }
    const filteredProducts =
      productsData?.filter((item) => item.categoryId === selectedCategory) ??
      [];

    setFilteredProducts(filteredProducts);
  }, [selectedCategory, productsData]);

  useEffect(() => {
    if (catgoriesData) {
      const news = [
        ...content.categories,
        ...catgoriesData.map((item) => ({
          label: item.name,
          value: item.categoryId,
        })),
      ];

      setCategories(news);
    } else {
      setCategories([...content.categories]);
    }
  }, [catgoriesData, content.categories]);

  return (
    <Container className="py-6 md:py-8 px-4">
      <section className="flex flex-col gap-2">
        <h3 className="heading-5 text-zinc-700">{content.title}</h3>

        <div className="flex gap-4 w-full overflow-x-auto pb-2">
          {isLoadingCategories && <CategorySkeletonLoader />}
          {categories &&
            !isLoadingCategories &&
            categories.map((category, index) => (
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
      {isLoadingProducts && <ProductsSkeletonLoader />}
      {!isLoadingProducts && (
        <ProductList
          products={filteredProducts}
          content={content.cardContent}
        />
      )}
    </Container>
  );
};

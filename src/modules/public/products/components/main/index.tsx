"use client";
import { Container } from "@/shared/components/container";
import { ICategoryItem, IMainSection } from "../../interface/products";
import { clsx } from "@/libs/clsx";
import { useEffect, useState } from "react";
import { ProductList } from "../product-list";
import { useGetCategories } from "@/shared/hooks/useGetCategories";
import { useGetProducts } from "@/shared/hooks/useGetProducts";
import { IProductDTO } from "@/shared/interfaces/product";
import { CategorySkeletonLoader } from "../category-skeleton-loader";
import { ProductsSkeletonLoader } from "../product-skeleton-loader";

interface IProps {
  content: IMainSection;
}

export const MainSection = ({ content }: IProps) => {
  const [categories, setCategories] = useState<ICategoryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState<IProductDTO[] | []>(
    [],
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

  const showEmptyState =
    !isLoadingProducts && filteredProducts.length === 0;

  return (
    <Container className="px-4 py-12 sm:py-16">
      <section className="flex flex-col items-center gap-6">
        <h2 className="heading-3 text-center font-bold text-ink">
          {content.title}
        </h2>

        <div className="flex w-full flex-wrap justify-center gap-3 overflow-x-auto pb-2">
          {isLoadingCategories && <CategorySkeletonLoader />}
          {categories &&
            !isLoadingCategories &&
            categories.map((category, index) => {
              const isActive = selectedCategory === category.value;
              return (
                <button
                  key={index}
                  className={clsx(
                    "w-max text-nowrap rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-accent text-ink"
                      : "border border-line text-muted hover:border-accent hover:text-accent-dark",
                  )}
                  onClick={() => setSelectedCategory(category.value)}
                  aria-pressed={isActive}
                >
                  {category.label}
                </button>
              );
            })}
        </div>
      </section>

      {isLoadingProducts && <ProductsSkeletonLoader />}

      {showEmptyState && (
        <div className="mx-auto mt-16 max-w-[420px] text-center">
          <h3 className="heading-5 font-bold text-ink">
            {content.emptyState.title}
          </h3>
          <p className="paragraph-lg mt-2 text-muted">
            {content.emptyState.description}
          </p>
        </div>
      )}

      {!isLoadingProducts && !showEmptyState && (
        <ProductList
          products={filteredProducts}
          content={content.cardContent}
        />
      )}
    </Container>
  );
};

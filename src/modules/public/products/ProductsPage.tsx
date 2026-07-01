import { Banner } from "@/shared/components/banner";
import { IProductsPageContent } from "./interface/products";
import { MainSection } from "./components/main";
import { IProductDTO } from "@/shared/interfaces/product";
import { ICategory } from "@/shared/interfaces/category";
import { IPagination } from "@/shared/interfaces/pagination";

interface IProps {
  content: IProductsPageContent;
  products: IProductDTO[];
  categories: ICategory[];
  pagination: IPagination;
  selectedCategory?: string;
}

export const ProductsPage = ({
  content,
  products,
  categories,
  pagination,
  selectedCategory,
}: IProps) => {
  return (
    <>
      {/* TODO: mover a CMS (eyebrow del banner) */}
      <Banner content={content.banner} eyebrow="Catálogo" />
      <MainSection
        content={content.main}
        products={products}
        categories={categories}
        pagination={pagination}
        selectedCategory={selectedCategory}
      />
    </>
  );
};

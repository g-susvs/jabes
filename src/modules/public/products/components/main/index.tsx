import Link from "next/link";
import { Container } from "@/shared/components/container";
import { clsx } from "@/libs/clsx";
import { IProductDTO } from "@/shared/interfaces/product";
import { ICategory } from "@/shared/interfaces/category";
import { IPagination } from "@/shared/interfaces/pagination";
import { IMainSection } from "../../interface/products";
import { buildProductsHref } from "../../helpers";
import { ProductList } from "../product-list";
import { Paginator } from "../paginator";

interface IProps {
  content: IMainSection;
  products: IProductDTO[];
  categories: ICategory[];
  pagination: IPagination;
  /** Slug de la categoría activa; vacío = "Todas". */
  selectedCategory?: string;
}

export const MainSection = ({
  content,
  products,
  categories,
  pagination,
  selectedCategory,
}: IProps) => {
  const allLabel =
    content.categories.find((c) => c.value === "all")?.label ?? "Todas";

  const chips = [
    { label: allLabel, value: "" },
    ...categories.map((c) => ({ label: c.name, value: c.slug })),
  ];

  const showEmptyState = products.length === 0;

  return (
    <Container className="px-4 py-12 sm:py-16">
      <section className="flex flex-col items-center gap-6">
        <h2 className="heading-3 text-center font-bold text-ink">
          {content.title}
        </h2>

        <div className="flex w-full flex-wrap justify-center gap-3 overflow-x-auto pb-2">
          {chips.map((chip) => {
            const isActive = (selectedCategory ?? "") === chip.value;
            return (
              <Link
                key={chip.value || "all"}
                href={buildProductsHref(1, chip.value)}
                aria-current={isActive ? "true" : undefined}
                className={clsx(
                  "w-max text-nowrap rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-accent text-white"
                    : "border border-line text-muted hover:border-accent hover:text-accent-dark"
                )}
              >
                {chip.label}
              </Link>
            );
          })}
        </div>
      </section>

      {showEmptyState ? (
        <div className="mx-auto mt-16 max-w-[420px] text-center">
          <h3 className="heading-5 font-bold text-ink">
            {content.emptyState.title}
          </h3>
          <p className="paragraph-lg mt-2 text-muted">
            {content.emptyState.description}
          </p>
        </div>
      ) : (
        <>
          <ProductList products={products} content={content.cardContent} />
          <Paginator
            pagination={pagination}
            buildHref={(p) => buildProductsHref(p, selectedCategory)}
          />
        </>
      )}
    </Container>
  );
};

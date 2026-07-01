import { IPagination } from "@/shared/interfaces/pagination";
import { getPageNumbers } from "../helpers/get-page-numbers";

export type PaginationItem =
  | { type: "dots"; key: string }
  | { type: "page"; value: number; isActive: boolean; alwaysVisible: boolean };

/** Los ítems no imprescindibles se ocultan en móvil (solo `sm+`). */
const isAlwaysVisible = (n: number, page: number, pageCount: number) =>
  n === 1 || n === pageCount || Math.abs(n - page) <= 1;

/**
 * Deriva del `meta.pagination` de Strapi todo lo que la UI de paginado
 * necesita: la ventana de páginas, el rango "Mostrando X–Y de Z" y las
 * banderas de navegación.
 */
export const usePagination = (pagination: IPagination) => {
  const { page, pageSize, pageCount, total } = pagination;

  const items: PaginationItem[] = getPageNumbers(page, pageCount).map(
    (value, index) =>
      value === "..."
        ? { type: "dots", key: `dots-${index}` }
        : {
            type: "page",
            value,
            isActive: value === page,
            alwaysVisible: isAlwaysVisible(value, page, pageCount),
          }
  );

  return {
    page,
    pageCount,
    total,
    items,
    rangeStart: total === 0 ? 0 : (page - 1) * pageSize + 1,
    rangeEnd: Math.min(page * pageSize, total),
    isFirst: page <= 1,
    isLast: page >= pageCount,
    hasPages: pageCount > 1,
  };
};

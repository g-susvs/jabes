import Link from "next/link";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { clsx } from "@/libs/clsx";
import { IPagination } from "@/shared/interfaces/pagination";
import { usePagination } from "../../hooks/usePagination";

interface IProps {
  pagination: IPagination;
  /** Construye el href de una página conservando los filtros actuales. */
  buildHref: (page: number) => string;
}

const baseCell =
  "inline-flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-semibold transition-colors";
const navCell = "border-line text-ink hover:border-accent hover:text-accent-dark";
const disabledCell = "cursor-not-allowed border-line text-muted/40";

export const Paginator = ({ pagination, buildHref }: IProps) => {
  const { page, items, rangeStart, rangeEnd, total, isFirst, isLast, hasPages } =
    usePagination(pagination);

  return (
    <div className="mt-12 flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
      <p className="paragraph-md text-muted">
        Mostrando {rangeStart}–{rangeEnd} de {total} productos
      </p>

      {hasPages && (
        <nav
          aria-label="Paginación de productos"
          className="flex items-center gap-2"
        >
          {/* Anterior */}
          {isFirst ? (
            <span aria-disabled="true" className={clsx(baseCell, disabledCell)}>
              <IoChevronBack aria-hidden />
            </span>
          ) : (
            <Link
              href={buildHref(page - 1)}
              rel="prev"
              aria-label="Página anterior"
              className={clsx(baseCell, navCell)}
            >
              <IoChevronBack aria-hidden />
            </Link>
          )}

          {items.map((item) => {
            if (item.type === "dots") {
              return (
                <span
                  key={item.key}
                  aria-hidden
                  className="inline-flex h-10 min-w-10 items-center justify-center text-sm text-muted"
                >
                  {"…"}
                </span>
              );
            }

            return (
              <Link
                key={item.value}
                href={buildHref(item.value)}
                aria-label={`Página ${item.value}`}
                aria-current={item.isActive ? "page" : undefined}
                className={clsx(
                  baseCell,
                  !item.alwaysVisible && "hidden sm:inline-flex",
                  item.isActive
                    ? "border-accent bg-accent text-white"
                    : navCell
                )}
              >
                {item.value}
              </Link>
            );
          })}

          {/* Siguiente */}
          {isLast ? (
            <span aria-disabled="true" className={clsx(baseCell, disabledCell)}>
              <IoChevronForward aria-hidden />
            </span>
          ) : (
            <Link
              href={buildHref(page + 1)}
              rel="next"
              aria-label="Página siguiente"
              className={clsx(baseCell, navCell)}
            >
              <IoChevronForward aria-hidden />
            </Link>
          )}
        </nav>
      )}
    </div>
  );
};

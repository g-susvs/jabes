/**
 * Ventana de páginas con elipsis:
 *   ≤ 7 páginas   → se muestran todas
 *   page 1..3     → 1 2 3 … 11 12
 *   page 6 de 12  → 1 … 5 6 7 … 12
 *   page 10..12   → 1 2 … 10 11 12
 */
export const getPageNumbers = (
  currentPage: number,
  totalPages: number
): (number | "...")[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

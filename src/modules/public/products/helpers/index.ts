/** Normaliza los parámetros de la URL a valores seguros. */
export const parseSearchParams = (params: { page?: string; category?: string; search?: string }) => ({
  page: Math.max(1, Number(params.page) || 1),
  category: params.category?.trim() || undefined,
  search: params.search?.trim() || undefined,
});

/**
 * Construye el href relativo del listado de productos conservando la
 * categoría, búsqueda y número de página. Se usa tanto para los enlaces del
 * paginador/categorías como para el `canonical` del SEO.
 */
export const buildProductsHref = (page: number, category?: string, search?: string) => {
  const qs = new URLSearchParams();
  if (category) qs.set("category", category);
  if (search) qs.set("search", search);
  if (page > 1) qs.set("page", String(page));
  const query = qs.toString();
  return query ? `/products?${query}` : "/products";
};

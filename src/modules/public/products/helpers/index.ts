/** Normaliza los parámetros de la URL a valores seguros. */
export const parseSearchParams = (params: { page?: string; category?: string }) => ({
  page: Math.max(1, Number(params.page) || 1),
  category: params.category?.trim() || undefined,
});

/**
 * Construye el href relativo del listado de productos conservando la
 * categoría y el número de página. Se usa tanto para los enlaces del
 * paginador/categorías como para el `canonical` del SEO.
 */
export const buildProductsHref = (page: number, category?: string) => {
  const qs = new URLSearchParams();
  if (category) qs.set("category", category);
  if (page > 1) qs.set("page", String(page));
  const query = qs.toString();
  return query ? `/products?${query}` : "/products";
};

/**
 * Formatea un precio al formato de soles peruanos usado en la UI: `S/60.00`.
 *
 * Acepta el valor crudo que envía Strapi (number o string) y siempre
 * devuelve dos decimales. Si el valor es nulo, vacío o no numérico
 * devuelve `null` para que la card decida no mostrar el precio.
 */
export const formatPrice = (
  value?: number | string | null,
): string | null => {
  if (value === null || value === undefined || value === "") return null;

  const amount = typeof value === "string" ? Number(value) : value;

  if (!Number.isFinite(amount)) return null;

  return `S/${amount.toFixed(2)}`;
};

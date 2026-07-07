import { SupabaseProductService } from "./external/supabase-product.service";

/**
 * Fuente de datos de productos según NEXT_PUBLIC_DATA_SOURCE
 * ("supabase" | "strapi"). Los componentes/páginas consumen esta fachada
 * y nunca una implementación concreta.
 */
export const ProductService = SupabaseProductService;

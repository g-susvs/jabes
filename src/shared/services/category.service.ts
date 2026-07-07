import { SupabaseCategoryService } from "./external/supabase-category.service";

/**
 * Fuente de datos de categorías según NEXT_PUBLIC_DATA_SOURCE
 * ("supabase" | "strapi"). Los componentes/páginas consumen esta fachada
 * y nunca una implementación concreta.
 */
export const CategoryService = SupabaseCategoryService

import { SupabaseServiceService } from "./external/supabase-service.service";

/**
 * Fuente de datos de servicios (tabla `services` de Supabase).
 * Los componentes/páginas consumen esta fachada y nunca una
 * implementación concreta.
 */
export const ServiceService = SupabaseServiceService;

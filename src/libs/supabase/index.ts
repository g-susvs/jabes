import { environment } from "@/config/env/environment";

interface ISupabaseFetchOptions {
  /** Segundos de caché ISR (solo aplica en server; el navegador lo ignora). */
  revalidate?: number;
  /** Pide el total de filas (Prefer: count=exact) para paginación. */
  count?: boolean;
}

export interface ISupabaseResult<T> {
  /** null si la petición falló. */
  data: T | null;
  /** Total de filas que matchean (solo si se pidió `count`). */
  total: number;
}

/**
 * GET a la API REST de Supabase (PostgREST) con la anon key (solo lectura,
 * protegida por RLS). `pathWithQuery` es relativo a /rest/v1, p. ej.
 * "products?active=eq.true&order=name.asc".
 */
export const supabaseRest = async <T>(
  pathWithQuery: string,
  { revalidate, count }: ISupabaseFetchOptions = {}
): Promise<ISupabaseResult<T>> => {
  try {
    const response = await fetch(
      `${environment.supabaseUrl}/rest/v1/${pathWithQuery}`,
      {
        headers: {
          apikey: environment.supabaseAnonKey,
          Authorization: `Bearer ${environment.supabaseAnonKey}`,
          ...(count ? { Prefer: "count=exact" } : {}),
        },
        ...(revalidate !== undefined ? { next: { revalidate } } : {}),
      }
    );

    if (!response.ok) return { data: null, total: 0 };

    // Con count=exact, PostgREST responde "content-range: 0-9/23".
    const total = count
      ? Number(response.headers.get("content-range")?.split("/")[1] ?? 0)
      : 0;

    return { data: (await response.json()) as T, total };
  } catch {
    return { data: null, total: 0 };
  }
};

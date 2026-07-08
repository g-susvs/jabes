import { IServiceDTO } from "@/shared/interfaces/service";
import { IFindParams } from "@/shared/interfaces/find-params";
import { supabaseRest } from "@/libs/supabase";
import { IStrapiSeo } from "@/shared/seo/interfaces";
import { REVALIDATE_CATALOG_SECONDS } from "@/shared/constants";

// ── Supabase row types ─────────────────────────────────

interface ISupabaseSeo {
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string | null;
  canonicalUrl?: string | null;
  shareImageUrl?: string | null;
}

interface ISupabaseServiceRow {
  id: string;
  title: string | null;
  slug: string | null;
  description: string | null;
  icon: string | null;
  image_url: string | null;
  image_alt: string | null;
  featured: boolean | null;
  active: boolean | null;
  seo: ISupabaseSeo | null;
}

// ── Helpers ────────────────────────────────────────────

const SERVICE_SELECT =
  "select=id,title,slug,description,icon,image_url,image_alt,featured,active,seo";
const ACTIVE_FILTER = "active=eq.true";
const ORDER = "order=sort_order.asc";

// Ícono por defecto para las cards de servicio (react-icons).
const DEFAULT_ICON = "MdOutlineContentCut";

const mapSeo = (seo: ISupabaseSeo | null): IStrapiSeo | null =>
  seo
    ? {
        metaTitle: seo.metaTitle ?? null,
        metaDescription: seo.metaDescription ?? null,
        keywords: seo.keywords ?? null,
        canonicalUrl: seo.canonicalUrl ?? null,
        shareImage: seo.shareImageUrl ? { url: seo.shareImageUrl } : null,
      }
    : null;

const mapService = (row: ISupabaseServiceRow): IServiceDTO => ({
  serviceId: row.id,
  title: row.title ?? "",
  description: row.description ?? "",
  slug: row.slug ?? "",
  imgUrl: row.image_url ?? "",
  imgAlt: row.image_alt ?? row.title ?? "",
  icon: row.icon ?? DEFAULT_ICON,
  featured: row.featured ?? false,
  active: row.active ?? true,
  seo: mapSeo(row.seo),
});

// ── Public API ─────────────────────────────────────────

export class SupabaseServiceService {
  /**
   * Get all active services sorted by order.
   */
  static async getAll(params?: IFindParams): Promise<IServiceDTO[]> {
    const parts = [SERVICE_SELECT, ACTIVE_FILTER, ORDER];

    if (params?.size) {
      parts.push(`limit=${params.size}`);
      if (params?.page) {
        parts.push(`offset=${(Math.max(1, params.page) - 1) * params.size}`);
      }
    }

    const { data } = await supabaseRest<ISupabaseServiceRow[]>(
      `services?${parts.join("&")}`,
      { revalidate: REVALIDATE_CATALOG_SECONDS }
    );

    return (data ?? []).map(mapService);
  }

  /**
   * Servicios para la sección destacada del home: "featured con respaldo".
   * Ordena featured primero (featured.desc) y completa con el resto por
   * sort_order, tomando `limit`. Así nunca queda vacío aunque falten featured.
   */
  static async getHighlighted(limit: number): Promise<IServiceDTO[]> {
    const parts = [
      SERVICE_SELECT,
      ACTIVE_FILTER,
      "order=featured.desc,sort_order.asc",
      `limit=${limit}`,
    ];

    const { data } = await supabaseRest<ISupabaseServiceRow[]>(
      `services?${parts.join("&")}`,
      // { revalidate: REVALIDATE_CATALOG_SECONDS }
    );

    return (data ?? []).map(mapService);
  }
}

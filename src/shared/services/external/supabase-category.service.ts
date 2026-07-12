import { ICategory } from "@/shared/interfaces/category";
import { IFindParams } from "@/shared/interfaces/find-params";
import { supabaseRest } from "@/libs/supabase";
import { REVALIDATE_CATALOG_SECONDS } from "@/shared/constants";

// ── Supabase row types ─────────────────────────────────

interface ISupabaseCategoryRow {
  id: string;
  name: string | null;
  slug: string | null;
  active: boolean | null;
}

// ── Helpers ────────────────────────────────────────────

const mapCategory = (row: ISupabaseCategoryRow): ICategory => ({
  categoryId: row.id,
  name: row.name ?? "",
  slug: row.slug ?? "",
  active: row.active ?? true,
});

// ── Public API ─────────────────────────────────────────

export class SupabaseCategoryService {
  /**
   * Get all active categories sorted by order.
   */
  static async getAll(params?: IFindParams): Promise<ICategory[]> {
    const parts = [
      "select=id,name,slug,active",
      "active=eq.true",
      "order=sort_order.asc",
    ];

    if (params?.size) {
      parts.push(`limit=${params.size}`);
      if (params?.page) {
        parts.push(`offset=${(Math.max(1, params.page) - 1) * params.size}`);
      }
    }

    const { data } = await supabaseRest<ISupabaseCategoryRow[]>(
      `categories?${parts.join("&")}`,
      { revalidate: REVALIDATE_CATALOG_SECONDS }
    );

    return (data ?? []).map(mapCategory);
  }
}

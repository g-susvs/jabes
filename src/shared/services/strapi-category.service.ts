import { environment } from "@/config/env/environment";
import { ICategory } from "@/shared/interfaces/category";
import { IFindParams } from "@/shared/interfaces/find-params";

const STRAPI_URL = environment.strapiHost

// ── Strapi response types ──────────────────────────────

interface IStrapiCategory {
  id?: number;
  documentId?: string | null;
  name?: string | null;
  slug?: string | null;
  active?: boolean | null;
  order?: number | null;
}

interface IStrapiCollectionResponse<T> {
  data?: T[] | null;
  meta?: {
    pagination?: {
      page?: number;
      pageSize?: number;
      pageCount?: number;
      total?: number;
    };
  };
}

// ── Helpers ────────────────────────────────────────────

const mapStrapiCategory = (cat: IStrapiCategory): ICategory => ({
  categoryId: String(cat.documentId ?? cat.id ?? ""),
  name: cat.name ?? "",
  slug: cat.slug ?? "",
  active: cat.active ?? true,
});

// ── Public API ─────────────────────────────────────────

export class StrapiCategoryService {
  /**
   * Get all active categories sorted by order.
   */
  static async getAll(params?: IFindParams): Promise<ICategory[]> {
    const parts = [
      "filters[active][$eq]=true",
      "sort=order:asc",
    ];

    if (params?.page) {
      parts.push(`pagination[page]=${params.page}`);
    }
    if (params?.size) {
      parts.push(`pagination[pageSize]=${params.size}`);
    }

    const qs = parts.join("&");
    const response = await fetch(`${STRAPI_URL}/api/categories?${qs}`);

    if (!response.ok) return [];

    const json =
      (await response.json()) as IStrapiCollectionResponse<IStrapiCategory>;

    return (json.data ?? []).map(mapStrapiCategory);
  }
}

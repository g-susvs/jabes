import { cache } from "react";
import { IProductDTO } from "@/shared/interfaces/product";
import { IProductFindParams } from "@/shared/interfaces/find-params";
import { IPaginated } from "@/shared/interfaces/pagination";
import { IStrapiSeo } from "@/shared/seo/interfaces";
import { supabaseRest } from "@/libs/supabase";
import {
  PRODUCTS_PAGE_SIZE,
  REVALIDATE_CATALOG_SECONDS,
} from "../../constants";

interface IGetPagedParams {
  page?: number;
  size?: number;
  categorySlug?: string;
}

// ── Supabase row types ─────────────────────────────────

interface ISupabaseSeo {
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string | null;
  canonicalUrl?: string | null;
  shareImageUrl?: string | null;
}

interface ISupabaseCategoryRef {
  id: string;
  name: string | null;
  slug: string | null;
}

interface ISupabaseProductRow {
  id: string;
  name: string | null;
  slug: string | null;
  description: string | null;
  price: number | null;
  image_url: string | null;
  features: { text?: string | null }[] | null;
  seo: ISupabaseSeo | null;
  active: boolean | null;
  category_id: string | null;
  category: ISupabaseCategoryRef | null;
}

// ── Helpers ────────────────────────────────────────────

const PRODUCT_SELECT =
  "select=id,name,slug,description,price,image_url,features,seo,active," +
  "category_id,category:categories(id,name,slug)";

// !inner permite filtrar productos por columnas de la categoría (slug).
const PRODUCT_SELECT_INNER_CATEGORY =
  "select=id,name,slug,description,price,image_url,features,seo,active," +
  "category_id,category:categories!inner(id,name,slug)";

const ACTIVE_FILTER = "active=eq.true";
const NAME_ORDER = "order=name.asc";

// El seo se guarda en Supabase como jsonb con shareImageUrl plano; aquí se
// re-expande a la forma IStrapiSeo que esperan buildMetadata y los DTOs.
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

const mapProduct = (row: ISupabaseProductRow): IProductDTO => {
  const categoryId = row.category?.id ?? row.category_id ?? "";

  return {
    productId: row.id,
    name: row.name ?? "",
    description: row.description ?? "",
    imgUrl: row.image_url ?? "",
    price: row.price ?? null,
    slug: row.slug ?? "",
    features: (row.features ?? []).map((feature, index) => ({
      id: String(index),
      text: feature.text ?? "",
    })),
    active: row.active ?? true,
    categoryId,
    category: {
      name: row.category?.name ?? "",
      categoryId,
    },
    seo: mapSeo(row.seo),
  };
};

// ── Public API ─────────────────────────────────────────

export class SupabaseProductService {
  /**
   * Get all active products, optionally filtered by category.
   */
  static async getAll(params?: IProductFindParams): Promise<IProductDTO[]> {
    const parts = [PRODUCT_SELECT, ACTIVE_FILTER, NAME_ORDER];

    if (params?.categoryId) {
      parts.push(`category_id=eq.${encodeURIComponent(params.categoryId)}`);
    }
    if (params?.size) {
      parts.push(`limit=${params.size}`);
      if (params?.page) {
        parts.push(`offset=${(Math.max(1, params.page) - 1) * params.size}`);
      }
    }

    const { data } = await supabaseRest<ISupabaseProductRow[]>(
      `products?${parts.join("&")}`,
      { revalidate: REVALIDATE_CATALOG_SECONDS }
    );

    return (data ?? []).map(mapProduct);
  }

  /**
   * Productos para la sección destacada del home: "featured con respaldo".
   * Ordena featured primero (featured.desc) y completa con el resto por
   * nombre, tomando `limit`. Así nunca queda vacío aunque falten featured.
   */
  static async getHighlighted(limit: number): Promise<IProductDTO[]> {
    const parts = [
      PRODUCT_SELECT,
      ACTIVE_FILTER,
      "order=featured.desc,name.asc",
      `limit=${limit}`,
    ];

    const { data } = await supabaseRest<ISupabaseProductRow[]>(
      `products?${parts.join("&")}`,
      { revalidate: REVALIDATE_CATALOG_SECONDS }
    );

    return (data ?? []).map(mapProduct);
  }

  /**
   * Get a page of active products (paginated server-side by Supabase),
   * optionally filtered by category slug. Returns the items plus the
   * pagination metadata needed by the paginator.
   */
  static async getPaged(
    params?: IGetPagedParams
  ): Promise<IPaginated<IProductDTO>> {
    const page = Math.max(1, params?.page ?? 1);
    const pageSize = params?.size ?? PRODUCTS_PAGE_SIZE;

    const parts = [
      params?.categorySlug ? PRODUCT_SELECT_INNER_CATEGORY : PRODUCT_SELECT,
      ACTIVE_FILTER,
      NAME_ORDER,
      `limit=${pageSize}`,
      `offset=${(page - 1) * pageSize}`,
    ];

    if (params?.categorySlug) {
      parts.push(`category.slug=eq.${encodeURIComponent(params.categorySlug)}`);
    }

    const { data, total } = await supabaseRest<ISupabaseProductRow[]>(
      `products?${parts.join("&")}`,
      { revalidate: REVALIDATE_CATALOG_SECONDS, count: true }
    );

    return {
      items: (data ?? []).map(mapProduct),
      pagination: {
        page,
        pageSize,
        pageCount: total > 0 ? Math.ceil(total / pageSize) : 0,
        total,
      },
    };
  }

  /**
   * Get a single product by its slug.
   * Deduplicado por request con React cache(): la página de detalle lo
   * llama en generateMetadata y en el componente, pero solo viaja 1 fetch.
   */
  static getBySlug = cache(
    async (slug: string): Promise<IProductDTO | undefined> => {
      const parts = [
        PRODUCT_SELECT,
        ACTIVE_FILTER,
        `slug=eq.${encodeURIComponent(slug)}`,
        "limit=1",
      ];

      const { data } = await supabaseRest<ISupabaseProductRow[]>(
        `products?${parts.join("&")}`,
        { revalidate: REVALIDATE_CATALOG_SECONDS }
      );

      const first = data?.[0];
      return first ? mapProduct(first) : undefined;
    }
  );
}

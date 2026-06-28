import { IProductDTO } from "@/shared/interfaces/product";
import { IProductFindParams } from "@/shared/interfaces/find-params";
import { environment } from "@/config/env/environment";

const STRAPI_URL = environment.strapiHost;

// ── Strapi response types ──────────────────────────────

interface IStrapiMediaFormat {
  url?: string | null;
}

interface IStrapiMedia {
  url?: string | null;
  alternativeText?: string | null;
  formats?: {
    thumbnail?: IStrapiMediaFormat | null;
    small?: IStrapiMediaFormat | null;
    medium?: IStrapiMediaFormat | null;
    large?: IStrapiMediaFormat | null;
  } | null;
}

interface IStrapiFeature {
  id?: number;
  text?: string | null;
}

interface IStrapiCategory {
  id?: number;
  documentId?: string | null;
  name?: string | null;
  slug?: string | null;
}

interface IStrapiProduct {
  id?: number;
  documentId?: string | null;
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  active?: boolean | null;
  image?: IStrapiMedia | null;
  features?: IStrapiFeature[] | null;
  category?: IStrapiCategory | null;
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

const getMediaUrl = (
  media?: IStrapiMedia | null,
) => {
  const url =
    media?.formats?.medium?.url ??
    media?.formats?.small?.url ??
    media?.formats?.thumbnail?.url ??
    media?.url;

  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
};

const mapStrapiProduct = (product: IStrapiProduct): IProductDTO => ({
  productId: String(product.documentId ?? product.id ?? ""),
  name: product.name ?? "",
  description: product.description ?? "",
  imgUrl: getMediaUrl(product.image),
  slug: product.slug ?? "",
  features: product.features?.map((f) => ({
    id: String(f.id ?? ""),
    text: f.text ?? "",
  })),
  active: product.active ?? true,
  categoryId: String(product.category?.documentId ?? product.category?.id ?? ""),
  category: {
    name: product.category?.name ?? "",
    categoryId: String(
      product.category?.documentId ?? product.category?.id ?? ""
    ),
  },
});

// ── Queries ────────────────────────────────────────────

const PRODUCT_POPULATE =
  "populate[0]=image&populate[1]=category&populate[2]=features";
const ACTIVE_FILTER = "filters[active][$eq]=true";

// ── Public API ─────────────────────────────────────────

export class StrapiProductService {
  /**
   * Get all active products, optionally filtered by category.
   */
  static async getAll(params?: IProductFindParams): Promise<IProductDTO[]> {
    const parts = [ACTIVE_FILTER, PRODUCT_POPULATE, "sort=name:asc"];

    if (params?.categoryId) {
      parts.push(
        `filters[category][documentId][$eq]=${params.categoryId}`
      );
    }
    if (params?.page) {
      parts.push(`pagination[page]=${params.page}`);
    }
    if (params?.size) {
      parts.push(`pagination[pageSize]=${params.size}`);
    }

    const qs = parts.join("&");
    const response = await fetch(`${STRAPI_URL}/api/products?${qs}`);

    if (!response.ok) return [];

    const json =
      (await response.json()) as IStrapiCollectionResponse<IStrapiProduct>;

    return (json.data ?? []).map(mapStrapiProduct);
  }

  /**
   * Get a single product by its slug.
   */
  static async getBySlug(slug: string): Promise<IProductDTO | undefined> {
    const qs = [
      `filters[slug][$eq]=${slug}`,
      ACTIVE_FILTER,
      PRODUCT_POPULATE,
    ].join("&");

    const response = await fetch(`${STRAPI_URL}/api/products?${qs}`, {
      cache: "no-store",
    });

    if (!response.ok) return undefined;

    const json =
      (await response.json()) as IStrapiCollectionResponse<IStrapiProduct>;

    const first = json.data?.[0];
    return first ? mapStrapiProduct(first) : undefined;
  }
}

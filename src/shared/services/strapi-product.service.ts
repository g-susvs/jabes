import { IProductDTO } from "@/shared/interfaces/product";
import { IProductFindParams } from "@/shared/interfaces/find-params";
import { environment } from "@/config/env/environment";
import { getMediaUrl } from "@/libs/strapi";
import { IStrapiMedia } from "@/libs/strapi/interfaces";
import { IStrapiSeo } from "@/shared/seo/interfaces";

const STRAPI_URL = environment.strapiHost;

// ── Strapi response types ──────────────────────────────

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
  seo?: IStrapiSeo | null;
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
  seo: product.seo ?? null,
});

// ── Queries ────────────────────────────────────────────

const PRODUCT_POPULATE =
  "populate[0]=image&populate[1]=category&populate[2]=features";
// Detalle: sintaxis de objeto (consistente) para poder anidar seo.shareImage.
// No se puede mezclar con populate[0]=... (array indexado) o Strapi v5 da 400.
const PRODUCT_DETAIL_POPULATE =
  "populate[image]=true" +
  "&populate[category]=true" +
  "&populate[features]=true" +
  "&populate[seo][populate]=shareImage";
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
      PRODUCT_DETAIL_POPULATE,
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

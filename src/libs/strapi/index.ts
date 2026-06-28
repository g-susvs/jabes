import { environment } from "@/config/env/environment";
import { IStrapiMedia } from "./interfaces";

const STRAPI_URL = environment.strapiHost;

const withStrapiUrl = (url?: string | null) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
};

export const getMediaUrl = (
  media?: IStrapiMedia | null,
) => {
  const url =
    media?.url ??
    media?.formats?.large?.url ??
    media?.formats?.medium?.url ??
    media?.formats?.small?.url ??
    media?.formats?.thumbnail?.url;

  return withStrapiUrl(url);
};

interface IStrapiMediaFormat {
  url?: string | null;
}

export interface IStrapiMedia {
  url?: string | null;
  alternativeText?: string | null;
  formats?: {
    thumbnail?: IStrapiMediaFormat | null;
    small?: IStrapiMediaFormat | null;
    medium?: IStrapiMediaFormat | null;
    large?: IStrapiMediaFormat | null;
  } | null;
}

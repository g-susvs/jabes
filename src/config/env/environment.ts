import { IEnvironment } from "./interface";

export const environment: IEnvironment = {
  apiHost: process.env.NEXT_PUBLIC_API_URL ?? "",
  strapiHost: process.env.NEXT_PUBLIC_STRAPI_URL ?? "",
  contactPhone:  process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
};

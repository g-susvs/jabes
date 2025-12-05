import { environment } from "@/config/env/environment";
import axios from "axios";

export const authInstance = axios.create({
  baseURL: `${environment.apiHost}/auth`,
});
export const categoryInstance = axios.create({
  baseURL: `${environment.apiHost}/categories`,
});
export const productsInstance = axios.create({
  baseURL: `${environment.apiHost}/products`,
});

import { environment } from "@/config/env/environment";
import axios, { AxiosInstance } from "axios";
import { getCookie } from "./get-cookie";

export const authInstance = axios.create({
  baseURL: `${environment.apiHost}/auth`,
});
export const categoryInstance = axios.create({
  baseURL: `${environment.apiHost}/categories`,
});
export const productsInstance = axios.create({
  baseURL: `${environment.apiHost}/products`,
});

const addTokenInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config) => {
    const token = getCookie("jabes-authorization");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status;

      if (status === 403 || status === 401) {
        document.cookie = `jabes-authorization=`;

        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
      }

      return Promise.reject(error);
    }
  );
};

[authInstance, categoryInstance, productsInstance].forEach((item) =>
  addTokenInterceptor(item)
);

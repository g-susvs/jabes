import { productsInstance } from "@/libs/axios";
import { ICategory } from "@/shared/interfaces/category";
import {
  ICreateProductParams,
  IEditProductParams,
} from "../interfaces/product-params";
import { IProductDTO } from "../interfaces/product";
import { IProductFindParams } from "../interfaces/find-params";

export class ProductService {
  static async getAll(findParams?: IProductFindParams) {
    const resp = await productsInstance.get("", {
      params: findParams,
    });
    return resp.data as IProductDTO[];
  }

  static async getBySlug(productSlug: string) {
    const resp = await productsInstance.get(`by-slug/${productSlug}`);
    return resp.data as IProductDTO;
  }

  static async create(params: ICreateProductParams) {
    const { data, image } = params;
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("active", String(data.active));
    formData.append("features", JSON.stringify(data.features));
    formData.append("categoryId", data.categoryId);
    if (image) formData.append("image", image);

    const resp = await productsInstance.post("", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return resp.data as ICategory;
  }

  static async edit(params: IEditProductParams) {
    const { productId, data, image } = params;
    const formData = new FormData();

    if (data.name) formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    if (data.features)
      formData.append("features", JSON.stringify(data.features));
    if (data.categoryId) formData.append("categoryId", data.categoryId);
    if (image) formData.append("image", image);
    formData.append("active", String(data.active));

    const resp = await productsInstance.patch(`/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return resp.data as ICategory;
  }

  static async delete(productId: string) {
    const resp = await productsInstance.delete(`/${productId}`);
    return resp.data;
  }
}

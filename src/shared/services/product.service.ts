import { productsInstance } from "@/libs/axios";
import { ICategory } from "@/shared/interfaces/category";
import { ICreateProductParams } from "../interfaces/product-params";
import { IProductDTO } from "../interfaces/product";

export class ProductService {
  static async getAll() {
    const resp = await productsInstance.get("");
    return resp.data as IProductDTO[];
  }

  static async create(params: ICreateProductParams) {
    const { data, image } = params;
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("active", String(data.active));
    formData.append("features", JSON.stringify(data.features));
    formData.append("categoryId", data.categoryId);
    formData.append("image", image);

    const resp = await productsInstance.post("", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return resp.data as ICategory;
  }

  static async edit(
    categoryId: string,
    data: { name: string; active: boolean }
  ) {
    const resp = await productsInstance.patch(`/${categoryId}`, {});
    return resp.data as ICategory;
  }

  static async delete(categoryId: string) {
    const resp = await productsInstance.delete(`/${categoryId}`);
    return resp.data;
  }
}

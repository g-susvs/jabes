import { categoryInstance } from "@/libs/axios";
import { ICategory } from "@/shared/interfaces/category";
import { IFindParams } from "../interfaces/find-params";

export class CategoryService {
  static async getAll(findParams?: IFindParams) {
    const resp = await categoryInstance.get("", {
      params: findParams,
    });
    return resp.data as ICategory[];
  }

  static async create(data: { name: string; active: boolean }) {
    const resp = await categoryInstance.post("", data);
    return resp.data as ICategory;
  }

  static async edit(
    categoryId: string,
    data: { name: string; active: boolean }
  ) {
    const resp = await categoryInstance.patch(`/${categoryId}`, data);
    return resp.data as ICategory;
  }

  static async delete(categoryId: string) {
    const resp = await categoryInstance.delete(`/${categoryId}`);
    return resp.data;
  }
}

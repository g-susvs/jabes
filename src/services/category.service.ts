import { categoryInstance } from "@/libs/axios";
import { ICategory } from "@/shared/interfaces/category";

export class CategoryService {
  static async getAll() {
    const resp = await categoryInstance.get("");
    return resp.data as ICategory[];
  }
}

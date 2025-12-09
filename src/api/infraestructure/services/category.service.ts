import { CategoryRepository } from "../repositories/category.repository";
import { ICategory, ICreateCategoryDTO } from "@/shared/interfaces/category";
import { IFindParams } from "@/shared/interfaces/find-params";
import { v4 as uuid } from "uuid";

export class CategoryAppService {
  static async getAll(findParams?: IFindParams) {
    return CategoryRepository.getAll(findParams);
  }

  static async findById(categoryId: string) {
    return CategoryRepository.findById(categoryId);
  }

  static async create(data: ICreateCategoryDTO) {
    const dataToCreate: ICategory = {
      categoryId: uuid(),
      name: data.name,
      active: data.active,
    };
    const category = await CategoryRepository.create(dataToCreate);
    return category;
  }

  static async updateById(
    categoryId: string,
    data: Partial<ICreateCategoryDTO>
  ) {
    return CategoryRepository.updateById(categoryId, data);
  }

  static async deleteById(categoryId: string) {
    return CategoryRepository.deleteById(categoryId);
  }
}

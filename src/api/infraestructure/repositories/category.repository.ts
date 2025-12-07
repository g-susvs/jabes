import Category from "@/api/datasource/mongo/models/category";
import { dbConnect } from "@/api/datasource/mongo/mongodb";
import { ICategory } from "@/shared/interfaces/category";

export class CategoryRepository {
  static async getAll() {
    await dbConnect();
    return await Category.find<ICategory>().lean();
  }

  static async findById(categoryId: string) {
    await dbConnect();
    return Category.findOne({ categoryId });
  }

  static async create(data: ICategory) {
    await dbConnect();
    return Category.create(data);
  }

  static async updateById(categoryId: string, data: Partial<ICategory>) {
    await dbConnect();
    return Category.findOneAndUpdate({ categoryId }, data, { new: true });
  }

  static async deleteById(categoryId: string) {
    await dbConnect();
    return Category.deleteOne({ categoryId });
  }
}

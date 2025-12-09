import Category from "@/api/datasource/mongo/models/category";
import { dbConnect } from "@/api/datasource/mongo/mongodb";
import { ICategory } from "@/shared/interfaces/category";
import { IFindParams } from "@/shared/interfaces/find-params";

export class CategoryRepository {
  static async getAll(findParams?: IFindParams) {
    await dbConnect();

    const query = Category.find<ICategory>().lean();

    if (findParams?.page !== undefined && findParams?.size !== undefined) {
      const page = Number(findParams.page);
      const size = Number(findParams.size);

      query.limit(size).skip((page - 1) * size);
    }

    return await query;
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

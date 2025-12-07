import Product from "@/api/datasource/mongo/models/product";
import { dbConnect } from "@/api/datasource/mongo/mongodb";
import { IProduct } from "@/shared/interfaces/product";

export class ProductRespository {
  static async getAll() {
    await dbConnect();
    return await Product.find<IProduct>().lean();
  }

  static async findById(productId: string) {
    await dbConnect();
    return await Product.findOne({ productId: productId });
  }

  static async create(data: IProduct) {
    await dbConnect();
    return await Product.create(data);
  }

  static async updateById(productId: string, data: Partial<IProduct>) {
    await dbConnect();
    return await Product.findOneAndUpdate({ productId }, data, {
      new: true,
    });
  }

  static async deleteById(productId: string) {
    await dbConnect();
    return await Product.deleteOne({ productId: productId });
  }
}

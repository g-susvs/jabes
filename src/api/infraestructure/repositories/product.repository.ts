import Product from "@/api/datasource/mongo/models/product";
import { dbConnect } from "@/api/datasource/mongo/mongodb";
import { IFindParams } from "@/shared/interfaces/find-params";
import { IProduct } from "@/shared/interfaces/product";

export class ProductRespository {
  static async getAll(findParams?: IFindParams) {
    await dbConnect();

    const query = Product.find<IProduct>().lean();

    if (findParams?.page !== undefined && findParams?.size !== undefined) {
      const page = Number(findParams.page);
      const size = Number(findParams.size);

      query.limit(size).skip((page - 1) * size);
    }

    return await query;
  }

  static async findById(productId: string) {
    await dbConnect();
    return (await Product.findOne({ productId: productId })) as IProduct;
  }

  static async findBySlug(productSlug: string) {
    await dbConnect();
    return (await Product.findOne({ slug: productSlug })) as IProduct;
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

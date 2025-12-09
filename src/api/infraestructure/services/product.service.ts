import { v4 as uuid } from "uuid";
import {
  deleteFileService,
  updateFileService,
} from "@/shared/services/upload-file.service";
import { ICreateProductDTO, IProduct } from "@/shared/interfaces/product";
import { ProductRespository } from "../repositories/product.repository";
import { CategoryRepository } from "../repositories/category.repository";
import { ICategory } from "@/shared/interfaces/category";
import { IFindParams } from "@/shared/interfaces/find-params";

export class ProductAppService {
  static async getAll(findParams?: IFindParams) {
    const [products, categories] = await Promise.all([
      ProductRespository.getAll(findParams),
      CategoryRepository.getAll(),
    ]);

    const categoriesMap = ProductAppService.buildCategoriesMap(
      categories as unknown as ICategory[]
    );

    const result = products.map((product) => ({
      ...product,
      category: categoriesMap.get(product.categoryId) || null,
    }));

    return result;
  }

  static async findById(productId: string) {
    return ProductRespository.findById(productId);
  }

  static async findBySlug(productSlug: string) {
    return ProductRespository.findBySlug(productSlug);
  }

  static async create(params: { data: ICreateProductDTO; image?: File }) {
    const { data, image } = params;
    let imgUrl = "";
    if (image) {
      imgUrl = (await updateFileService(image, "jabes/products")) ?? "";
    }

    const productToCreate: IProduct = {
      productId: uuid(),
      name: data.name,
      description: data.description,
      imgUrl,
      slug: ProductAppService.createSlug(data.name),
      features: ProductAppService.buildFeatures(data.features),
      active: data.active,
      categoryId: data.categoryId,
    };

    const product = await ProductRespository.create(productToCreate);
    return product;
  }

  static async edit(params: {
    productId: string;
    data: Partial<ICreateProductDTO>;
    image?: File;
  }) {
    const { productId, data, image } = params;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataToUpdate: Record<string, any> = { ...data };

    // ---- Manejo del archivo ----
    const imageFile = image;
    if (imageFile && imageFile.size > 0) {
      const current = await ProductRespository.findById(productId);
      const url =
        (await updateFileService(
          imageFile,
          "jabes/products",
          current?.imgUrl
        )) ?? "";
      dataToUpdate.imgUrl = url;
    }

    // ---- Si vienen features, convertir al formato con id ----
    if (Array.isArray(data.features)) {
      dataToUpdate.features = data.features.map((t: string) => ({
        id: uuid(),
        text: t,
      }));
    }

    // ---- slug automático si solo vino name ----
    if (data.name) {
      dataToUpdate.slug = data.name.trim().toLowerCase().replace(/ /g, "-");
    }

    const updated = await ProductRespository.updateById(
      productId,
      dataToUpdate
    );
    return updated;
  }

  static async delete(productId: string) {
    const product = await ProductRespository.findById(productId);
    const result = await ProductRespository.deleteById(productId);

    const imagePathArr = product.imgUrl?.split("/") ?? [];
    const imgPublicId = imagePathArr[imagePathArr?.length - 1].split(".")[0];
    await deleteFileService("jabes/products", imgPublicId);

    return result;
  }

  //helpers
  static buildFeatures(features: string[]) {
    return features.map((text) => ({
      id: uuid(),
      text,
    }));
  }

  static createSlug(name: string) {
    return name?.trim().toLowerCase().split(" ").join("-");
  }

  static buildCategoriesMap(categories: ICategory[]) {
    return new Map(categories.map((c) => [c.categoryId, c]));
  }
}

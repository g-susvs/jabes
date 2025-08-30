import { dbConnect } from "@/libs/mongodb";
import Product from "@/models/product";
import { ICreateProductDTO, IProduct } from "@/shared/interfaces/product";
import { updateFileService } from "@/shared/services/upload-file.service";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function GET() {
  await dbConnect();
  const products = await Product.find();
  return NextResponse.json(products, { status: 201 });
}

export async function POST(request: Request) {
  await dbConnect();

  const formData = await request.formData();
  const rawData = formData.get("data");
  const data =
    typeof rawData === "string"
      ? (JSON.parse(rawData) as ICreateProductDTO)
      : ({} as ICreateProductDTO);

  const imageFile = formData.get("image") as File | null;
  const imgUrl = (await updateFileService(imageFile, "jabes/products")) ?? "";

  const features = buildFeatures(data.features ?? []);
  const slug = createSlug(data.name);

  const dataToCreate: IProduct = {
    productId: uuid(),
    name: data.name,
    description: data.description,
    imgUrl: imgUrl,
    slug,
    features,
    active: true,
    categoryId: data.categoryId,
  };

  const category = await Product.create(dataToCreate);
  return NextResponse.json(category, { status: 201 });
}

function buildFeatures(features: string[]) {
  return features.map((feature) => {
    return {
      id: uuid(),
      text: feature,
    };
  });
}

function createSlug(name: string) {
  return name.toLowerCase().split(" ").join("-");
}

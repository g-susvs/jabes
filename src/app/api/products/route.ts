import { dbConnect } from "@/libs/mongodb";
import Product from "@/models/product";
import { ICreateProductDTO, IProduct } from "@/shared/interfaces/product";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function GET() {
  await dbConnect();
  const products = await Product.find();
  return NextResponse.json(products, { status: 201 });
}

export async function POST(request: Request) {
  await dbConnect();
  const body = (await request.json()) as ICreateProductDTO;

  const features = buildFeatures(body.features ?? []);
  const slug = createSlug(body.name);

  const dataToCreate: IProduct = {
    productId: uuid(),
    name: body.name,
    description: body.description,
    imgUrl: "image:path",
    slug,
    features,
    active: true,
    categoryId: body.categoryId,
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

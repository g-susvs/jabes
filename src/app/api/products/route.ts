import { dbConnect } from "@/libs/mongodb";
import Category from "@/models/category";
import Product from "@/models/product";
import { IProduct } from "@/shared/interfaces/product";
import { updateFileService } from "@/shared/services/upload-file.service";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function GET() {
  await dbConnect();

  const [products, categories] = await Promise.all([
    Product.find(),
    Category.find(),
  ]);

  const categoriesMap = buildCategoriesMap(categories);

  const result = products.map((product) => ({
    ...product.toObject(),
    category: categoriesMap.get(product.categoryId) || null,
  }));

  return NextResponse.json(result, { status: 201 });
}

export async function POST(request: Request) {
  await dbConnect();

  const formData = await request.formData();
  const parsed = parseFormData(formData);

  const imgUrl =
    (await updateFileService(parsed.imageFile, "jabes/products")) ?? "";

  const productToCreate: IProduct = {
    productId: uuid(),
    name: parsed.name,
    description: parsed.description,
    imgUrl,
    slug: createSlug(parsed.name),
    features: buildFeatures(parsed.features),
    active: parsed.active,
    categoryId: parsed.categoryId,
  };

  const product = await Product.create(productToCreate);
  return NextResponse.json(product, { status: 201 });
}

// ---------- Helpers ----------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildCategoriesMap(categories: any[]) {
  return new Map(categories.map((c) => [c.categoryId, c.toObject()]));
}

function buildFeatures(features: string[]) {
  return features.map((text) => ({
    id: uuid(),
    text,
  }));
}

function createSlug(name: string) {
  return name?.trim().toLowerCase().split(" ").join("-");
}

/**
 * Parsea todos los campos del multipart/form-data
 */
function parseFormData(formData: FormData) {
  const imageFile = formData.get("image") as File | null;

  const name = String(formData.get("name") || "");
  const description = String(formData.get("description") || "");
  const categoryId = String(formData.get("categoryId") || "");

  const activeRaw = formData.get("active");
  const active =
    activeRaw === "true" || activeRaw === "1" || activeRaw === "on";

  let features: string[] = [];
  try {
    features = JSON.parse(String(formData.get("features") ?? "[]"));
  } catch {
    features = [];
  }

  return {
    name,
    description,
    active,
    categoryId,
    features,
    imageFile,
  };
}

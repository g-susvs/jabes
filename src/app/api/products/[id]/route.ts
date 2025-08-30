import { dbConnect } from "@/libs/mongodb";
import Product from "@/models/product";
import { updateFileService } from "@/shared/services/upload-file.service";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id: productId } = await params;
  const product = await Product.findOne({ productId: productId });
  return NextResponse.json(product, { status: 201 });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id: productId } = await params;

  const formData = await request.formData();
  const rawData = formData.get("data");
  const data = typeof rawData === "string" ? JSON.parse(rawData) : {};

  const imageFile = formData.get("image") as File | null;
  if (imageFile) {
    const product = await Product.findOne({ productId: productId });
    const imgUrl =
      (await updateFileService(imageFile, "jabes/products", product.imgUrl)) ??
      "";

    data["imgUrl"] = imgUrl;
  }

  const product = await Product.findOneAndUpdate(
    { productId: productId },
    data,
    { new: true }
  );
  return NextResponse.json(product, { status: 201 });
}

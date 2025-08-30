import { dbConnect } from "@/libs/mongodb";
import Product from "@/models/product";
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
  const body = await request.json();

  const product = await Product.findOneAndUpdate(
    { productId: productId },
    body,
    { new: true }
  );
  return NextResponse.json(product, { status: 201 });
}

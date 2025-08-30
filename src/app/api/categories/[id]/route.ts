import { dbConnect } from "@/libs/mongodb";
import Category from "@/models/category";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id: categoryId } = await params;
  const body = await request.json();

  const category = await Category.findOneAndUpdate(
    { categoryId: categoryId },
    body,
    { new: true }
  );
  return NextResponse.json(category, { status: 201 });
}

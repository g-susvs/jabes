import { dbConnect } from "@/libs/mongodb";
import Category from "@/models/category";
import { ICategory, ICreateCategoryDTO } from "@/shared/interfaces/category";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function GET() {
  await dbConnect();
  const categories = await Category.find();
  return NextResponse.json(categories, { status: 201 });
}

export async function POST(request: Request) {
  await dbConnect();
  const body = (await request.json()) as ICreateCategoryDTO;

  const dataToCreate: ICategory = {
    categoryId: uuid(),
    name: body.name,
    active: body.active,
  };

  const category = await Category.create(dataToCreate);
  return NextResponse.json(category, { status: 201 });
}

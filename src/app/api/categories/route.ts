import { ICreateCategoryDTO } from "@/shared/interfaces/category";
import { NextResponse } from "next/server";
import { CategoryAppService } from "@/api/infraestructure/services/category.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page"));
  const size = Number(searchParams.get("size"));
  const result = await CategoryAppService.getAll({
    page,
    size,
  });
  return NextResponse.json(result, { status: 201 });
}

export async function POST(request: Request) {
  const body = (await request.json()) as ICreateCategoryDTO;
  const category = await CategoryAppService.create(body);
  return NextResponse.json(category, { status: 201 });
}

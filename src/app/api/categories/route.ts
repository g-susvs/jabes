import { ICreateCategoryDTO } from "@/shared/interfaces/category";
import { NextResponse } from "next/server";
import { CategoryAppService } from "@/api/infraestructure/services/category.service";

export async function GET() {
  const result = await CategoryAppService.getAll();
  return NextResponse.json(result, { status: 201 });
}

export async function POST(request: Request) {
  const body = (await request.json()) as ICreateCategoryDTO;
  const category = await CategoryAppService.create(body);
  return NextResponse.json(category, { status: 201 });
}

import { NextResponse } from "next/server";
import { ICreateCategoryDTO } from "@/shared/interfaces/category";
import { CategoryAppService } from "@/api/infraestructure/services/category.service";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id: categoryId } = await params;
  const body = (await request.json()) as Partial<ICreateCategoryDTO>;

  const category = await CategoryAppService.updateById(categoryId, body);
  return NextResponse.json(category, { status: 201 });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { id: categoryId } = await params;

  const category = await CategoryAppService.deleteById(categoryId);
  return NextResponse.json(category, { status: 201 });
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { ICreateCategoryDTO } from "@/shared/interfaces/category";
import { CategoryAppService } from "@/api/infraestructure/services/category.service";
import { verifyJWT } from "@/api/infraestructure/middlewares/verify-jwt";

export async function PATCH(request: Request, { params }: any) {
  try {
    await verifyJWT(request);
    
    const { id: categoryId } = params;
    const body = (await request.json()) as Partial<ICreateCategoryDTO>;

    const category = await CategoryAppService.updateById(categoryId, body);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 401 }
    );
  }
}

export async function DELETE(request: Request, { params }: any) {
  try {
    await verifyJWT(request);

    const { id: categoryId } = params;
    const category = await CategoryAppService.deleteById(categoryId);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 401 }
    );
  }
}

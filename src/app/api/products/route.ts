import { NextResponse } from "next/server";
import { ProductAppService } from "@/api/infraestructure/services/product.service";
import { parseFormDataToJson } from "@/shared/utils/parseFormData";
import { ICreateProductDTO } from "@/shared/interfaces/product";
import { verifyJWT } from "@/api/infraestructure/middlewares/verify-jwt";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page"));
  const size = Number(searchParams.get("size"));
  const categoryId = searchParams.get("categoryId") ?? "";
  const result = await ProductAppService.getAll({
    page,
    size,
    categoryId,
  });
  return NextResponse.json(result, { status: 201 });
}

export async function POST(request: Request) {
  try {
    await verifyJWT(request);

    const formData = await request.formData();
    const data = parseFormDataToJson<ICreateProductDTO>(formData);

    const result = await ProductAppService.create({
      data: data,
      image: (formData.get("image") as File) ?? undefined,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 401 }
    );
  }
}

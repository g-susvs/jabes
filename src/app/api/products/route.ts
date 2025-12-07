import { dbConnect } from "@/api/datasource/mongo/mongodb";
import { NextResponse } from "next/server";
import { ProductAppService } from "@/api/infraestructure/services/product.service";
import { parseFormDataToJson } from "@/shared/utils/parseFormData";
import { ICreateProductDTO } from "@/shared/interfaces/product";

export async function GET() {
  const result = await ProductAppService.getAll();
  return NextResponse.json(result, { status: 201 });
}

export async function POST(request: Request) {
  await dbConnect();

  const formData = await request.formData();
  const data = parseFormDataToJson<ICreateProductDTO>(formData);

  const result = await ProductAppService.create({
    data: data,
    image: (formData.get("image") as File) ?? undefined,
  });

  return NextResponse.json(result, { status: 201 });
}

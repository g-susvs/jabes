import { NextResponse } from "next/server";
import { dbConnect } from "@/api/datasource/mongo/mongodb";
import { parseFormDataToJson } from "@/shared/utils/parseFormData";
import { editProductValidator } from "@/api/infraestructure/validators/product.validators";
import { ProductAppService } from "@/api/infraestructure/services/product.service";
import { ICreateProductDTO } from "@/shared/interfaces/product";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { id: productId } = await params;
  const product = await ProductAppService.findById(productId);
  return NextResponse.json(product, { status: 201 });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id: productId } = await params;

  const formData = await request.formData();

  // --- Convertimos todo excepto archivos ---
  const data = parseFormDataToJson<Partial<ICreateProductDTO>>(formData);

  // --- Validación
  const valid = editProductValidator(data);
  if (!valid) {
    return NextResponse.json(
      { errors: editProductValidator.errors },
      { status: 400 }
    );
  }

  const updated = await ProductAppService.edit({
    productId,
    data,
    image: (formData.get("image") as File) ?? undefined,
  });

  return NextResponse.json(updated, { status: 200 });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id: productId } = await params;

  const product = await ProductAppService.delete(productId);
  return NextResponse.json(product, { status: 201 });
}

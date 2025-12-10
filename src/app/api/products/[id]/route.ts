/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { dbConnect } from "@/api/datasource/mongo/mongodb";
import { parseFormDataToJson } from "@/shared/utils/parseFormData";
import { editProductValidator } from "@/api/infraestructure/validators/product.validators";
import { ProductAppService } from "@/api/infraestructure/services/product.service";
import { ICreateProductDTO } from "@/shared/interfaces/product";
import { verifyJWT } from "@/api/infraestructure/middlewares/verify-jwt";

export async function GET(_request: Request, { params }: any) {
  const { id: productId } = params;
  const product = await ProductAppService.findById(productId);
  return NextResponse.json(product, { status: 201 });
}

export async function PATCH(request: Request, { params }: any) {
  try {
    verifyJWT(request);
    const { id: productId } = params;

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
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 401 }
    );
  }
}

export async function DELETE(request: Request, { params }: any) {
  try {
    verifyJWT(request);
    const { id: productId } = params;

    const product = await ProductAppService.delete(productId);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 401 }
    );
  }
}

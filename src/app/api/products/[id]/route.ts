import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { dbConnect } from "@/libs/mongodb";
import Product from "@/models/product";
import { updateFileService } from "@/shared/services/upload-file.service";
import { parseFormDataToJson } from "@/shared/utils/parseFormData";
import { editProductValidator } from "@/shared/validators/product.validators";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id: productId } = await params;
  const product = await Product.findOne({ productId: productId });
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
  const json = parseFormDataToJson(formData);

  // --- Validación 
  const valid = editProductValidator(json);
  if (!valid) {
    return NextResponse.json(
      { errors: editProductValidator.errors },
      { status: 400 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: Record<string, any> = { ...json };

  // ---- Manejo del archivo ----
  const imageFile = formData.get("image") as File | null;
  if (imageFile && imageFile.size > 0) {
    const current = await Product.findOne({ productId });
    const url =
      (await updateFileService(imageFile, "jabes/products", current?.imgUrl)) ??
      "";
    data.imgUrl = url;
  }

  // ---- Si vienen features, convertir al formato con id ----
  if (Array.isArray(json.features)) {
    data.features = json.features.map((t: string) => ({
      id: uuid(),
      text: t,
    }));
  }

  // ---- slug automático si solo vino name ----
  if (json.name && !json.slug) {
    data.slug = json.name.trim().toLowerCase().replace(/ /g, "-");
  }

  const updated = await Product.findOneAndUpdate({ productId }, data, {
    new: true,
  });

  return NextResponse.json(updated, { status: 200 });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id: productId } = await params;

  const category = await Product.deleteOne({ productId: productId });
  return NextResponse.json(category, { status: 201 });
}

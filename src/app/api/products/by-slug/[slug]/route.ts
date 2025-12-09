import { ProductAppService } from "@/api/infraestructure/services/product.service";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = await params;
  const product = await ProductAppService.findBySlug(slug);
  return NextResponse.json(product, { status: 201 });
}

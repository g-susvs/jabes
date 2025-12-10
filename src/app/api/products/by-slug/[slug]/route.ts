/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductAppService } from "@/api/infraestructure/services/product.service";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: any
) {
  const { slug } = params;
  const product = await ProductAppService.findBySlug(slug);
  return NextResponse.json(product, { status: 201 });
}

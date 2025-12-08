// middleware.ts en la raíz del proyecto
import { verifyToken } from "@/shared/helpers/verify-jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api")) {
    const token = req.headers.get("authorization");

    if (!token) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    try {
      await verifyToken(token);
      return NextResponse.next();
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Token inválido" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/products/:path*", "/api/categories/:path*"],
  runtime: "nodejs",
};

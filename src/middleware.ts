// middleware.ts en la raíz del proyecto
import { verifyToken } from "@/shared/helpers/verify-jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1️⃣ Proteger rutas de ADMIN (UI)
  if (pathname.startsWith("/admin")) {
    const token =
      req.cookies.get("jabes-authorization")?.value ||
      req.headers.get("authorization");

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    try {
      await verifyToken(token);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // 2️⃣ Proteger endpoints API solo en métodos sensibles
  if (pathname.startsWith("/api")) {
    const protectedMethods = ["POST", "PUT", "PATCH", "DELETE"];

    if (protectedMethods.includes(req.method)) {
      const token = req.headers.get("authorization");

      if (!token) {
        return NextResponse.json({ message: "No autorizado" }, { status: 401 });
      }

      try {
        await verifyToken(token);
        return NextResponse.next();
      } catch {
        return NextResponse.json(
          { message: "Token inválido" },
          { status: 401 }
        );
      }
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/products/:path*",
    "/api/categories/:path*",

    // proteger módulo admin
    "/admin/:path*",
  ],
  runtime: "nodejs",
};

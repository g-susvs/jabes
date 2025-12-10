import { verifyToken } from "@/shared/helpers/verify-jwt";

export async function verifyJWT(request: Request) {
  const token = request.headers.get("authorization");
  if (!token) {
    throw new Error("No autorizado");
  }
  await verifyToken(token);
}

import { environment } from "@/config/env/environment";
import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
  email: string;
  role?: string;
}

export const verifyToken = async (token: string) => {
  const SECRET_KEY = environment.jwt.secret;
  return  jwt.verify(token, SECRET_KEY);
};

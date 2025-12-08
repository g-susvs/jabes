import { environment } from "@/config/env/environment";
import jwt from "jsonwebtoken";

const SECRET_KEY = environment.jwt.secret;

export interface JwtPayload {
  userId: string;
  email: string;
  role?: string;
}

export const verifyToken = async (token: string) => {
  return  jwt.verify(token, SECRET_KEY);
};

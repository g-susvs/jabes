import { environment } from "@/config/env/environment";
import jwt from "jsonwebtoken";

const SECRET_KEY = environment.jwt.secret;

export interface JwtPayload {
  userId: string;
  email: string;
  role?: string;
}

export const verifyToken = async (token: string) => {
  return new Promise((resolve) => {
      jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded);
      });
    });
};

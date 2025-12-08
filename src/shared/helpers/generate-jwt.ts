import { environment } from "@/config/env/environment";
import jwt from "jsonwebtoken";

export const generateJWT = (id: string) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id },
      environment.jwt.secret,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) reject(err);

        resolve(token);
      }
    );
  });
};

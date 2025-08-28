import jwt from "jsonwebtoken";

export const generateJWT = (id: string) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id },
      "secreorprivatekey",
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

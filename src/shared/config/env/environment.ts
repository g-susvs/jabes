import { IEnvironment } from "./interface";

export const environment: IEnvironment = {
  mongoUri: process.env.MONGODB_URI ?? "",
  externalServices: {
    cloudinary: {
      name: process.env.CLOUDINARY_CLOUD_NAME ?? "",
      apiKey: process.env.CLOUDINARY_API_KEY ?? "",
      apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
    },
  },
};

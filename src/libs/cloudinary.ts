import { environment } from "@/config/env/environment";
import { v2 as cloudinary } from "cloudinary";

export const getCloudinary = () => {
  return cloudinary.config({
    cloud_name: environment.externalServices.cloudinary.name,
    api_key: environment.externalServices.cloudinary.apiKey,
    api_secret: environment.externalServices.cloudinary.apiSecret,
  });
};
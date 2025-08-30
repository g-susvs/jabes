import cloudinary from "@/libs/cloudinary";
import { v4 as uuid } from "uuid";

export const updateFileService = async (
  file: File | null,
  folder: string,
  oldUrl?: string
) => {
  let newUrl: string | null = null;

  try {
    if (oldUrl) {
      const parts = oldUrl.split("/");
      const filename = parts[parts.length - 1];
      const publicId = `${folder}/${filename.split(".")[0]}`;

      await cloudinary.uploader.destroy(publicId);
    }

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResponse = await new Promise<unknown>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder,
              public_id: uuid(),
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          )
          .end(buffer);
      });

      newUrl = (uploadResponse as { secure_url: string }).secure_url;
    }

    return newUrl;
  } catch (error) {
    console.error("Error actualizando imagen en Cloudinary:", error);
    throw error;
  }
};

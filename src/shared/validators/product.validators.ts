import { ajv } from "@/libs/ajv.";
import { productPatchSchema } from "../schemas/create-product.schema";

export const editProductValidator = ajv.compile(productPatchSchema);

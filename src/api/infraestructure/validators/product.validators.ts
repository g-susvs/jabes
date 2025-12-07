import { ajv } from "@/libs/ajv.";
import { productPatchSchema } from "../schemas/edit-product.schema";

export const editProductValidator = ajv.compile(productPatchSchema);

// schemas/productPatch.schema.ts
import { JSONSchemaType } from "ajv";

export interface ProductPatchDTO {
  name?: string;
  description?: string;
  categoryId?: string;
  active?: boolean;
  features?: string[];
  slug?: string;
}

export const productPatchSchema: JSONSchemaType<ProductPatchDTO> = {
  type: "object",
  properties: {
    name: { type: "string", nullable: true },
    description: { type: "string", nullable: true },
    categoryId: { type: "string", nullable: true },
    active: { type: "boolean", nullable: true },
    features: {
      type: "array",
      items: { type: "string" },
      nullable: true,
    },
    slug: { type: "string", nullable: true },
  },
  additionalProperties: false,
};

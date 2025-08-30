export interface IProduct {
  productId: string;
  name: string;
  description?: string;
  imgUrl?: string;
  slug: string;
  features?: { id: string; text: string }[];
  active: boolean;
  categoryId: string;
}

export interface ICreateProductDTO {
  name: string;
  description?: string;
  features?: string[];
  categoryId: string;
}

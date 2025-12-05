export interface ICreateProductParams {
  data: {
    name: string;
    description: string;
    active: boolean;
    features: string[];
    categoryId: string;
  };
  image: File;
}

export interface IEditProductParams {
  productId: string;
  data: {
    name?: string;
    description?: string;
    active?: boolean;
    features?: string[];
    categoryId?: string;
  };
  image: File;
}

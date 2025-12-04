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

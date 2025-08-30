export interface ICategory {
  categoryId: string;
  name: string;
  active: boolean;
}

export type ICreateCategoryDTO = Omit<ICategory, "categoryId" | "active">;

export interface IFindParams {
  page: number;
  size: number;
}

export interface IProductFindParams extends IFindParams {
  categoryId?: string;
}

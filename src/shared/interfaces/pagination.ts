export interface IPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface IPaginated<T> {
  items: T[];
  pagination: IPagination;
}

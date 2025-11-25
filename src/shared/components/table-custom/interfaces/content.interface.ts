export interface IFooterContent {
  size: string;
  page: {
    start: string;
    end: string;
  };
  sizes: number[];
}

export interface IEmptyResultsContent {
  title: string;
  description: string;
}

export interface ITableContent {
  footer: IFooterContent;
  emptyResults: IEmptyResultsContent;
}

export const enum SORT {
  ASC = 'asc',
  DESC = 'desc'
}

export interface IHeader {
  label: string;
  key: string;
  sortable: boolean;
}

export interface IPreferences {
  hasPagination?: boolean;
  radius?: boolean;
}

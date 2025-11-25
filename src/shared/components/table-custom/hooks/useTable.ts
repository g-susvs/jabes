import { useState } from 'react';
import { IHeader, SORT } from '../interfaces/table.interface';

export const useTable = (headers: IHeader[]) => {

  const [column, setColumn] = useState<string>('');
  const [direction, setDirection] = useState<SORT>(SORT.DESC);
  const [pages, setPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(
    10
  );

  const changeDirection = () => {
    if (direction === SORT.ASC) {
      setDirection(SORT.DESC);
    }
    if (direction === SORT.DESC) {
      setDirection(SORT.ASC);
    }
  };

  const onChangeColumn = (column: string) => {
    setColumn((prev) => {
      if (prev == column) {
        changeDirection();
        return prev;
      } else {
        setDirection(SORT.DESC);
        return column;
      }
    });
  };

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const onChangeSize = (newSize: number) => {
    setSize(newSize);
  };

  return {
    pages,
    page,
    size,
    column,
    direction,
    onChangeColumn,
    changeDirection,
    onChangePage,
    onChangeSize,
    setPages,
    setPage,
    headers,
  };
};

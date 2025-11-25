import { Pagination } from './pagination/pagination.component';
import { TableHead } from './table-head/table-head.component';
import { IHeader, IPreferences, SORT } from './interfaces/table.interface';
import { LoaderBody } from './table-body/loader-body';
import { EmptyData } from './table-body/empty-data';
import { TableRow } from './table-row/table-row.component';
import { TableCell } from './table-cell/table-cell.component';
import { TableBody } from './table-body/table-body.component';
import { clsx } from '@/libs/clsx';

interface IProps<T> {
  data: T[];
  props: {
    headers: IHeader[];
    pages: number;
    page: number;
    column: string;
    direction: SORT;
    size: number;
    onChangeColumn: (column: string) => void;
      onChangePage: (page: number) => void;
    onChangeSize: (size: number) => void;
  };
  isEmpty?: boolean;
  isLoading?: boolean;
  preferences?: IPreferences;
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableComponent = <T extends Record<string, any>>({
  data,
  props,
  preferences,
  isEmpty,
  isLoading,
  className,
}: IProps<T>) => {

  return (
    <div className={clsx(
      "bg-erieBlack-700 w-full",
      ( preferences && preferences.radius) && "rounded-lg",
      className
    )
    }>
      <div className={clsx(
        "w-full overflow-x-auto sm:overflow-x-auto ",
       ( preferences && preferences.radius) && "rounded-t-lg"
      )}>
        <table className="bg-erieBlack-700 w-full">
          <TableHead
            isEmpty={isEmpty}
            isLoading={isLoading}
            column={props.column}
            direction={props.direction}
            headers={props.headers}
            onChangeColumn={props.onChangeColumn}
          />
          {isLoading && <LoaderBody colSapn={props.headers.length} />}
          {/* {isEmpty && (
            <EmptyData
              content={componentcontent?.table.emptyResults}
              colSapn={props.headers.length}
            />
          )} */}
          {!isLoading && !isEmpty && (
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  {props.headers.map((header, index) => (
                    <TableCell key={index}>{item[header.key]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          )}
        </table>
      </div>
      {/* {
        preferences?.hasPagination && (
          <Box className={clsx(
            ( preferences && preferences.radius) && "rounded-b-lg"
          )}>
            <Pagination
              isEmpty={isEmpty}
              isLoading={isLoading}
              currentPage={props.page}
              currentSize={props.size}
              totalPages={props.pages}
              onPageChange={props.onChangePage}
              onSizeChange={props.onChangeSize}
              content={componentcontent?.table.footer}
              className="justify-between p-3"
            />
          </Box>
        )
      } */}
    </div>
  );
};

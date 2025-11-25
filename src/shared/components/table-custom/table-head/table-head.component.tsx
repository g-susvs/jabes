import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { IHeader, SORT } from "../interfaces/table.interface";
import { clsx } from "@/libs/clsx";

interface IProps {
  column: string;
  direction: SORT;
  headers: IHeader[];
  isLoading?: boolean;
  isEmpty?: boolean;
  onChangeColumn: (column: string) => void;
}

export const TableHead = ({
  direction,
  column,
  headers,
  isLoading,
  isEmpty,
  onChangeColumn,
}: IProps) => {
  const disabled = isLoading || isEmpty;

  const handleChangeColumn = (key: string, sortable: boolean) => {
    if (sortable) onChangeColumn(key);
  };

  return (
    <thead>
      <tr className="border-b-2 border-zinc-400">
        {headers.map((header, index) => (
          <th
            key={index}
            className={clsx(
              "text-zinc-700 font-semibold px-4 min-w-[140px] max-w-[auto] max-h-[72px]"
            )}
          >
            <div className="flex flex-row items-center gap-2 justify-center">
              <span className="text-xs line-clamp-3">{header.label}</span>
              {header.sortable && (
                <button
                  className={clsx(
                    "w-6 h-6 relative rounded-md cursor-pointer transition-all p-2",
                    disabled && "disabled:opacity-50 hover:bg-primary-700"
                  )}
                  disabled={disabled}
                  onClick={() =>
                    handleChangeColumn(header.key, header.sortable)
                  }
                >
                  <FiArrowDown
                    size={12}
                    className={clsx(
                      "absolute left-1 top-0",
                      column === header.key &&
                        direction === SORT.DESC &&
                        "text-primary-500"
                    )}
                  />
                  <FiArrowUp
                    size={12}
                    className={clsx(
                      "absolute bottom-0 left-2 top-2.5",
                      column === header.key &&
                        direction === SORT.ASC &&
                        "text-primary-500"
                    )}
                  />
                </button>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

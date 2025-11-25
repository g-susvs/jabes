import clsx from '../../../../libs/clsx';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Box } from '../../box/box.component';
import { generatePagination } from './genarate-pagination';
import { PaginationButton } from './pagination-button';
import { Select } from '../../select/select.component';
import { IFooterContent } from '../interfaces/content.interface';
import { BoxLoader } from '../../loader/box-loader';

interface IProps {
  currentPage: number;
  currentSize: number;
  totalPages: number;
  isLoading?: boolean;
  isEmpty?: boolean;
  onPageChange: (page: number) => void;
  onSizeChange: (size: number) => void;
  content?: IFooterContent;
  className?: string;
}

export const Pagination = ({
  currentPage,
  currentSize,
  totalPages,
  onPageChange,
  onSizeChange,
  isLoading,
  isEmpty,
  content,
  className
}: IProps) => {

  const pages = generatePagination(currentPage, totalPages);
  const handlePreviousPage = () => onPageChange(currentPage - 1);
  const handleNextPage = () => onPageChange(currentPage + 1);

  const handleOnPageChange = (page: string | number) => {
    if (isNaN(+page)) return;
    onPageChange(+page);
  }

  const disabled = isLoading || isEmpty;

  const pagesToSelector = Array.from({ length: totalPages }, (_, i) => ({ page: i + 1 }));
  const sizeSelector = content?.sizes.map((size) => ({ size })) ?? [];

  return (
    <Box className={clsx(
      "flex flex-wrap flex-col sm:flex-row items-center  gap-4",
      className
    )}>
      {
        !content
          ? <BoxLoader className="w-20" />
          : <Box className="flex items-center gap-4">
            <span className="whitespace-nowrap text-erieBlack-500" >{content?.size}</span>
            <Select
              options={sizeSelector}
              placeholder={currentSize.toString()}
              selectedItemKey={"size"}
              className="px-2"
              selectOption={(value) => onSizeChange(value.size)}
            />
          </Box>
      }
      <Box className="flex flex-wrap items-center justify-center gap-4 sm:gap-12">
        {
          !content
            ? <BoxLoader className="w-20" />
            : <Box className="flex items-center gap-2 text-erieBlack-500">
              <span>{content.page.start}</span>
              <Select
                options={pagesToSelector}
                placeholder={currentPage.toString()}
                selectedItemKey={"page"}
                className="px-2"
                selectOption={(value) => onPageChange(value.page)}
              />
              <span>{content.page.end}</span>
              <span>{totalPages}</span>
            </Box>
        }
        <Box className="flex gap-[4px]">
          <PaginationButton
            className={clsx(
              currentPage <= 1 && "hidden"
            )}
            disabled={disabled}
            title="Previous"
            aria-label="Previous"
            onClick={handlePreviousPage}
          >
            <IoIosArrowBack size={16} />
          </PaginationButton>
          {
            pages.map((page, index) => (
              <PaginationButton
                key={index}
                onClick={() => handleOnPageChange(page)}
                disabled={disabled}
                className={clsx(
                  currentPage === page && "text-black bg-white "
                )}
              >
                {page}
              </PaginationButton>
            ))
          }
          <PaginationButton
            disabled={currentPage >= totalPages || disabled}
            title="Next"
            aria-label="Next"
            onClick={handleNextPage}
          >
            <IoIosArrowForward size={16} />
          </PaginationButton>
        </Box>
      </Box>

    </Box>
  )
}

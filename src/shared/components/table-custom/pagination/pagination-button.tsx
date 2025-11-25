import { ButtonHTMLAttributes } from 'react';
import clsx from '../../../../libs/clsx';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export const PaginationButton = ({
  children,
  className,
  ...rest
}: IProps) => {
  return (
    <button
      {...rest}
      type="button"
      className={clsx(
        "size-8 flex items-center justify-center text-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none hover:bg-white hover:text-black focus:bg-white focus:text-black transition-all disabled:cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  )
}

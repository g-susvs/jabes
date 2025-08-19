import { clsx } from "@/libs/clsx";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

export const Container = ({ children, className }: IProps) => {
  return (
    <div className={clsx("max-w-[1100px] mx-auto ", className)}>{children}</div>
  );
};

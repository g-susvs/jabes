import { clsx } from "@/libs/clsx";

interface IProps {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
}
export const Button = ({ children, onClick, className, type, disabled }: IProps) => {
  return (
    <button
      className={clsx(
        "bg-primary-600 text-white font-medium px-4 py-2 rounded-md hover:bg-primary-700 transition",
        className
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

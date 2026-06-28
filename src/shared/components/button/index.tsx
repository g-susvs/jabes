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
        "bg-accent text-ink font-semibold px-5 py-2.5 rounded-full hover:bg-accent-dark hover:text-white transition-colors",
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

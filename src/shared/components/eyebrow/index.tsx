import { clsx } from "@/libs/clsx";

interface IProps {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span";
}

/** Label de sección en mayúsculas (eyebrow) sobre los títulos serif. */
export const Eyebrow = ({ children, className, as = "p" }: IProps) => {
  const Tag = as;
  return <Tag className={clsx("eyebrow", className)}>{children}</Tag>;
};

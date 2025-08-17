import { clsx } from "@/libs/clsx";
import styles from "./container.module.css";

interface IProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className }: IProps) => {
  return <div className={clsx(styles.container, className)}>{children}</div>;
};

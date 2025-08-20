import { clsx } from "@/libs/clsx";
import Link from "next/link";
import { Text } from "../text";

import styles from "./navbar.module.css";

interface IProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void
}

export const NavItem = ({ children, className, onClick, href = "" }: IProps) => {
  return (
    <Link
      href={href}
      className={clsx(styles.navMenuItem, className)}
       onClick={onClick} 
    >
      <Text>{children}</Text>
    </Link>
  );
};

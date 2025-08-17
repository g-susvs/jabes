import { clsx } from "@/libs/clsx";
import Link from "next/link";
import { Text } from "../text/text.component";

import styles from "./navbar.module.css";

interface IProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export const NavItem = ({ children, className, href = "" }: IProps) => {
  return (
    <Link
      href={href}
      className={clsx(styles.navMenuItem, className)}
    >
      <Text>{children}</Text>
    </Link>
  );
};

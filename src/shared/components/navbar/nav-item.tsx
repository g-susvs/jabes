import { usePathname } from "next/navigation";
import { clsx } from "@/libs/clsx";
import Link from "next/link";
import { Text } from "../text";

import styles from "./navbar.module.css";

interface IProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export const NavItem = ({
  children,
  className,
  onClick,
  href = "",
}: IProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(styles.navMenuItem, isActive && styles.active, className)}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
    >
      <Text>{children}</Text>
    </Link>
  );
};

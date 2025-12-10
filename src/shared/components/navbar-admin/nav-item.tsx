"use client";

import { clsx } from "@/libs/clsx";
import Link from "next/link";
import { Icon } from "../icon";
import { usePathname } from "next/navigation";

interface IProps {
  href: string;
  icon: string;
  label: string;
  className?: string;
  onClick?: () => void;
}
export const MenuItem = ({ href, icon, label, className, onClick }: IProps) => {
  const path = usePathname();

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={clsx(
          "group flex flex-row items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-600 transition-all",
          path !== href && "text-zinc-700",
          path === href && "bg-primary-600 text-white",
          className
        )}
      >
        <Icon iconName={icon} size={20} />
        <span className={clsx("paragraph-lg", "group-hover:texit-inherit")}>
          {label}
        </span>
      </button>
    );
  }

  return (
    <Link
      href={href}
      className={clsx(
        "group flex flex-row items-center gap-2 px-4 py-2 rounded-lg transition-all",
        path !== href && "text-zinc-700",
        path === href && "bg-primary-600 text-white",
        className
      )}
    >
      <Icon iconName={icon} size={20} />
      <span className={clsx("paragraph-lg", "group-hover:texit-inherit")}>
        {label}
      </span>
    </Link>
  );
};

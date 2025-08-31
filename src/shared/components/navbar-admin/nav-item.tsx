"use client";

import { clsx } from "@/libs/clsx";
import Link from "next/link";
import { Icon } from "../icon";
import { usePathname } from "next/navigation";

interface IProps {
  href: string;
  icon: string;
  label: string;
}
export const MenuItem = ({ href, icon, label }: IProps) => {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={clsx(
        "flex flex-row items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-600 hover:text-white transition-all",
        path !== href && "text-zinc-700",
        path === href && "bg-primary-600 text-white"
      )}
    >
      <Icon iconName={icon} size={20} />
      <span className="paragraph-lg">{label}</span>
    </Link>
  );
};

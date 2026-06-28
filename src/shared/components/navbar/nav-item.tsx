import { usePathname } from "next/navigation";
import { clsx } from "@/libs/clsx";
import Link from "next/link";

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
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={clsx(
        "text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors",
        isActive ? "text-accent-dark" : "text-ink/70 hover:text-accent-dark",
        className,
      )}
    >
      {children}
    </Link>
  );
};

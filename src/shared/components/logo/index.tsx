import Link from "next/link";
import { LuLeaf } from "react-icons/lu";
import { clsx } from "@/libs/clsx";

interface IProps {
  href?: string;
  className?: string;
  /** Tono del wordmark: "dark" sobre fondos claros, "light" sobre fondos oscuros */
  tone?: "dark" | "light";
}

export const Logo = ({ href = "/", className, tone = "dark" }: IProps) => {
  return (
    <Link
      href={href}
      aria-label="Jabes — inicio"
      className={clsx("flex items-center gap-2", className)}
    >
      <span className="flex items-center justify-center text-accent">
        <LuLeaf size={26} strokeWidth={2.4} />
      </span>
      <span
        className={clsx(
          "heading-6 font-bold tracking-wide text-primary-700",
          tone === "light" ? "text-white" : "text-ink",
        )}
      >
        JABES
      </span>
    </Link>
  );
};

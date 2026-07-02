import Link from "next/link";
import { LuLeaf } from "react-icons/lu";
import { clsx } from "@/libs/clsx";
import Image from "next/image";

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
      className={clsx("flex items-center", className)}
    >
      <span className="flex items-center justify-center text-accent">
        {/* <LuLeaf size={26} strokeWidth={2.4} /> */}
        <Image
        src="/logo.png"
        alt="Jabes"
        width={54}
        height={54}
        className="block"
        />
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

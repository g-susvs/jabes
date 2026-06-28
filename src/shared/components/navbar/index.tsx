"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMenu, IoClose } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";

import { NavItem } from "./nav-item";
import { Logo } from "../logo";
import { Container } from "../container";
import { clsx } from "@/libs/clsx";
import { buildWhatsappUrl } from "@/shared/constants";

interface IProps {
  className?: string;
}

const links = [
  { label: "Inicio", link: "/home" },
  { label: "Servicios", link: "/services" },
  { label: "Productos", link: "/products" },
];

export const Navbar = ({ className }: IProps) => {
  const path = usePathname();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleToggleOpenDrawer = () => setOpenDrawer((prev) => !prev);

  useEffect(() => {
    setOpenDrawer(false);
  }, [path]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-line",
        className,
      )}
    >
      <Container className="px-4">
        <nav className="flex h-16 items-center justify-between">
          <Logo />

          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((item) => (
              <NavItem key={item.link} href={item.link}>
                {item.label}
              </NavItem>
            ))}
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-2">
            <Link
              href={buildWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-accent-dark hover:text-white"
            >
              <FaWhatsapp size={16} />
              <span>Contactar</span>
            </Link>

            <button
              className="md:hidden inline-flex items-center justify-center rounded-lg p-1.5 text-ink"
              onClick={handleToggleOpenDrawer}
              aria-label={openDrawer ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={openDrawer}
            >
              {openDrawer ? <IoClose size={26} /> : <IoMenu size={26} />}
            </button>
          </div>
        </nav>

        {/* Menú móvil */}
        {openDrawer && (
          <div className="md:hidden flex flex-col gap-1 pb-4">
            {links.map((item) => (
              <NavItem
                key={item.link}
                href={item.link}
                className="rounded-lg px-3 py-3 hover:bg-accent-soft"
              >
                {item.label}
              </NavItem>
            ))}
          </div>
        )}
      </Container>
    </header>
  );
};

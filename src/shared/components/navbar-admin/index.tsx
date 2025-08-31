"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { Container } from "../container";
import { clsx } from "@/libs/clsx";
import { MenuList } from "./menu-list";

interface IProps {
  className?: string;
}

export const NavbarAdmin = ({ className }: IProps) => {
  const path = usePathname();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleToggleOpenDrawer = () => setOpenDrawer(!openDrawer);

  useEffect(() => {
    setOpenDrawer(false);
  }, [path]);
  return (
    <nav className={clsx("relative", className)}>
      <Container className="flex flex-row justify-between items-center px-4 py-2">
        <button className="text-primary-600" onClick={handleToggleOpenDrawer}>
          {openDrawer ? <IoClose size={40} /> : <IoMenu size={40} />}
        </button>
        <span className="text-3xl font-semibold text-primary-500">JABES</span>
      </Container>
      <section
        className={clsx(
          "absolute top-0 left-0 w-full h-screen  transition-all",
          openDrawer && "bg-[#00000077]",
          !openDrawer && "bg-transparent hidden"
        )}
      >
        <div className="relative">
          <div
            className={clsx(
              "absolute top-0 left-0 bg-white max-w-[250px] w-full h-screen",
              !openDrawer && "ml-[100%]",
              openDrawer && "ml-[0%]"
            )}
          >
            <button
              className="text-primary-600"
              onClick={handleToggleOpenDrawer}
            >
              {openDrawer ? <IoClose size={40} /> : <IoMenu size={40} />}
            </button>
            <section className="mt-4 border-t-2 border-zinc-300 p-4">
              <MenuList />
            </section>
          </div>
        </div>
      </section>
    </nav>
  );
};

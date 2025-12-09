"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NavItem } from "./nav-item";
import { Text } from "../text";
import { IoMenu, IoClose } from "react-icons/io5";

import styles from "./navbar.module.css";
import { clsx } from "@/libs/clsx";
import { Container } from "../container";
import { usePathname } from "next/navigation";
import { environment } from "@/config/env/environment";

interface IProps {
  className?: string;
}

export const Navbar = ({ className }: IProps) => {
  const path = usePathname();
  const links = [
    { label: "INICIO", link: "/" },
    { label: "SERVICIOS", link: "/services" },
    { label: "PRODUCTOS", link: "/products" },
  ];
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleToggleOpenDrawer = () => setOpenDrawer(!openDrawer);

  useEffect(() => {
    setOpenDrawer(false);
  }, [path]);

  return (
    <header className={className}>
      <Container>
        <nav className={styles.navbar}>
          <button className={styles.drawer} onClick={handleToggleOpenDrawer}>
            {openDrawer ? <IoClose size={40} /> : <IoMenu size={40} />}
          </button>
          <span className={styles.logo}>JABES</span>
          <div className={clsx(styles.navMenu, !openDrawer && styles.none)}>
            {links.map((item, index) => (
              <NavItem key={index} href={item.link}>
                {item.label}
              </NavItem>
            ))}
            <Link
              href={`https://wa.me/${environment.contactPhone}?text=Hola%20quiero%20más%20información`}
              target="_blank"
              className={styles.navbarContactButton}
            >
              <Text>Contactar</Text>
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
};

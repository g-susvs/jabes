"use client";

import { useRouter } from "next/navigation";
import { MenuItem } from "./nav-item";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "MdOutlineDashboard" },
  { href: "/admin/products", label: "Productos", icon: "TbPlant" },
  { href: "/admin/categories", label: "Categorias", icon: "MdOutlineCategory" },
];

export const MenuList = () => {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = `jabes-authorization=; path=/; max-age=0;`;
    router.push("/auth/login");
  };

  return (
    <div className="flex flex-col gap-6">
      {links.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}
      <MenuItem
        href="#"
        icon="TbLogout2"
        label="Cerrar sesión"
        className="hover:bg-white hover:text-red-600"
        onClick={handleLogout}
      />
    </div>
  );
};

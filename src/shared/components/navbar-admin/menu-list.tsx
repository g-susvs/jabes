import { MenuItem } from "./nav-item";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "MdOutlineDashboard" },
  { href: "/admin/products", label: "Productos", icon: "TbPlant" },
  { href: "/admin/categories", label: "Categorias", icon: "MdOutlineCategory" },
];

export const MenuList = () => {
  return (
    <div className="flex flex-col gap-6">
      {links.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}
    </div>
  );
};

import Image from "next/image";
import { IProductDTO } from "@/shared/interfaces/product";
import { IProductDataAdapter } from "../../interfaces/product-data-adapter";
import { DropdownMenu } from "@/shared/components/dropdown";

export const codeDataAdapter = (
  items: IProductDTO[]
): IProductDataAdapter[] => {
  return items.map((item) => {
    return {
      image: (
        <Image
          width={100}
          height={100}
          src={item?.imgUrl ?? ""}
          alt=""
          className="w-[60px] h-[30px] mx-auto"
        />
      ),
      name: item.name,
      description: item?.description ?? "",
      category: item.category.name,
      status: <span>{item.active ? "activo" : "inactivo"}</span>,
      actions: (<DropdownMenu/>)
    };
  });
};

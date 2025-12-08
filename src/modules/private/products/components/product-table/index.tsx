import { SlOptionsVertical } from "react-icons/sl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/table/table";
import { IProductDTO } from "@/shared/interfaces/product";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ActiveLabel } from "@/modules/private/categories/components/active-label";

interface IProps {
  products: IProductDTO[];
  openEditModal: (product: IProductDTO) => void;
  openDeleteModal: (product: IProductDTO) => void;
}

export const ProductTable = ({
  products,
  openEditModal,
  openDeleteModal,
}: IProps) => {
  return (
    <>
      <div className="w-full">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>description</TableHead>
                <TableHead>category</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="flex justify-center items-center">
                      <div className="space-x-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.imgUrl ?? ""}
                          width={100}
                          height={100}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.category.name}</TableCell>
                    <TableCell>
                      <ActiveLabel active={product.active} />
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <SlOptionsVertical />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="shadow text-zinc-600 bg-white boder-2 border-zinc-600 w-[100px]"
                          >
                            <DropdownMenuItem
                              onClick={() => openEditModal(product)}
                              className="p-2 hover:bg-zinc-50 cursor-pointer"
                            >
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => openDeleteModal(product)}
                              className="text-red-600 p-2 hover:bg-zinc-50 cursor-pointer"
                            >
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

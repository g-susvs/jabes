"use client";

import { clsx } from "@/libs/clsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/table/table";
import { ICategory } from "@/shared/interfaces/category";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { SlOptionsVertical } from "react-icons/sl";
import { ActiveLabel } from "../active-label";

interface IProps {
  categories: ICategory[];
  className?: string;
  openDeleteMOdal: (category: ICategory) => void;
  openEditModal: (category: ICategory) => void;
}

export const CategoriesTable = ({
  className,
  categories,
  openDeleteMOdal,
  openEditModal,
}: IProps) => {
  return (
    <div className={clsx("w-full", className)}>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre de la categoría</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <ActiveLabel active={category.active} />
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SlOptionsVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="text-zinc-600 bg-white boder-2 border-zinc-600 w-[100px] shadow-2xl"
                        >
                          <DropdownMenuItem
                            className="p-2 hover:bg-zinc-200 hover:cursor-pointer"
                            onClick={() => openEditModal(category)}
                          >
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 p-2 hover:bg-zinc-200 hover:cursor-pointer"
                            onClick={() => openDeleteMOdal(category)}
                          >
                            Elimar
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
  );
};

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
import { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { ActiveLabel } from "../active-label";
import { EditCategoryModal } from "../edit-category-modal";
import { DeleteCategoryModal } from "../delete-category-modal";

interface IProps {
  categories: ICategory[];
  className?: string;
}

export const CategoriesTable = ({ className, categories }: IProps) => {
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const onOpenEditModal = (category: ICategory) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };
  
  const onOpenDeleteModal = (category: ICategory) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
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
                              onClick={() => onOpenEditModal(category)}
                            >
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600 p-2 hover:bg-zinc-200 hover:cursor-pointer"
                              onClick={() => onOpenDeleteModal(category)}
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

      <EditCategoryModal
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        category={selectedCategory}
      />

      <DeleteCategoryModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        selectedCategoryId={selectedCategory?.categoryId ?? ""}
      />
    </>
  );
};

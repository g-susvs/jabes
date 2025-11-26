"use client";

import { clsx } from "@/libs/clsx";
import { Button } from "@/shared/components/button";
import { Modal } from "@/shared/components/modal";
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
import { SubmitHandler, useForm } from "react-hook-form";
import { SlOptionsVertical } from "react-icons/sl";
import { ActiveLabel } from "../active-label";

interface IEditCategory {
  name: string;
  active: boolean;
}

interface IProps {
  categories: ICategory[];
  className?: string;
}

export const CategoriesTable = ({ className, categories }: IProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { handleSubmit, register } = useForm<IEditCategory>({
    defaultValues: {
      name: "",
      active: true,
    },
  });

  const onSubmit: SubmitHandler<IEditCategory> = (data) => {
    console.log(data);
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
                              onClick={() => setIsEditModalOpen(true)}
                            >
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600 p-2 hover:bg-zinc-200 hover:cursor-pointer"
                              onClick={() => setIsDeleteModalOpen(true)}
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

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h3 className="text-2xl mb-4">Editar categoría</h3>
        <form
          className="flex flex-col justify-start items-start gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            placeholder="Ingresa el nombre de la categoría"
            className="border p-2 rounded w-full"
            {...register("name")}
          />
          <label>
            <input type="checkbox" {...register("active")} />
            <span className="w-auto"> Activar categoría</span>
          </label>
          <div className="flex justify-between gap-2 w-full">
            <Button
              onClick={() => setIsEditModalOpen(false)}
              className="bg-red-800 hover:bg-red-900 transition-all"
            >
              Cancelar
            </Button>
            <Button type="submit" onClick={() => {}}>
              Editar
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <h3 className="text-2xl mb-4">
          ¿Estas seguro de eliminar la categoría?
        </h3>
        <div
          className="flex flex-col justify-start items-start gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p>Se eliminará permanentemente</p>

          <div className="flex justify-between gap-2 w-full">
            <Button
              onClick={() => setIsDeleteModalOpen(false)}
              className="bg-red-800 hover:bg-red-900 transition-all"
            >
              Cancelar
            </Button>
            <Button type="button" onClick={() => console.log("Eliminar")}>
              Si, estoy seguro
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

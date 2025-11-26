"use client";

import { Button } from "@/shared/components/button";
import { AdminPageLayout } from "../layouts/admin-page-layout";

import { CategoriesTable } from "./components/categories-table";
import { LuPlus } from "react-icons/lu";
import { useState } from "react";
import { Modal } from "@/shared/components/modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGetCategories } from "./hooks/useGetCategories";
import { useCreateCategory } from "./hooks/useCreateCategory";

interface ICreateCategory {
  name: string;
  active: boolean;
}

export const CategoriesPage = () => {
  const { data } = useGetCategories();
  const { onCreateCategory, isPending: isPendingCreate } = useCreateCategory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { handleSubmit, register, reset } = useForm<ICreateCategory>({
    defaultValues: {
      name: "",
      active: true,
    },
  });

  const onSubmit: SubmitHandler<ICreateCategory> = (data) =>
    onCreateCategory(data).finally(() => {
      reset();
      setIsModalOpen(false);
    });

  return (
    <AdminPageLayout title="Categorias">
      <main className="flex flex-col gap-4 items-start">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex justify-center items-center gap-2"
        >
          <LuPlus size={20} />
          <span>Añadir nueva categoría</span>
        </Button>
        {data && <CategoriesTable categories={data} />}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h3 className="text-2xl mb-4">Crea una nueva categoría</h3>
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
                onClick={() => setIsModalOpen(false)}
                disabled={isPendingCreate}
                className="bg-red-800 hover:bg-red-900 disabled:bg-zinc-600 transition-all"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isPendingCreate}
                className="disabled:bg-zinc-600"
              >
                Guardar
              </Button>
            </div>
          </form>
        </Modal>
      </main>
    </AdminPageLayout>
  );
};

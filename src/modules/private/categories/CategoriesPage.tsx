"use client";

import { Button } from "@/shared/components/button";
import { AdminPageLayout } from "../layouts/admin-page-layout";

import { CategoriesTable } from "./components/categories-table";
import { LuPlus } from "react-icons/lu";
import { useState } from "react";
import { useGetCategories } from "./hooks/useGetCategories";
import { CreateCategoryModal } from "./components/create-category-modal";

export const CategoriesPage = () => {
  const { data } = useGetCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <CreateCategoryModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </main>
    </AdminPageLayout>
  );
};

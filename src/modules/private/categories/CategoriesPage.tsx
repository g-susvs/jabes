"use client";

import { Button } from "@/shared/components/button";
import { AdminPageLayout } from "../layouts/admin-page-layout";

import { CategoriesTable } from "./components/categories-table";
import { LuPlus } from "react-icons/lu";
import { useState } from "react";
import { useGetCategories } from "./hooks/useGetCategories";
import { CreateCategoryModal } from "./components/create-category-modal";
import { DeleteCategoryModal } from "./components/delete-category-modal";
import { ICategory } from "@/shared/interfaces/category";
import { EditCategoryModal } from "./components/edit-category-modal";

export const CategoriesPage = () => {
  const { data } = useGetCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );

  const openDeleteModal = (category: ICategory) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };
  const openEditModal = (category: ICategory) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

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
        {data && (
          <CategoriesTable
            categories={data}
            openDeleteMOdal={openDeleteModal}
            openEditModal={openEditModal}
          />
        )}
        <CreateCategoryModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
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
      </main>
    </AdminPageLayout>
  );
};

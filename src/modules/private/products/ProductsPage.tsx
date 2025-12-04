"use client";

import { useState } from "react";
import { AdminPageLayout } from "../layouts/admin-page-layout";
import { ProductTable } from "./components/product-table";
import { Button } from "@/shared/components/button";
import { LuPlus } from "react-icons/lu";
import { CreateProductModal } from "./components/create-product-modal";
import { useGetProducts } from "./hooks/useGetProducts";

export const ProductsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useGetProducts();

  return (
    <AdminPageLayout title="Productos">
      <main className="flex flex-col gap-4 items-start">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex justify-center items-center gap-2"
        >
          <LuPlus size={20} />
          <span>Añadir nuevo producto</span>
        </Button>
        {data && <ProductTable products={data} />}
      </main>
      <CreateProductModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </AdminPageLayout>
  );
};

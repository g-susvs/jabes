"use client";

import { useState } from "react";
import { AdminPageLayout } from "../layouts/admin-page-layout";
import { ProductTable } from "./components/product-table";
import { Button } from "@/shared/components/button";
import { LuPlus } from "react-icons/lu";
import { CreateProductModal } from "./components/create-product-modal";
import { useGetProducts } from "./hooks/useGetProducts";
import { DeleteProductModal } from "./components/delete-product-modal";
import { EditProductModal } from "./components/edit-product-modal";
import { IProductDTO } from "@/shared/interfaces/product";

export const ProductsPage = () => {
  const { data } = useGetProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<IProductDTO | null>(
    null
  );

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = (product: IProductDTO) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (product: IProductDTO) => {
    setIsEditModalOpen(true);
    const productFind = data?.find(
      (item) => item.productId === product.productId
    );
    setSelectedProduct(productFind || null);
  };

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
        {data && (
          <ProductTable
            products={data}
            openDeleteModal={openDeleteModal}
            openEditModal={openEditModal}
          />
        )}
      </main>
      <CreateProductModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <DeleteProductModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        productId={selectedProduct?.productId ?? ""}
      />
      <EditProductModal
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        product={selectedProduct}
      />
    </AdminPageLayout>
  );
};

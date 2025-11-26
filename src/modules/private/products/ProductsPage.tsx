"use client";

import React from "react";
import { AdminPageLayout } from "../layouts/admin-page-layout";
import { ProductTable } from "./components/product-table";
import { Button } from "@/shared/components/button";
import { LuPlus } from "react-icons/lu";

export const ProductsPage = () => {
  return (
    <AdminPageLayout title="Productos">
      <main className="flex flex-col gap-4 items-start">
        <Button
          onClick={() => console.log("Añadir nuevo producto")}
          className="flex justify-center items-center gap-2"
        >
          <LuPlus size={20} />
          <span>Añadir nuevo producto</span>
        </Button>
        <ProductTable />
      </main>
    </AdminPageLayout>
  );
};

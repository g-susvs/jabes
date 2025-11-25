"use client";

import React from "react";
import { AdminPageLayout } from "../layouts/admin-page-layout";
import { ProductTable } from "./components/product-table";

export const ProductsPage = () => {
  return (
    <AdminPageLayout title="Productos">
      <ProductTable />
    </AdminPageLayout>
  );
};

import { AdminPageLayout } from "../layouts/admin-page-layout";

import { CategoriesTable } from "./components/categories-table";

export const CategoriesPage = () => {
  return (
    <AdminPageLayout title="Categorias">
      <CategoriesTable />
    </AdminPageLayout>
  );
};

import { CategoriesTable } from "../categories/components/categories-table";
import { AdminPageLayout } from "../layouts/admin-page-layout";
import { ProductTable } from "../products/components/product-table";

export const DashboardPage = () => {
  return (
    <AdminPageLayout title="Dashboard">
      <main className="flex flex-col gap-10">
        <section className="flex gap-10 flex-row w-full">
          <section className="w-[30%] flex gap-4">
            <div className="p-4 flex flex-col items-center text-primary-700 rounded-lg border-2 border-primary-700">
              <span className="heading-4 font-semibold">20</span>
              <span>Productos</span>
            </div>
            <div className="p-4 flex flex-col items-center text-blue-800 rounded-lg border-2 border-blue-800">
              <span className="heading-4 font-semibold">4</span>
              <span>Categorias</span>
            </div>
          </section>
          <CategoriesTable className="max-w-[70%]" />
        </section>
        {/*  */}
        <section>
          <ProductTable />
        </section>
      </main>
    </AdminPageLayout>
  );
};

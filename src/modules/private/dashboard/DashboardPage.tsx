import { AdminPageLayout } from "../layouts/admin-page-layout";

export const DashboardPage = () => {
  return (
    <AdminPageLayout title="Dashboard">
    <section className="flex flex-wrap gap-4">
      <div className="p-4 flex flex-col items-center text-primary-700 rounded-lg border-2 border-primary-700">
        <span className="heading-4 font-semibold">20</span>
        <span>Productos</span>
      </div>
      <div className="p-4 flex flex-col items-center text-blue-800 rounded-lg border-2 border-blue-800">
        <span className="heading-4 font-semibold">4</span>
        <span>Categorias</span>
      </div>
    </section>
    </AdminPageLayout>
  );
};

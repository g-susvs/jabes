import type { Metadata } from "next";
import { Navbar } from "@/shared/components/navbar";
import { Footer } from "@/shared/components/footer";
import { NotFoundPage } from "@/modules/public/not-found/NotFoundPage";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <NotFoundPage />
      </main>
      <Footer />
    </div>
  );
}

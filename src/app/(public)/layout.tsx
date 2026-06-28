import type { Metadata } from "next";
import "../../assets/styles/globals.css";
import { Navbar } from "@/shared/components/navbar";
import { Footer } from "@/shared/components/footer";
import { Providers } from "../providers";

// TODO: mover a CMS (Site Settings / SEO global)
export const metadata: Metadata = {
  title: {
    default: "Jabes — Vivero y Jardinería",
    template: "%s | Jabes",
  },
  description:
    "Vivero y jardinería Jabes. Plantas, diseño de jardines, mantenimiento y todo lo que necesitas para crear tu espacio verde.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </Providers>
  );
}

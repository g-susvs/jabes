import type { Metadata } from "next";
import "@/assets/styles/globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { environment } from "@/config/env/environment";

// Base para resolver canonical y og:image relativos a URLs absolutas.
export const metadata: Metadata = {
  metadataBase: new URL(environment.siteUrl),
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

"use client"
import { Hero } from "@/pages/home/components/hero/hero";
import { useTranslation } from "@/shared/hooks/useTranslation"

export default function HomePage() {
  const { t} = useTranslation();

  return (
    <div className="max-w-[1200px] m-auto">
      <Hero/>

      {/* Servicios Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("services.title")}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("services.subtitle")}</p>
          </div>
        
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("products.featuredTitle")}</h2>
            <p className="text-xl text-gray-600">{t("products.featuredSubtitle")}</p>
          </div>


         
        </div>
      </section>

    </div>
  )
}

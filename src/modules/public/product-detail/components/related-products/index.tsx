"use client";

import Image from "next/image";
import { Container } from "@/shared/components/container";
import { IRelatedProductsSection } from "../../interface/product-detail";
import { useRouter } from "next/navigation";

interface IProps {
  content: IRelatedProductsSection;
}

const relatedProducts = [
  {
    id: 1,
    name: "Fertilizante Universal 5kg",
    categoryLabel: "Fertilizantes y Abonos",
    categoryId: "1",
    description:
      "Fertilizante completo para todo tipo de plantas, con nutrientes balanceados",
    imgUrl: "/images/products/product-2.jpg",
    slug: "fertilizante-universal-5kg",
    features: [
      {
        id: "1",
        text: "Aporta macro y micronutrientes",
      },
      {
        id: "2",
        text: "Ideal para todo tipo de cultivos",
      },
      {
        id: "3",
        text: "Formato práctico de 5kg",
      },
    ],
  },
  {
    id: 2,
    name: "Sustrato para Plantas Premium",
    categoryLabel: "Tierras y Sustratos",
    categoryId: "2",
    description: "Mezcla especial para macetas con retención de humedad ideal",
    imgUrl: "/images/products/product-1.jpg",
    slug: "sustrato-para-plantas-premium",
    features: [
      {
        id: "1",
        text: "Alta retención de agua",
      },
      {
        id: "2",
        text: "Textura aireada que favorece raíces",
      },
      {
        id: "3",
        text: "Contiene compost natural",
      },
    ],
  },
  {
    id: 3,
    name: "Césped Natural en Rollo",
    categoryLabel: "Plantas y Grass",
    categoryId: "4",
    description:
      "Césped listo para instalar, de rápido enraizamiento y alta resistencia",
    imgUrl: "/images/products/product-1.jpg",
    slug: "cesped-natural-en-rollo",
    features: [
      {
        id: "1",
        text: "Fácil instalación",
      },
      {
        id: "2",
        text: "Rápido enraizamiento",
      },
      {
        id: "3",
        text: "Resistente al tránsito",
      },
    ],
  },
];

export const RelatedProductSection = ({ content }: IProps) => {
  const router = useRouter();

  const handleViewDetail = (slug: string) => router.push(`/products/${slug}`);

  return (
    <Container className="px-4 py-[100px]">
      <h2 className="heading-5 sm:heading-4 md:heading-3 font-semibold text-zinc-800">{content.title}</h2>
      <section className="flex flex-row gap-8 overflow-x-auto w-full mt-4 pb-4">
        {relatedProducts.map((product) => (
          <article
            key={product.id}
            className="flex min-w-[280px] max-w-[320px] flex-col gap-2 w-full object-cover overflow-hidden"
          >
            <figure className="w-full h-[231px] object-cover rounded-2xl overflow-hidden">
              <Image
                width={300}
                height={300}
                alt={product.name}
                src={product.imgUrl}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="flex flex-col justify-between flex-grow gap-2">
              <div>
                <span className="heading-5 text-zinc-800">{product.name}</span>
                <p className="paragraph-lg text-start text-zinc-600">
                  {product.description}
                </p>
              </div>
              <button
                className="w-max py-1 px-2 rounded-lg text-primary-600 border-1 border-primary-600"
                onClick={() => handleViewDetail(product.slug)}
              >
                <span>Ver detalles</span>
              </button>
            </div>
          </article>
        ))}
      </section>
    </Container>
  );
};

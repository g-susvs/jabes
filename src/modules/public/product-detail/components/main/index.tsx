"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCheck, FaWhatsapp } from "react-icons/fa";
import { Container } from "@/shared/components/container";
import { IDetailSection } from "../../interface/product-detail";
import { IProductDTO } from "@/shared/interfaces/product";
import { buildWhatsappUrl, IMAGE_NOT_FOUND_URL } from "@/shared/constants";
import { clsx } from "@/libs/clsx";

interface IProps {
  content: IDetailSection;
  product: IProductDTO;
}

export const MainSection = ({ content, product }: IProps) => {
  const mainImage = product.imgUrl || IMAGE_NOT_FOUND_URL;

  // TODO: mover a CMS (galería del producto: gallery[]). Hoy solo hay imagen principal.
  const images = [mainImage];
  const [activeImage, setActiveImage] = useState(mainImage);

  return (
    <Container className="grid w-full grid-cols-1 gap-10 px-4 pt-8 md:grid-cols-2">
      {/* Galería */}
      <div className="flex flex-col gap-4">
        <figure className="aspect-square w-full overflow-hidden rounded-2xl border border-line bg-card">
          <Image
            width={700}
            height={700}
            alt={product.name}
            src={activeImage}
            className="h-full w-full object-cover"
            priority
          />
        </figure>

        {images.length > 1 && (
          <div className="flex gap-3">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(image)}
                className={clsx(
                  "h-20 w-20 overflow-hidden rounded-xl border transition-colors",
                  activeImage === image
                    ? "border-accent"
                    : "border-line hover:border-accent/60",
                )}
                aria-label={`Ver imagen ${index + 1}`}
              >
                <Image
                  width={120}
                  height={120}
                  alt={`${product.name} ${index + 1}`}
                  src={image}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detalle */}
      <section className="flex flex-col gap-5">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent-dark">
          {product.category.name}
        </p>
        <div className="flex flex-col gap-3">
          <h1 className="heading-2 font-bold text-ink">{product.name}</h1>
          <p className="paragraph-lg text-muted">{product.description}</p>
        </div>

        {product.features && product.features.length > 0 && (
          <div className="border-t border-line pt-5">
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">
              {content.subtitle}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {product.features.map((feature) => (
                <li
                  key={feature.id}
                  className="flex items-center gap-3 text-ink/80"
                >
                  <FaCheck size={16} className="shrink-0 text-accent-dark" />
                  <span className="paragraph-lg">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-3 pt-2">
          <Link
            href={buildWhatsappUrl(`Hola, quiero más información sobre ${product.name}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-3 rounded-full bg-whatsapp py-3.5 font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            <FaWhatsapp size={22} />
            <span>{content.action}</span>
          </Link>
          {content.extraInfo && (
            <p className="paragraph text-center text-muted">
              {content.extraInfo}
            </p>
          )}
        </div>
      </section>
    </Container>
  );
};

import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { Container } from "@/shared/components/container";
import { IHeroSection } from "../../interface/home";
import { buildWhatsappUrl } from "@/shared/constants";

interface IProps {
  content: IHeroSection;
}

export const HeroSection = ({ content }: IProps) => {
  const heroImage = content.imageUrl || null;

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      {/* Imagen de fondo + overlay */}
      <div className="absolute inset-0 -z-10">
        {heroImage && (
          <Image
            src={heroImage}
            alt={content.title || "Vivero Jabes"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30" />
      </div>

      <Container className="px-4">
        <div className="flex min-h-[520px] max-w-[640px] flex-col justify-center gap-6 py-24 sm:min-h-[600px]">
          {/* TODO: mover a CMS (eyebrow del hero) */}
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">
            Vivero &amp; Jardinería
          </p>
          <h1 className="heading-1 font-bold text-white">
            {content.title}{" "}
            {content.titleHighlight && (
              <span className="text-accent">{content.titleHighlight}</span>
            )}
          </h1>
          <p className="paragraph-lg max-w-[520px] text-white/80">
            {content.subtitle}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={buildWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              <FaWhatsapp size={20} />
              <span>Contactar por WhatsApp</span>
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-ink"
            >
              Ver productos →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

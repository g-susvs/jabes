import Image from "next/image";
import Link from "next/link";
import { Container } from "@/shared/components/container";
import { FaWhatsapp } from "react-icons/fa";
import { buildWhatsappUrl } from "@/shared/constants";

interface IProps {
  title: string;
  description?: string;
  whatsappMessage?: string;
}

export const CtaSection = ({
  title,
  description,
  whatsappMessage,
}: IProps) => {
  return (
    <section className="relative isolate overflow-hidden py-20 px-4 sm:py-24">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/home/service-1.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/80" />
      </div>

      <Container>
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="heading-2 font-bold text-white">{title}</h2>
          {description && (
            <p className="paragraph-lg max-w-[560px] text-white/80">
              {description}
            </p>
          )}
          <Link
            href={buildWhatsappUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            <FaWhatsapp size={22} />
            <span>Escríbenos por WhatsApp</span>
          </Link>
        </div>
      </Container>
    </section>
  );
};

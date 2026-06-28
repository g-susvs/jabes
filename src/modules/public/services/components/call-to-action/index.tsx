import { Container } from "@/shared/components/container";
import { ICallToActionSection } from "../../interface/services";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { buildWhatsappUrl } from "@/shared/constants";

interface IProps {
  content: ICallToActionSection;
}

export const CallToActionSection = ({ content }: IProps) => {
  return (
    <Container className="px-4 pb-20 sm:pb-28">
      <section className="flex flex-col items-center gap-6 rounded-3xl bg-accent px-6 py-16 text-center">
        <div className="flex max-w-[680px] flex-col gap-3">
          <h2 className="heading-3 font-bold text-ink">{content.title}</h2>
          <p className="paragraph-lg text-ink/75">{content.description}</p>
        </div>
        <Link
          href={buildWhatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-ink transition-transform hover:scale-105"
        >
          <FaWhatsapp size={20} className="text-whatsapp" />
          {content.link.label}
        </Link>
      </section>
    </Container>
  );
};

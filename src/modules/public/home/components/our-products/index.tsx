import { Container } from "@/shared/components/container";
import { Eyebrow } from "@/shared/components/eyebrow";
import { IOurProductsSection } from "../../interface/home";
import { ProductList } from "./product-list";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";

interface IProps {
  content: IOurProductsSection;
}

export const OurProductsSection = ({ content }: IProps) => {
  return (
    <section className="py-20 px-4 sm:py-24">
      <Container>
        <div className="flex flex-col items-center gap-3 text-center">
          {/* TODO: mover a CMS (eyebrow) */}
          <Eyebrow>Catálogo</Eyebrow>
          <h2 className="heading-2 font-bold text-ink">{content.title}</h2>
          {content.description && (
            <p className="paragraph-lg max-w-[620px] text-muted">
              {content.description}
            </p>
          )}
        </div>

        <ProductList content={content} />

        <div className="mt-12 flex justify-center">
          <Link
            href={content.action.link || "/products"}
            className="inline-flex items-center gap-2 rounded-full border border-accent-dark px-6 py-3 font-semibold text-accent-dark transition-colors hover:bg-accent-dark hover:text-white"
          >
            <span>
              {content.action.label}
            </span>
            <IoArrowForward />
          </Link>
        </div>
      </Container>
    </section>
  );
};

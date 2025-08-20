import { Container } from "@/shared/components/container";
import { ICallToActionSection } from "../../interface/services";
import Link from "next/link";

interface IProps {
  content: ICallToActionSection;
}

export const CallToActionSection = ({ content }: IProps) => {
  return (
    <Container className="pt-8 pb-16 sm:pt-[100px] sm:pb-[200px] px-4">
      <section className="flex flex-col gap-6 items-center bg-primary-600 max-w-[1028px] rounded-2xl px-4 py-[48px]">
        <div className="flex flex-col gap-[10px] max-w-[734]">
          <h2 className="heading-5 sm:heading-3 font-semibold text-white text-center">
            {content.title}
          </h2>
          <p className="paragraph-lg text-white text-center">
            {content.description}
          </p>
        </div>
        <Link
          href={content.link.href}
          className="bg-white px-4 py-3 text-primary-600 font-semibold rounded-lg hover:scale-[1.1] transition-all"
        >
          {content.link.label}
        </Link>
      </section>
    </Container>
  );
};

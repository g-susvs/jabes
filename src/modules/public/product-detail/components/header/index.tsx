import Link from "next/link";
import { Container } from "@/shared/components/container";
import { IHeaderSection } from "../../interface/product-detail";
import { IoIosArrowBack } from "react-icons/io";

interface IProps {
  content: IHeaderSection;
}

export const HeaderSection = ({ content }: IProps) => {
  return (
    <Container className="px-4 pt-8">
      <Link
        href="/products"
        className="inline-flex items-center gap-1.5 font-semibold text-accent-dark transition-colors hover:text-accent-deep"
        aria-label={content.action}
      >
        <IoIosArrowBack size={20} />
        <span>{content.action}</span>
      </Link>
    </Container>
  );
};

"use client";

import { useRouter } from "next/navigation";
import { Container } from "@/shared/components/container";
import { IHeaderSection } from "../../interface/product-detail";
import { IoIosArrowBack } from "react-icons/io";

interface IProps {
  content: IHeaderSection;
}

export const HeaderSection = ({ content }: IProps) => {
  const router = useRouter();

  const handleBackToProducts = () => router.push("/products");

  return (
    <Container className="px-4">
      <button
        className="heading-6 flex flex-row gap-2 items-center text-zinc-800 cursor-pointer"
        aria-label={content.action}
        onClick={handleBackToProducts}
      >
        <IoIosArrowBack size={24} />
        <span>{content.action}</span>
      </button>
    </Container>
  );
};

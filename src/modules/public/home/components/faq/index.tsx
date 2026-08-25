"use client";

import { useState } from "react";
import { Container } from "@/shared/components/container";
import { Eyebrow } from "@/shared/components/eyebrow";
import { LuPlus, LuMinus } from "react-icons/lu";
import { clsx } from "@/libs/clsx";

interface IFaqItem {
  question: string;
  answer: string;
}

interface IProps {
  title: string;
  description?: string;
  items: IFaqItem[];
}

const FaqItem = ({
  item,
  isOpen,
  onToggle,
}: {
  item: IFaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div
      className={clsx(
        "rounded-2xl border transition-colors",
        isOpen ? "border-accent bg-white" : "border-line bg-card"
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="heading-6 font-semibold text-ink">
          {item.question}
        </span>
        <span
          className={clsx(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
            isOpen
              ? "border-accent bg-accent text-white"
              : "border-accent bg-white text-accent"
          )}
        >
          {isOpen ? <LuMinus size={18} strokeWidth={2.5} /> : <LuPlus size={18} strokeWidth={2.5} />}
        </span>
      </button>
      <div
        className={clsx(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <p className="px-5 pb-5 text-muted paragraph-lg">{item.answer}</p>
      </div>
    </div>
  );
};

export const FaqSection = ({ title, description, items }: IProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-accent-soft py-20 px-4 sm:py-24">
      <Container>
        <div className="flex flex-col items-center gap-3 text-center">
          <Eyebrow>¿Tenés dudas?</Eyebrow>
          <h2 className="heading-2 font-bold text-ink">{title}</h2>
          {description && (
            <p className="paragraph-lg max-w-[620px] text-muted">
              {description}
            </p>
          )}
        </div>

        <div className="mx-auto mt-12 flex max-w-[720px] flex-col gap-3">
          {items.map((item, index) => (
            <FaqItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

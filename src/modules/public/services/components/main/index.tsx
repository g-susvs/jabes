import { Container } from "@/shared/components/container";
import { IMainSection } from "../../interface/services";
import { ServiceCard } from "./service-card";

interface IProps {
  content: IMainSection;
}

export const MainSection = ({ content }: IProps) => {
  return (
    <Container className="flex flex-col gap-12 px-4 py-16 sm:py-24">
      <h2 className="heading-2 text-center font-bold text-ink">
        {content.title}
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {content.cards.map((card, index) => (
          <ServiceCard key={index} service={card} />
        ))}
      </div>
    </Container>
  );
};

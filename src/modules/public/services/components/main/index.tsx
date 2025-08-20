import { Container } from "@/shared/components/container";
import { IMainSection } from "../../interface/services";
import { ServiceCard } from "./service-card";

interface IProps {
  content: IMainSection;
}

export const MainSection = ({ content }: IProps) => {
  return (
    <Container className="flex flex-col gap-8 px-4 py-8 sm:py-[100px]">
      <h2 className="heading-6 md:heading-5 font-semibold md:font-semibold text-center text-primary-800">
        {content.title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {content.cards.map((card, index) => (
          <ServiceCard key={index} service={card} />
        ))}
      </div>
    </Container>
  );
};

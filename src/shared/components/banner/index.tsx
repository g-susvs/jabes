import { Container } from "../container";

interface IProps {
  content: {
    title: string;
    description: string;
  };
}

export const Banner = ({ content }: IProps) => {
  return (
    <section className="bg-primary-200">
      <Container className="flex flex-col gap-2 py-8">
        <h1 className="heading-5 font-normal sm:heading-2 sm:font-normal text-center sm:text-start text-primary-800">
          {content.title}
        </h1>
        <p className="hidden sm:block paragraph-lg text-zinc-800">
          {content.description}
        </p>
      </Container>
    </section>
  );
};

import { Container } from "../container";

interface IProps {
  content: {
    title: string;
    description: string;
  };
  /** Eyebrow opcional sobre el título. TODO: mover a CMS */
  eyebrow?: string;
}

export const Banner = ({ content, eyebrow }: IProps) => {
  return (
    <section className="bg-accent px-4">
      <Container className="flex flex-col items-center gap-3 py-14 text-center sm:py-20">
        {eyebrow && (
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
            {eyebrow}
          </p>
        )}
        <h1 className="heading-2 font-bold text-ink">{content.title}</h1>
        {content.description && (
          <p className="paragraph-lg max-w-[640px] text-ink/75">
            {content.description}
          </p>
        )}
      </Container>
    </section>
  );
};

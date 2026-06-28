import { Container } from "@/shared/components/container";
import { Eyebrow } from "@/shared/components/eyebrow";
import { IOurServicesSection } from "../../interface/home";
import Image from "next/image";
import Link from "next/link";
import { LuLeaf } from "react-icons/lu";
import { IMAGE_NOT_FOUND_URL } from "@/shared/constants";
import { IoArrowForward } from "react-icons/io5";

interface IProps {
  content: IOurServicesSection;
}

export const OurServicesSection = ({ content }: IProps) => {
  return (
    <section className="bg-accent-soft py-20 px-4 sm:py-24">
      <Container>
        <div className="flex flex-col items-center gap-3 text-center">
          {/* TODO: mover a CMS (eyebrow) */}
          <Eyebrow>Lo que hacemos</Eyebrow>
          <h2 className="heading-2 font-bold text-ink">{content.title}</h2>
          {content.description && (
            <p className="paragraph-lg max-w-[620px] text-muted">
              {content.description}
            </p>
          )}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {content.services.map((service, index) => {
            const serviceImage = service.img.src || IMAGE_NOT_FOUND_URL;
            return (
              <article
                key={index}
                className="group flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition-shadow hover:shadow-lg sm:w-[340px]"
              >
                <figure className="h-[220px] w-full overflow-hidden">
                  <Image
                    width={400}
                    height={300}
                    alt={service.img.alt}
                    src={serviceImage}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </figure>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                      <LuLeaf size={20} />
                    </span>
                    <h3 className="heading-6 font-bold text-ink">
                      {service.title}
                    </h3>
                  </div>
                  <p className="paragraph-lg flex-1 text-muted">
                    {service.description}
                  </p>
                  <Link
                    href={service.button.link || "/services"}
                    className="mt-1 inline-flex w-max items-center gap-1 font-semibold text-accent-dark transition-colors hover:text-accent-deep"
                  >
                    <span>
                      {service.button.label}
                    </span>
                    <IoArrowForward />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

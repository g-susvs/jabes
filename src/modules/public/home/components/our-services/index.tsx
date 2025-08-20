import { Container } from "@/shared/components/container";
import { IOurServicesSection } from "../../interface/home";
import Image from "next/image";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";

interface IProps {
  content: IOurServicesSection;
}

export const OurServicesSection = ({ content }: IProps) => {
  return (
    <section className="bg-primary-100 py-[96px] px-4">
      <Container>
        <div>
          <h2 className="heading-4 sm:heading-3 md:heading-2 text-primary-800 font-bold text-center">
            {content.title}
          </h2>
          <p className="paragraph-lg text-zinc-500 text-center">
            {content.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-6 mt-5 justify-center">
          {content.services.map((service, index) => (
            <article
              key={index}
              className="bg-primary-50 flex-1 basis-[300px] max-w-full p-4 pb-8 rounded-2xl flex flex-col gap-2 box-border"
            >
              <figure className="w-full h-[231px] rounded-xl overflow-hidden">
                <Image
                  width={300}
                  height={300}
                  alt={service.img.alt}
                  src={service.img.src}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="flex flex-col gap-4 justify-between flex-grow">
                <div className="flex flex-col gap-2 items-start">
                  <span className="heading-4 font-normal text-zinc-800">
                    {service.title}
                  </span>
                  <p className="paragraph-lg text-start text-zinc-600">
                    {service.description}
                  </p>
                </div>
                <Link
                  href={service.button.link}
                  className="w-max py-1 px-2 rounded-lg flex flex-wrap items-center gap-2 text-primary-500 border-2 border-primary-500"
                >
                  <span>{service.button.label}</span>
                  <IoArrowForward size={20} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

import { Container } from "@/shared/components/container";
import { IOurServicesSection } from "../../interface/home";
import styles from "./our-services.module.css";
import Image from "next/image";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";

interface IProps {
  content: IOurServicesSection;
}

export const OurServicesSection = ({ content }: IProps) => {
  return (
    <section className={styles.container}>
      <Container>
        <div>
          <h2 className={styles.title}>{content.title}</h2>
          <p className={styles.description}>{content.description}</p>
        </div>
        <div className={styles.servicesList}>
          {content.services.map((service, index) => (
            <article key={index} className={styles.serviceCard}>
              <figure className={styles.imageContainer}>
                <Image
                  width={300}
                  height={300}
                  alt={service.img.alt}
                  src={service.img.src}
                />
              </figure>
              <div className="flex flex-col gap-4 justify-between flex-grow">
                <div className="flex flex-col gap-2 items-start">
                  <span className={styles.title}>{service.title}</span>
                  <p className={styles.description}>{service.description}</p>
                </div>
                <Link href={service.button.link}>
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

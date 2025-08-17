import Image from "next/image";
import styles from "./hero.module.css";
import { Container } from "@/shared/components/container";
import { IHeroSection } from "../../interface/home";

interface IProps {
  content: IHeroSection;
}

export const HeroSection = ({ content }: IProps) => {
  return (
    <Container>
      <section className={styles.container}>
        <div className={styles.backgroundImage}>
          <Image
            src={"/images/home/hero.png"}
            width={200}
            height={200}
            alt="main-image"
          />
          <div className={styles.boxShadow}></div>
        </div>

        <div className={styles.hero}>
          <div className={styles.infoContainer}>
            <p className={styles.complement}>{content.title}</p>
            <h3 className={styles.name}>{content.titleHighlight}</h3>
            <p className={styles.description}>{content.subtitle}</p>
          </div>

          <figure className={styles.imageContainer}>
            <div className={styles.glow}></div>
            <Image
              src={"/images/home/hero.png"}
              width={200}
              height={200}
              alt="main-image"
            />
          </figure>
        </div>
      </section>
    </Container>
  );
};

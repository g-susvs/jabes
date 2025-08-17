import { Container } from "@/shared/components/container";
import { IOurProductsSection } from "../../interface/home";
import styles from "./our-products.module.css";
import Image from "next/image";
interface IProps {
  content: IOurProductsSection;
}

export const OurProductsSection = ({ content }: IProps) => {
  return (
    <section className={styles.container}>
      <Container>
        <div>
          <h2 className={styles.title}>{content.title}</h2>
          <p className={styles.description}>{content.description}</p>
        </div>
        <div className={styles.servicesList}>
          {content.products.map((product, index) => (
            <article key={index} className={styles.serviceCard}>
              <figure className={styles.imageContainer}>
                <Image
                  width={300}
                  height={300}
                  alt={product.title}
                  src={product.imageUrl}
                />
              </figure>
              <div>
                <span className={styles.title}>{product.title}</span>
                <p className={styles.description}>{product.description}</p>
              </div>
              <button>
                <span>{content.actionCardLabel}</span>
              </button>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

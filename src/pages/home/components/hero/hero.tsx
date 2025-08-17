import Image from "next/image";
import styles from "./hero.module.css";

export const Hero = () => {
  return (
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
          <p className={styles.complement}>Tu Jardín perfecto con</p>
          <h3 className={styles.name}>Jardinería Jabes</h3>
          <p className={styles.description}>
            Transformamos tus espacios verdes con calidad y profesionalismo.
          </p>
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
  );
};

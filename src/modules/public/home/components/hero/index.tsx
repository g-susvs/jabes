import Image from "next/image";
import { Container } from "@/shared/components/container";
import { IHeroSection } from "../../interface/home";
import { clsx } from "@/libs/clsx";

interface IProps {
  content: IHeroSection;
}

export const HeroSection = ({ content }: IProps) => {
  return (
    <Container>
      <section className="flex flex-col relative mt-[-80px] sm:m-0 py-[160px] sm:pt-[60px] sm:pb-[100px]">
        <div className="block absolute top-0 left-0 ring-0 w-full h-full sm:hidden">
          <Image
            src={"/images/home/hero.png"}
            width={200}
            height={200}
            alt="main-image"
            className="relative w-full h-full object-cover"
          />
          <div className="absolute top-0 bg-[#00000086] w-full h-full"></div>
        </div>

        <div className="mt-2 py-0 px-4 flex flex-row justify-between gap-4 z-40">
          <div className="flex flex-col justify-center">
            <p className="text-white sm:text-zinc-800 font-semibold heading-3">
              {content.title}
            </p>
            <h3 className="heading-3 font-semibold text-primary-500">
              {content.titleHighlight}
            </h3>
            <p className="paragraph-lg font-semibold text-white sm:text-zinc-800">
              {content.subtitle}
            </p>
          </div>

          <figure className="hidden sm:block relative max-w-[500px] w-full max-h-[500px] rounded-xl">
            <div
              className={clsx(
                "absolute top-1/2 left-1/4 w-[150%] h-full",
                "-translate-x-1/2 -translate-y-1/2",
                "bg-[radial-gradient(circle,rgba(193,218,155,0.8)_0%,rgba(193,218,155,0)_70%)]",
                "blur-[40px]"
              )}
            ></div>
            <Image
              src={"/images/home/hero.png"}
              width={200}
              height={200}
              alt="main-image"
              className="relative w-full h-full rounded-xl"
            />
          </figure>
        </div>
      </section>
    </Container>
  );
};

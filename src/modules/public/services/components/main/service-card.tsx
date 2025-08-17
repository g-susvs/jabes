import { IServiceCard } from "../../interface/services";
import Image from "next/image";
import { Icon } from "@/shared/components/icon";

interface IProps {
  service: IServiceCard;
}

export const ServiceCard = ({ service }: IProps) => {
  return (
    <article className="relative rounded-3xl overflow-hidden shadow-xl bg-white">
      <figure className="relative w-full overflow-hidden">
        <Image
          width={400}
          height={200}
          alt={service.img.alt}
          src={service.img.src}
          className="w-full h-[300px] object-cover rounded-t-3xl hover:scale-[1.1] transition-all z-0"
        />
        <div className="absolute bottom-0 left-0 right-0 h-[24px] bg-white rounded-tl-3xl z-10"></div>
      </figure>

      <div className="flex flex-col gap-2 px-4 pb-4 z-30">
        <header className="flex flex-row items-center gap-2">
          <div className="flex justify-center items-center p-2 rounded-full bg-primary-500">
            <Icon iconName={service.icon} size={20} className="text-white" />
          </div>
          <span className="heading-6 sm:heading-5 text-zinc-800 font-bold">
            {service.title}
          </span>
        </header>
        <p className="paragraph-lg text-zinc-500">{service.description}</p>
      </div>
    </article>
  );
};

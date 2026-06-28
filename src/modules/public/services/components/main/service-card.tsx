import { IServiceCard } from "../../interface/services";
import Image from "next/image";
import { Icon } from "@/shared/components/icon";
import { IMAGE_NOT_FOUND_URL } from "@/shared/constants";

interface IProps {
  service: IServiceCard;
}

export const ServiceCard = ({ service }: IProps) => {
  const serviceImage = service.img.src || IMAGE_NOT_FOUND_URL;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card transition-shadow hover:shadow-lg">
      <figure className="h-[260px] w-full overflow-hidden">
        <Image
          width={600}
          height={360}
          alt={service.img.alt}
          src={serviceImage}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </figure>

      <div className="flex flex-col gap-3 p-6">
        <header className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white">
            <Icon iconName={service.icon} size={22} className="text-white" />
          </span>
          <h3 className="heading-5 font-bold text-ink">{service.title}</h3>
        </header>
        <p className="paragraph-lg text-muted">{service.description}</p>
      </div>
    </article>
  );
};

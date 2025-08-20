import Image from "next/image";
import { Container } from "@/shared/components/container";
import { IDetailSection } from "../../interface/product-detail";
import { FaCheck, FaWhatsapp } from "react-icons/fa";
import { IProduct } from "@/modules/public/products/interface/products";
import Link from "next/link";

interface IProps {
  content: IDetailSection;
  product: IProduct;
}

export const MainSection = ({ content, product }: IProps) => {
  return (
    <Container className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-[40px] px-4 w-full">
      <figure className=" md:max-w-[534px] h-full md:max-h-[500px] rounded-xl overflow-hidden">
        <Image
          width={300}
          height={300}
          alt="adfa"
          src={product.imgUrl}
          className="w-full object-contain md:object-cover h-auto md:h-full"
        />
      </figure>
      <section className="flex flex-col gap-6">
        <span className="rounded-xl bg-primary-600 w-max text-white px-4 py-[2px]">
          {"Fertilizantes"}
        </span>
        <div>
          <h1 className="heading-5 sm:heading-4 md:heading-3 text-zinc-900 font-bold">
            {product.name}
          </h1>
          <p className="paragraph-lg text-zinc-500 font-normal">
            {product.description}
          </p>
        </div>
        <div>
          <h4 className="heading-6 sm:heading-5 text-zinc-700 font-semibold">
            {content.subtitle}
          </h4>
          <ul className="flex flex-col gap-4 mt-2">
            {product.features.map((feature) => (
              <li
                key={feature.id}
                className="flex flex-row gap-4 text-zinc-600"
              >
                <FaCheck size={20} className="text-primary-500" />
                <p>{feature.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Link
            href={""}
            className="flex flex-row gap-4 items-center justify-center py-2 rounded-xl bg-[#08d273] hover:bg-[#07ad60] transition-all"
          >
            <FaWhatsapp size={30} />
            <span className="paragraph-lg sm:heading-6 font-semibold">
              {content.action}
            </span>
          </Link>
          <p className="paragraph-lg text-center text-zinc-500 max-w-[464px]">
            {content.extraInfo}
          </p>
        </div>
      </section>
    </Container>
  );
};

import Link from "next/link";
import { LuLeaf, LuHouse } from "react-icons/lu";
import { Container } from "@/shared/components/container";

export const NotFoundPage = () => {
  return (
    <Container className="px-4">
      <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-20 text-center">
        {/* 404 con hojas decorativas */}
        <div className="flex items-center justify-center gap-3">
          <LuLeaf
            size={44}
            className="hidden rotate-[-20deg] text-accent/40 sm:block"
            aria-hidden
          />
          <span className="heading-1 text-[96px] font-bold leading-none text-accent sm:text-[140px]">
            404
          </span>
          <LuLeaf
            size={44}
            className="hidden rotate-[20deg] scale-x-[-1] text-accent/40 sm:block"
            aria-hidden
          />
        </div>

        <div className="flex max-w-[560px] flex-col gap-3">
          <h1 className="heading-2 font-bold text-ink">
            Esta página no ha germinado
          </h1>
          <p className="paragraph-lg text-muted">
            Parece que la página que buscas no existe o fue trasplantada a otro
            lugar. Vuelve al inicio para seguir explorando.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/home"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            <LuHouse size={20} />
            <span>Volver al inicio</span>
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3 font-semibold text-ink transition-colors hover:border-accent-dark hover:text-accent-dark"
          >
            Ver productos →
          </Link>
        </div>
      </section>
    </Container>
  );
};

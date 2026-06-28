import Link from "next/link";
import { Container } from "../container";
import { Logo } from "../logo";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlinePhone } from "react-icons/hi";
import { HiOutlineEnvelope, HiOutlineClock } from "react-icons/hi2";
import { CONTACT_INFO } from "@/shared/constants";

const navLinks = [
  { label: "Inicio", href: "/home" },
  { label: "Servicios", href: "/services" },
  { label: "Productos", href: "/products" },
];

export const Footer = () => {
  return (
    <footer className="bg-ink text-white/70">
      <Container className="px-4">
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="flex flex-col gap-4">
            <Logo tone="light" />
            <p className="paragraph max-w-[260px] text-white/60">
              {CONTACT_INFO.tagline}
            </p>
            {/* Redes — TODO: mover a CMS (socialLinks) */}
            <div className="flex items-center gap-3 pt-1">
              <Link
                href={CONTACT_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent hover:text-ink"
              >
                <FaFacebookF size={15} />
              </Link>
              <Link
                href={CONTACT_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent hover:text-ink"
              >
                <FaInstagram size={15} />
              </Link>
            </div>
          </div>

          {/* Navegación */}
          <nav className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Navegación
            </h3>
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="paragraph-lg w-max text-white/70 transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Contacto — TODO: mover a CMS */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Contacto
            </h3>
            <p className="flex items-start gap-2 paragraph-lg text-white/70">
              <HiOutlineLocationMarker className="mt-0.5 shrink-0 text-accent" size={18} />
              <span>{CONTACT_INFO.address}</span>
            </p>
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 paragraph-lg text-white/70 transition-colors hover:text-accent"
            >
              <HiOutlinePhone className="shrink-0 text-accent" size={18} />
              <span>{CONTACT_INFO.phone}</span>
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center gap-2 paragraph-lg text-white/70 transition-colors hover:text-accent"
            >
              <HiOutlineEnvelope className="shrink-0 text-accent" size={18} />
              <span>{CONTACT_INFO.email}</span>
            </a>
          </div>

          {/* Horario — TODO: mover a CMS */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Horario
            </h3>
            <p className="flex items-center gap-2 paragraph-lg text-white/70">
              <HiOutlineClock className="shrink-0 text-accent" size={18} />
              <span>{CONTACT_INFO.schedule}</span>
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 py-6">
          <p className="paragraph text-center text-white/40">
            © 2025 Jardinería Jabes. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
};

import { environment } from "@/config/env/environment";

export const IMAGE_NOT_FOUND_URL = "/images/image-not-found.png";

/** Mensaje por defecto para los CTAs de WhatsApp. */
export const WHATSAPP_DEFAULT_MESSAGE = "Hola, quiero más información";

/** Construye un enlace de WhatsApp con mensaje opcional. */
export const buildWhatsappUrl = (message = WHATSAPP_DEFAULT_MESSAGE) =>
  `https://wa.me/${environment.contactPhone}?text=${encodeURIComponent(message)}`;

// TODO: mover a CMS (Site Settings: dirección, teléfono, email, horario, redes)
export const CONTACT_INFO = {
  address: "Av. Jardines 1234, Ciudad",
  phone: "+52 555 123 4567",
  email: "info@jabes.com",
  schedule: "Lun–Sáb 8:00 – 18:00",
  tagline:
    "Tu vivero de confianza. Plantas, jardines y espacios verdes que transforman tu hogar.",
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
};

export const PRODUCTS_PAGE_SIZE = 10;

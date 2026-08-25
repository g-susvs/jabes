import type { Metadata } from "next";
import { Container } from "@/shared/components/container";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Conoce cómo Jabes recopila, usa y protege tu información personal.",
};

export default function PrivacyPolicy() {
  return (
    <Container className="px-4 py-16">
      <article className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-2">
          <h1 className="heading-3 font-bold text-ink">
            Política de Privacidad
          </h1>
          <p className="paragraph text-muted">
            Última actualización: 25 de agosto de 2026
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            1. Información que recopilamos
          </h2>
          <p className="paragraph-lg text-muted">
            En Jabes - Vivero y Jardinería recopilamos la siguiente información
            cuando interactúas con nuestro sitio web o servicios:
          </p>
          <ul className="list-inside list-disc space-y-2 paragraph-lg text-muted">
            <li>
              <strong>Datos de contacto:</strong> nombre, número de teléfono,
              correo electrónico y dirección, proporcionados al llenar
              formularios de contacto o solicitar cotizaciones.
            </li>
            <li>
              <strong>Datos de navegación:</strong> información recopilada
              automáticamente a través de cookies y herramientas de analítica
              (como Google Analytics), incluyendo dirección IP, tipo de
              navegador, páginas visitadas y tiempo de permanencia.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            2. Uso de la información
          </h2>
          <p className="paragraph-lg text-muted">
            Utilizamos tu información para los siguientes fines:
          </p>
          <ul className="list-inside list-disc space-y-2 paragraph-lg text-muted">
            <li>Responderte consultas y solicitudes de cotización.</li>
            <li>
              Enviar información sobre nuestros servicios de jardinería y
              productos del vivero.
            </li>
            <li>Mejorar la experiencia de navegación en nuestro sitio.</li>
            <li>Cumplir con obligaciones legales cuando aplique.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            3. Protección de datos
          </h2>
          <p className="paragraph-lg text-muted">
            Implementamos medidas de seguridad administrativas, técnicas y
            físicas para proteger tu información personal contra acceso no
            autorizado, alteración, divulgación o destrucción. Sin embargo,
            ningún método de transmisión por Internet o almacenamiento
            electrónico es 100% seguro, por lo que no podemos garantizar
            seguridad absoluta.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            4. Compartición de información
          </h2>
          <p className="paragraph-lg text-muted">
            No vendemos ni compartimos tu información personal con terceros,
            excepto en los siguientes casos:
          </p>
          <ul className="list-inside list-disc space-y-2 paragraph-lg text-muted">
            <li>
              Cuando sea requerido por ley o por orden de autoridad competente.
            </li>
            <li>
              Con proveedores de servicios que nos ayudan a operar nuestro
              negocio (por ejemplo, plataformas de correo electrónico), siempre
              bajo acuerdos de confidencialidad.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            5. Cookies y tecnologías de rastreo
          </h2>
          <p className="paragraph-lg text-muted">
            Utilizamos cookies y tecnologías similares para mejorar tu
            experiencia de navegación, analizar el tráfico del sitio y
            personalizar el contenido. Puedes configurar tu navegador para
            rechazar cookies, aunque esto podría afectar la funcionalidad del
            sitio.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            6. Tus derechos (Derechos ARCO)
          </h2>
          <p className="paragraph-lg text-muted">
            De conformidad con la Ley Federal de Protección de Datos Personales
            en Posesión de los Particulares (LFPDPPP), tienes derecho a:
          </p>
          <ul className="list-inside list-disc space-y-2 paragraph-lg text-muted">
            <li>
              <strong>Acceso:</strong> conocer qué datos personales tenemos sobre
              ti.
            </li>
            <li>
              <strong>Rectificación:</strong> solicitar la corrección de datos
              inexactos.
            </li>
            <li>
              <strong>Cancelación:</strong> solicitar la eliminación de tus datos
              cuando ya no sean necesarios.
            </li>
            <li>
              <strong>Oposición:</strong> oponerte al tratamiento de tus datos
              para fines específicos.
            </li>
          </ul>
          <p className="paragraph-lg text-muted">
            Para ejercer estos derechos, contáctanos a través de nuestro
            correo electrónico{" "}
            <a href="mailto:contacto@jardineriajabes.com" className="text-accent underline">
              contacto@jardineriajabes.com
            </a>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            7. Cambios en esta política
          </h2>
          <p className="paragraph-lg text-muted">
            Nos reservamos el derecho de actualizar esta Política de Privacidad
            en cualquier momento. Los cambios serán publicados en esta página con
            la fecha de última actualización. Te recomendamos revisar
            periódicamente esta política.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">8. Contacto</h2>
          <p className="paragraph-lg text-muted">
            Si tienes preguntas sobre esta Política de Privacidad, puedes
            contactarnos:
          </p>
          <ul className="list-inside list-disc space-y-2 paragraph-lg text-muted">
            <li>Correo electrónico: contacto@jardineriajabes.com</li>
            <li>Teléfono: +51 900 123 456</li>
            {/* <li>Dirección: Av. Jardines 1234, Ciudad</li> */}
          </ul>
        </section>
      </article>
    </Container>
  );
}

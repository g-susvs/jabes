import type { Metadata } from "next";
import { Container } from "@/shared/components/container";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de uso de los servicios y productos de Jabes - Vivero y Jardinería.",
};

export default function TermsAndConditions() {
  return (
    <Container className="px-4 py-16">
      <article className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-2">
          <h1 className="heading-3 font-bold text-ink">
            Términos y Condiciones
          </h1>
          <p className="paragraph text-muted">
            Última actualización: 25 de agosto de 2026
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            1. Aceptación de los términos
          </h2>
          <p className="paragraph-lg text-muted">
            Al acceder y utilizar el sitio web de Jabes - Vivero y Jardinería
            (www.jardineriajabes.com) y contratar nuestros servicios, aceptas
            integralmente los presentes Términos y Condiciones. Si no estás de
            acuerdo, te recomendamos no utilizar el sitio ni contratar nuestros
            servicios.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            2. Descripción de servicios
          </h2>
          <p className="paragraph-lg text-muted">
            Jabes - Vivero y Jardinería ofrece los siguientes servicios:
          </p>
          <ul className="list-inside list-disc space-y-2 paragraph-lg text-muted">
            <li>Venta de plantas, flores y productos de vivero.</li>
            <li>Diseño y creación de jardines.</li>
            <li>Mantenimiento de jardines y áreas verdes.</li>
            <li>Asesoría especializada en jardinería y cuidado de plantas.</li>
          </ul>
          <p className="paragraph-lg text-muted">
            Los precios, disponibilidad y descripciones de productos y servicios
            se muestran en el sitio web con fines informativos y pueden cambiar
            sin previo aviso.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            3. Cotizaciones y pagos
          </h2>
          <ul className="list-inside list-disc space-y-2 paragraph-lg text-muted">
            <li>
              Las cotizaciones son estimaciones y pueden variar según el alcance
              del proyecto, materiales disponibles y condiciones del sitio.
            </li>
            <li>
              Los pagos se realizan de acuerdo a las condiciones acordadas en
              cada cotización particular.
            </li>
            <li>
              Nos reservamos el derecho de solicitar un anticipo antes de iniciar
              cualquier servicio.
            </li>
            <li>
              Los precios mostrados en el sitio web no incluyen IGV salvo que se
              indique lo contrario.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            4. Política de entregas (plantas y productos)
          </h2>
          <ul className="list-inside list-disc space-y-2 paragraph-lg text-muted">
            <li>
              Las plantas son seres vivos y pueden presentar variaciones en
              color, tamaño y forma respecto a las imágenes mostradas en el
              sitio.
            </li>
            <li>
              La disponibilidad de productos está sujeta al stock del vivero.
            </li>
            <li>
              Los tiempos de entrega son estimados y pueden variar por causas
              climáticas, logísticas o de disponibilidad.
            </li>
            <li>
              El cliente es responsable de proporcionar un domicilio correcto y
              accesible para la entrega.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            5. Política de devoluciones y garantías
          </h2>
          <ul className="list-inside list-disc space-y-2 paragraph-lg text-muted">
            <li>
              Las plantas no son elegibles para devolución una vez entregadas,
              dado que son productos perecederos.
            </li>
            <li>
              Si una planta llega dañada por causas atribuibles al transporte,
              contáctanos dentro de las 24 horas posteriores a la entrega con
              evidencia fotográfica.
            </li>
            <li>
              Para productos no perecederos, aceptamos devoluciones dentro de
              los 7 días posteriores a la compra, siempre que estén en su
              empaque original y sin uso.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            6. Servicios de diseño y mantenimiento de jardines
          </h2>
          <ul className="list-inside list-disc space-y-2 paragraph-lg text-muted">
            <li>
              Cada proyecto de diseño de jardín se rige por una cotización y
              contrato particular que establece alcance, precios, tiempos y
              condiciones específicas.
            </li>
            <li>
              Los servicios de mantenimiento se contratan por periodos
              definidos y se renuevan según lo acordado.
            </li>
            <li>
              El crecimiento y salud de las plantas dependen de factores como
              clima, riego, suelo y cuidado del cliente, por lo que no podemos
              garantizar resultados específicos después de la instalación.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            7. Propiedad intelectual
          </h2>
          <p className="paragraph-lg text-muted">
            Todo el contenido del sitio web (textos, imágenes, logotipos,
            diseño, código fuente) es propiedad de Jabes - Vivero y Jardinería o
            de sus proveedores y está protegido por las leyes de propiedad
            intelectual. Queda prohibida su reproducción, distribución o uso no
            autorizado.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            8. Limitación de responsabilidad
          </h2>
          <p className="paragraph-lg text-muted">
            Jabes - Vivero y Jardinería no será responsable por:
          </p>
          <ul className="list-inside list-disc space-y-2 paragraph-lg text-muted">
            <li>
              Daños indirectos, incidentales o consecuentes derivados del uso
              del sitio o de nuestros servicios.
            </li>
            <li>
              Pérdidas o daños causados por el uso inadecuado de productos o
              plantas por parte del cliente.
            </li>
            <li>
              Interrupciones del servicio del sitio web por mantenimiento,
              actualizaciones o causas de fuerza mayor.
            </li>
            <li>
              Información incorrecta publicada por error en el sitio web.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            9. Fuerza mayor
          </h2>
          <p className="paragraph-lg text-muted">
            No seremos responsables por incumplimiento de nuestras obligaciones
            cuando este se deba a causas de fuerza mayor, incluyendo pero no
            limitado a: desastres naturales, pandemias, conflictos armados,
            huelgas, cortes de servicios públicos, o cualquier otra circunstancia
            ajena a nuestro control razonable.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            10. Modificaciones
          </h2>
          <p className="paragraph-lg text-muted">
            Nos reservamos el derecho de modificar estos Términos y Condiciones
            en cualquier momento. Las modificaciones entrarán en vigor a partir
            de su publicación en el sitio web. El uso continuado del sitio
            después de los cambios constituye la aceptación de los nuevos
            términos.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            11. Legislación aplicable y jurisdicción
          </h2>
          <p className="paragraph-lg text-muted">
            Estos Términos y Condiciones se rigen por las leyes de la República
            del Perú. Cualquier controversia derivada de estos términos será
            sometida a la jurisdicción de los tribunales competentes de la ciudad
            donde opere Jabes - Vivero y Jardinería.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">12. Contacto</h2>
          <p className="paragraph-lg text-muted">
            Para preguntas sobre estos Términos y Condiciones:
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

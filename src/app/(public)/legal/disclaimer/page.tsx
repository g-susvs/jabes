import type { Metadata } from "next";
import { Container } from "@/shared/components/container";

export const metadata: Metadata = {
  title: "Deslinde de Responsabilidad",
  description:
    "Aviso importante sobre las limitaciones de responsabilidad de Jabes - Vivero y Jardinería.",
};

export default function Disclaimer() {
  return (
    <Container className="px-4 py-16">
      <article className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-2">
          <h1 className="heading-3 font-bold text-ink">
            Deslinde de Responsabilidad
          </h1>
          <p className="paragraph text-muted">
            Última actualización: 25 de agosto de 2026
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            1. Información general
          </h2>
          <p className="paragraph-lg text-muted">
            El contenido publicado en el sitio web de Jabes - Vivero y Jardinería
            (www.jardineriajabes.com) tiene fines exclusivamente informativos y
            educativos. Aunque nos esforzamos por mantener la información
            actualizada y precisa, no garantizamos la exactitud, integridad o
            actualidad de todo el contenido publicado.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            2. Recomendaciones de jardinería y cuidado de plantas
          </h2>
          <p className="paragraph-lg text-muted">
            Las recomendaciones, consejos e información publicada en nuestro
            sitio web sobre el cuidado de plantas, diseño de jardines y
            jardinería en general son de carácter general y no constituyen
            asesoría profesional personalizada. Cada planta y jardín es único,
            y los resultados pueden variar dependiendo de:
          </p>
          <ul className="list-inside list-disc space-y-2 paragraph-lg text-muted">
            <li>
              Condiciones climáticas y geográficas de cada ubicación.
            </li>
            <li>
              Tipo de suelo, drenaje y exposición solar del área.
            </li>
            <li>
              Cuidado y mantenimiento proporcionado por el propietario.
            </li>
            <li>
              Variedades específicas de plantas y su comportamiento natural.
            </li>
            <li>
              Prácticas de riego, abono y control de plagas aplicadas.
            </li>
          </ul>
          <p className="paragraph-lg text-muted">
            <strong>
              No garantizamos resultados específicos derivados del uso de
              nuestra información recomendada.
            </strong>
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            3. Productos y plantas
          </h2>
          <p className="paragraph-lg text-muted">
            Las plantas son seres vivos y están sujetas a factores naturales
            que escapan a nuestro control. Las imágenes, descripciones y
            especificaciones de productos mostradas en el sitio web son
            referenciales y pueden diferir del producto real en cuanto a
            tamaño, color, forma y estado de salud al momento de la entrega.
          </p>
          <p className="paragraph-lg text-muted">
            La supervivencia y crecimiento de las plantas depende en gran medida
            del cuidado posterior a la entrega, incluyendo riego adecuado,
            luz solar suficiente, protección contra plagas y condiciones
            ambientales favorables.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            4. Servicios de diseño y mantenimiento
          </h2>
          <p className="paragraph-lg text-muted">
            Los proyectos de diseño de jardín y servicios de mantenimiento se
            realizan conforme a las especificaciones acordadas en cada
            cotización y contrato particular. Los resultados pueden verse
            afectados por:
          </p>
          <ul className="list-inside list-disc space-y-2 paragraph-lg text-muted">
            <li>
              Cambios en las condiciones climáticas o estacionales.
            </li>
            <li>
              Alteraciones en el terreno no previstas al momento de la
              cotización.
            </li>
            <li>
              Acciones del propietario o terceros que modifiquen el área
              trabajada.
            </li>
            <li>
              Plagas, enfermedades o factores biológicos impredecibles.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            5. Enlaces a sitios de terceros
          </h2>
          <p className="paragraph-lg text-muted">
            Nuestro sitio puede contener enlaces a sitios web de terceros. Estos
            enlaces se proporcionan solo para tu conveniencia. No tenemos control
            sobre el contenido, políticas de privacidad o prácticas de esos
            sitios y no asumimos responsabilidad por su contenido o uso.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            6. Disponibilidad del sitio
          </h2>
          <p className="paragraph-lg text-muted">
            Nos esforzamos por mantener el sitio web disponible de manera
            continua, pero no garantizamos que estará libre de interrupciones,
            errores o virus. No seremos responsables por daños directos o
            indirectos que puedan resultar del uso o imposibilidad de uso del
            sitio.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            7. Limitación de daños
          </h2>
          <p className="paragraph-lg text-muted">
            En ningún caso Jabes - Vivero y Jardinería, sus propietarios,
            empleados o colaboradores serán responsables por daños
            incidentales, consecuentes, especiales, indirectos o punitivos
            derivados del uso de nuestro sitio web, productos o servicios,
            incluyendo pero no limitado a:
          </p>
          <ul className="list-inside list-disc space-y-2 paragraph-lg text-muted">
            <li>
              Pérdida de beneficios o ingresos.
            </li>
            <li>
              Pérdida de datos o información.
            </li>
            <li>
              Daños a propiedad personal.
            </li>
            <li>
              Costos de productos o servicios sustitutos.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            8. Alimentos y productos para consumo
          </h2>
          <p className="paragraph-lg text-muted">
            Si en algún momento ofrecemos productos comestibles (hierbas,
            frutas, etc.), el cliente es responsable de verificar las
            condiciones de almacenamiento, preparación y consumo. Jabes no se
            hace responsable por reacciones alérgicas, intoxicaciones o
            efectos adversos derivados del consumo de productos.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="heading-5 font-semibold text-ink">
            9. Consultas y contacto
          </h2>
          <p className="paragraph-lg text-muted">
            Si tienes dudas sobre este Deslinde de Responsabilidad o sobre
            cualquier aspecto de nuestros productos y servicios, puedes
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

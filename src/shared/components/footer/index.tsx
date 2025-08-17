import { Container } from "../container";
import { Text } from "../text";

export const Footer = () => {
  return (
    <footer className="bg-blue-950 w-full flex justify-center ">
      <Container>
        <div className="p-8">
          <Text size="md" className="text-white">
            © 2024 Jardinería Jabes. Todos los derechos reservados.
          </Text>
        </div>
      </Container>
    </footer>
  );
};

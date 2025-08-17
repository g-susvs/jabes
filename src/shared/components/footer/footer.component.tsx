import { Text } from "../text/text.component";

export const Footer = () => {
  return (
    <footer className="bg-blue-950 w-full flex justify-center ">
      <div className="max-w-[1200px] p-8">
        <Text size="md" className="text-white">
          © 2024 Jardinería Jabes. Todos los derechos reservados.
        </Text>
      </div>
    </footer>
  );
};

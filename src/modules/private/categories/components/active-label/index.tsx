import { clsx } from "@/libs/clsx";

interface IProps {
  active: boolean;
}

export const ActiveLabel = ({ active }: IProps) => {
  return (
    <span
      className={clsx(
        "rounded-xl px-2 py-1",
        active && "bg-green-100 text-green-800",
        !active && "bg-red-100 text-red-800"
      )}
    >
      {active ? "Activado" : "Desactivado"}
    </span>
  );
};

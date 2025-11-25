import { clsx } from "@/libs/clsx";

interface IProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

export const AdminPageLayout = ({ title, children, className }: IProps) => {
  return (
    <div className={clsx("w-full", className)}>
      <h1 className="heading-4 text-zinc-700 font-medium">{title}</h1>
      <section className="mt-4">{children}</section>
    </div>
  );
};

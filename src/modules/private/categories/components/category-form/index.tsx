import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/shared/components/button";

export interface ICategoryFormValues {
  name: string;
  active: boolean;
}

interface IProps {
  defaultValues: ICategoryFormValues;
  onSubmit: (data: ICategoryFormValues) => Promise<void> | void;
  submitText: string;
  onCancel: () => void;
  disabled?: boolean;
}

export const CategoryForm = ({
  defaultValues,
  onSubmit,
  submitText,
  onCancel,
  disabled = false,
}: IProps) => {
  const { register, handleSubmit } = useForm<ICategoryFormValues>({
    defaultValues,
  });

  const handleValidSubmit: SubmitHandler<ICategoryFormValues> = async (
    data
  ) => {
    await onSubmit(data);
  };

  return (
    <form
      className="flex flex-col justify-start items-start gap-4"
      onSubmit={handleSubmit(handleValidSubmit)}
    >
      <input
        placeholder="Ingresa el nombre de la categoría"
        className="border p-2 rounded w-full"
        {...register("name")}
      />
      <label>
        <input type="checkbox" {...register("active")} />
        <span className="w-auto"> Activar categoría</span>
      </label>

      <div className="flex justify-between gap-2 w-full">
        <Button
          onClick={onCancel}
          disabled={disabled}
          className="bg-red-800 hover:bg-red-900 disabled:bg-zinc-600 transition-all"
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          disabled={disabled}
          className="disabled:bg-zinc-600"
        >
          {submitText}
        </Button>
      </div>
    </form>
  );
};

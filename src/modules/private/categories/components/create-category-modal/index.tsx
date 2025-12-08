import { Modal } from "@/shared/components/modal";
import { useCreateCategory } from "../../hooks/useCreateCategory";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICreateCategoryDTO } from "@/shared/interfaces/category";
import { Button } from "@/shared/components/button";

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export const CreateCategoryModal = ({
  isModalOpen,
  setIsModalOpen,
}: IProps) => {
  const { onCreateCategory, isPending: isPendingCreate } = useCreateCategory();

  const { handleSubmit, register, reset } = useForm<ICreateCategoryDTO>({
    defaultValues: {
      name: "",
      active: true,
    },
  });

  const onSubmit: SubmitHandler<ICreateCategoryDTO> = (data) =>
    onCreateCategory(data).finally(() => {
      reset();
      setIsModalOpen(false);
    });

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <h3 className="text-2xl mb-4">Crea una nueva categoría</h3>
      <form
        className="flex flex-col justify-start items-start gap-4"
        onSubmit={handleSubmit(onSubmit)}
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
            onClick={() => setIsModalOpen(false)}
            disabled={isPendingCreate}
            className="bg-red-800 hover:bg-red-900 disabled:bg-zinc-600 transition-all"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isPendingCreate}
            className="disabled:bg-zinc-600"
          >
            Guardar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

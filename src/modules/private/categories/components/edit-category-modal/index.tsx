import { Button } from "@/shared/components/button";
import { Modal } from "@/shared/components/modal";
import { useEffect } from "react";
import { useEditCategory } from "../../hooks/useEditCategory";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICategory } from "@/shared/interfaces/category";

interface IEditCategory {
  name: string;
  active: boolean;
}

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  category: ICategory | null;
}

export const EditCategoryModal = ({
  isModalOpen,
  setIsModalOpen,
  category,
}: IProps) => {
  const { onEditCategory } = useEditCategory();

  const { handleSubmit, register, setValue } = useForm<IEditCategory>({
    defaultValues: {
      name: "",
      active: true,
    },
  });

  const onSubmitEdit: SubmitHandler<IEditCategory> = (data) => {
    onEditCategory({ categoryId: category?.categoryId ?? "", data }).finally(
      () => {
        setIsModalOpen(false);
      }
    );
  };

  useEffect(() => {
    if (!category) return;
    setValue("name", category.name);
    setValue("active", category.active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <h3 className="text-2xl mb-4">Editar categoría</h3>
      <form
        className="flex flex-col justify-start items-start gap-4"
        onSubmit={handleSubmit(onSubmitEdit)}
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
            className="bg-red-800 hover:bg-red-900 transition-all"
          >
            Cancelar
          </Button>
          <Button type="submit" onClick={() => {}}>
            Editar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

import { Modal } from "@/shared/components/modal";
import { useCreateCategory } from "../../hooks/useCreateCategory";
import { ICreateCategoryDTO } from "@/shared/interfaces/category";
import { CategoryForm } from "@/modules/private/categories/components/category-form";
import { toast } from "react-toastify";

export interface ICategoryFormValues {
  name: string;
  active: boolean;
}

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export const CreateCategoryModal = ({
  isModalOpen,
  setIsModalOpen,
}: IProps) => {
  const { onCreateCategory, isPending } = useCreateCategory();

  const handleSubmit = async (data: ICreateCategoryDTO) => {
    await onCreateCategory(data)
      .then(() => toast.success("Categoría creada"))
      .catch(() => toast.error("Error al crear la categoría"))
      .finally(() => {
        setIsModalOpen(false);
      });
  };

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <h3 className="text-2xl mb-4">Crea una nueva categoría</h3>
      <CategoryForm
        defaultValues={{ name: "", active: true }}
        onSubmit={handleSubmit}
        submitText="Guardar"
        onCancel={() => setIsModalOpen(false)}
        disabled={isPending}
      />
    </Modal>
  );
};

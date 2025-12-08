import { Modal } from "@/shared/components/modal";
import { useEffect, useState } from "react";
import { useEditCategory } from "../../hooks/useEditCategory";
import { ICategory, ICreateCategoryDTO } from "@/shared/interfaces/category";
import { CategoryForm } from "@/modules/private/categories/components/category-form";
import { toast } from "react-toastify";

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
  const [defaults, setDefaults] = useState({ name: "", active: true });

  useEffect(() => {
    if (!category) return;
    setDefaults({
      name: category.name,
      active: category.active,
    });
  }, [category]);

  const handleSubmit = async (data: ICreateCategoryDTO) => {
    await onEditCategory({
      categoryId: category?.categoryId ?? "",
      data,
    })
      .then(() => toast.success("Se guardó los cambios editados"))
      .catch(() => toast.error("Error al editar la categoría"))
      .finally(() => {
        setIsModalOpen(false);
      });
  };

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <h3 className="text-2xl mb-4">Editar categoría</h3>
      <CategoryForm
        defaultValues={defaults}
        onSubmit={handleSubmit}
        submitText="Editar"
        onCancel={() => setIsModalOpen(false)}
      />
    </Modal>
  );
};

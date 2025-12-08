import { Button } from "@/shared/components/button";
import { Modal } from "@/shared/components/modal";
import { useDeleteCategory } from "../../hooks/useDeleteCategory";
import { toast } from "react-toastify";

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  selectedCategoryId: string;
}

export const DeleteCategoryModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedCategoryId,
}: IProps) => {
  const { onDeleteCategory } = useDeleteCategory();

  const onSubmitDelete = () =>
    onDeleteCategory(selectedCategoryId)
      .then(() => toast.success("Categoría eliminada"))
      .catch(() => toast.error("Error al eliminar la categoría"))
      .finally(() => {
        setIsModalOpen(false);
      });

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <h3 className="text-2xl mb-4">¿Estas seguro de eliminar la categoría?</h3>
      <div className="flex flex-col justify-start items-start gap-4">
        <p>Se eliminará permanentemente</p>

        <div className="flex justify-between gap-2 w-full">
          <Button
            onClick={() => setIsModalOpen(false)}
            className="bg-red-800 hover:bg-red-900 transition-all"
          >
            Cancelar
          </Button>
          <Button type="button" onClick={onSubmitDelete}>
            Si, estoy seguro
          </Button>
        </div>
      </div>
    </Modal>
  );
};

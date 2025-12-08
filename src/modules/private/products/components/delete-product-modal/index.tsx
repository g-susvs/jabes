import { Button } from "@/shared/components/button";
import { Modal } from "@/shared/components/modal";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import { toast } from "react-toastify";

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  productId: string;
}

export const DeleteProductModal = ({
  isModalOpen,
  setIsModalOpen,
  productId,
}: IProps) => {
  const { onDeleteProduct } = useDeleteProduct();

  const onSubmitDelete = () =>
    onDeleteProduct(productId)
      .then(() => toast.success("Producto eliminado"))
      .catch(() => toast.error("Error al eliminar el producto"))
      .finally(() => {
        setIsModalOpen(false);
      });

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <h3 className="text-2xl mb-4">¿Estas seguro de eliminar el producto?</h3>
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

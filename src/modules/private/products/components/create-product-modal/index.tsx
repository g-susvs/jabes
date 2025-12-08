import { Modal } from "@/shared/components/modal";
import { useCreateProduct } from "../../hooks/useCreateProduct";
import { toast } from "react-toastify";
import { ICreateProductForm, ProductForm } from "../product-form";

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export const CreateProductModal = ({ isModalOpen, setIsModalOpen }: IProps) => {
  const { onCreateProduct, isPending } = useCreateProduct();

  const handleSubmit = async (data: ICreateProductForm) => {
    const { features, image, ...rest } = data;
    const file = image?.[0];

    const mappedFeatures = features.map((feat) => feat.value);

    onCreateProduct({
      data: {
        ...rest,
        features: mappedFeatures,
      },
      image: file,
    })
      .then(() => toast.success("Producto creado correctamente"))
      .catch(() => toast.error("Error al crear el producto"))
      .finally(() => {
        setIsModalOpen(false);
      });
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className="!max-w-[600px]"
    >
      <h3 className="text-2xl mb-4">Añadir nuevo producto</h3>
      <ProductForm
        defaultValues={{
          name: "",
          description: "",
          active: true,
          categoryId: "",
          features: [],
        }}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        submitText="Guardar"
        disabled={isPending}
      />
    </Modal>
  );
};

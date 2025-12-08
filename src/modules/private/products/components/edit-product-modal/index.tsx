import { useEffect, useState } from "react";
import { Modal } from "@/shared/components/modal";
import { useEditProduct } from "../../hooks/useEditProduct";
import { IProductDTO } from "@/shared/interfaces/product";
import { ICreateProductForm, ProductForm } from "../product-form";
import { toast } from "react-toastify";

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  product: IProductDTO | null;
}

export const EditProductModal = ({
  isModalOpen,
  setIsModalOpen,
  product,
}: IProps) => {
  const [defaults, setDefaults] = useState<ICreateProductForm>({
    name: "",
    description: "",
    active: true,
    categoryId: "",
    features: [],
  });

  const { onEditCategory, isPending } = useEditProduct();

  const handleSubmit = (data: ICreateProductForm) => {
    const { features, image, ...rest } = data;
    const file = image?.[0];

    const mappedFeatures = features.map((feat) => feat.value);

    onEditCategory({
      productId: product?.productId ?? "",
      data: {
        ...rest,
        features: mappedFeatures,
      },
      image: file,
    })
      .then(() => toast.success("Se guardó los cambios"))
      .catch(() => toast.error("Error al editar el producto"))
      .finally(() => {
        setIsModalOpen(false);
      });
  };

  useEffect(() => {
    if (!product) return;
    setDefaults({
      name: product.name,
      description: product?.description ?? "",
      active: product.active,
      categoryId: product.categoryId,
      features:
        product.features?.map((feat) => {
          return { value: feat.text };
        }) ?? [],
      imageUrl: product.imgUrl,
    });
  }, [product]);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className="!max-w-[600px]"
    >
      <h3 className="text-2xl mb-4">Editar el producto</h3>
      <ProductForm
        defaultValues={defaults}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        submitText="Guardar"
        disabled={isPending}
      />
    </Modal>
  );
};

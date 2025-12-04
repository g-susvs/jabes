import { Button } from "@/shared/components/button";
import { Modal } from "@/shared/components/modal";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { PiPlus } from "react-icons/pi";
import { useCreateProduct } from "../../hooks/useCreateProduct";
import { useGetCategories } from "@/modules/private/categories/hooks/useGetCategories";

interface ICreateProductForm {
  name: string;
  description: string;
  active: boolean;
  categoryId: string;
  features: { value: string }[];
  image: FileList;
}

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}


export const CreateProductModal = ({ isModalOpen, setIsModalOpen }: IProps) => {
  const { onCreateCategory } = useCreateProduct();
  const {data: categories} = useGetCategories();

  const { register, handleSubmit, watch, control, reset } =
    useForm<ICreateProductForm>({
      defaultValues: {
        active: true,
      },
    });
  const previewImage = watch("image")?.[0];

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  const onSubmit: SubmitHandler<ICreateProductForm> = (data) => {
    const { features, image, ...rest } = data;
    const file = image?.[0];

    const mappedFeatures = features.map((feat) => feat.value);

    onCreateCategory({
      data: {
        ...rest,
        features: mappedFeatures,
      },
      image: file,
    }).finally(() => {
      reset();
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
      <form
        className="flex flex-col justify-start items-start gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          placeholder="Ingresa el nombre del producto"
          className="border p-2 rounded w-full"
          {...register("name")}
        />
        <textarea
          placeholder="Ingresa la descripción del producto"
          className="border p-2 rounded w-full"
          {...register("description")}
        />
        <div className="flex flex-col gap-2">
          <label className="font-bold">Categoría</label>
          <select
            className="w-[180px] border px-2 py-1 text-md rounded-sm border-gray-500 "
            {...register("categoryId")}
          >
            {categories && categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 items-start">
          <h3 className="font-bold">Características</h3>
          <div className="flex flex-col gap-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-row gap-2">
                <input
                  {...register(`features.${index}.value`)}
                  placeholder={`Feature ${index + 1}`}
                  className="rounded-sm pl-2 text-md border border-gray-500 "
                />

                <Button
                  type="button"
                  className=""
                  onClick={() => remove(index)}
                >
                  Eliminar
                </Button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => append({ value: "" })}
            className="flex flex-row justify-center items-center gap-2 border border-gray-500 rounded-sm px-2 py-2"
          >
            <PiPlus />
            <span>Añadir característica</span>
          </button>
        </div>

        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-neutral-tertiary-medium"
          >
            {!previewImage && (
              <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                <p className="mb-2 text-sm">
                  <span className="font-semibold">Haz click para subir</span> o
                  arrastra y suelta
                </p>
                <p className="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
            )}
            {previewImage && (
              <img
                src={URL.createObjectURL(previewImage)}
                alt="preview"
                className="w-[200px] h-[200px] object-cover"
              />
            )}
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/*"
              {...register("image")}
            />
          </label>
        </div>

        <label>
          <input type="checkbox" {...register("active")} />
          <span className="w-auto"> Activar categoría</span>
        </label>
        <div className="flex justify-between gap-2 w-full">
          <Button
            onClick={() => setIsModalOpen(false)}
            // disabled={isPendingCreate}
            className="bg-red-800 hover:bg-red-900 disabled:bg-zinc-600 transition-all"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            // disabled={isPendingCreate}
            className="disabled:bg-zinc-600"
          >
            Guardar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

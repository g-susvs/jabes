import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { PiPlus } from "react-icons/pi";
import { Button } from "@/shared/components/button";
import { useGetCategories } from "@/modules/private/categories/hooks/useGetCategories";

export interface ICreateProductForm {
  name: string;
  description: string;
  active: boolean;
  categoryId: string;
  features: { value: string }[];
  image?: FileList;
  imageUrl?: string;
}
interface IProps {
  defaultValues: ICreateProductForm;
  onSubmit: (data: ICreateProductForm) => Promise<void> | void;
  submitText: string;
  onCancel: () => void;
  disabled?: boolean;
}

export const ProductForm = ({
  defaultValues,
  onSubmit,
  submitText,
  onCancel,
  disabled = false,
}: IProps) => {
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const { data: categories } = useGetCategories();

  const { register, handleSubmit, watch, control, setValue } =
    useForm<ICreateProductForm>({
      defaultValues,
    });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  const watchFile = watch("image")?.[0];

  const handleValidSubmit: SubmitHandler<ICreateProductForm> = (data) =>
    onSubmit(data);

  useEffect(() => {
    setValue("name", defaultValues.name);
    setValue("description", defaultValues.description ?? "");
    setValue("active", defaultValues.active);
    setValue("categoryId", defaultValues.categoryId);
    setValue(
      "features",
      defaultValues.features?.map((feat) => {
        return { value: feat.value };
      }) ?? []
    );
    if (defaultValues.imageUrl) setPreviewImageUrl(defaultValues.imageUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  useEffect(() => {
    if (watchFile) {
      setPreviewImageUrl(URL.createObjectURL(watchFile));
    }
  }, [watchFile]);
  return (
    <form
      className="flex flex-col justify-start items-start gap-4"
      onSubmit={handleSubmit(handleValidSubmit)}
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
          {categories &&
            categories.map((category) => (
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

              <Button type="button" className="" onClick={() => remove(index)}>
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
          {!previewImageUrl && (
            <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
              <p className="mb-2 text-sm">
                <span className="font-semibold">Haz click para subir</span> o
                arrastra y suelta
              </p>
              <p className="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
          )}
          {previewImageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewImageUrl}
              alt="preview"
              className="w-[200px] h-[200px] object-cover"
            />
          )}
          {/* {previewImage && (
            <img
              src={URL.createObjectURL(previewImage)}
              alt="preview"
              className="w-[200px] h-[200px] object-cover"
            />
          )} */}
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

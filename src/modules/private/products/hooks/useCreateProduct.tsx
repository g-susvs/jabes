import { getQueryClient } from "@/libs/tanstack-query";
import { EProductQueryKeys } from "@/shared/constants/query-keys";
import { ICreateProductParams } from "@/shared/interfaces/product-params";
import { ProductService } from "@/shared/services/product.service";
import { useMutation } from "@tanstack/react-query";

export const useCreateProduct = () => {
  const { isPending, isError, mutateAsync } = useMutation({
    mutationKey: [EProductQueryKeys.CREATE],
    mutationFn: async (params: ICreateProductParams) => {
      return await ProductService.create(params);
    },
    onSuccess: () => {
      const queryClient = getQueryClient();
      queryClient.invalidateQueries({ queryKey: [EProductQueryKeys.GET_ALL] });
    },
  });

  const onCreateProduct = async (data: ICreateProductParams) =>
    await mutateAsync(data);

  return {
    isPending,
    isError,
    onCreateProduct,
  };
};

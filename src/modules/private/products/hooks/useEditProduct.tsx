import { getQueryClient } from "@/libs/tanstack-query";
import { EProductQueryKeys } from "@/shared/constants/query-keys";
import { IEditProductParams } from "@/shared/interfaces/product-params";
import { ProductService } from "@/shared/services/product.service";
import { useMutation } from "@tanstack/react-query";

export const useEditProduct = () => {
  const { isPending, isError, mutateAsync } = useMutation({
    mutationKey: [EProductQueryKeys.EDIT],
    mutationFn: async (params: IEditProductParams) => {
      return await ProductService.edit(params);
    },
    onSuccess: () => {
      const queryClient = getQueryClient();
      queryClient.invalidateQueries({ queryKey: [EProductQueryKeys.GET_ALL] });
    },
  });

  const onEditCategory = async (data: IEditProductParams) =>
    await mutateAsync(data);

  return {
    isPending,
    isError,
    onEditCategory,
  };
};

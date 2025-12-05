import { getQueryClient } from "@/libs/tanstack-query";
import { EProductQueryKeys } from "@/shared/constants/query-keys";
import { ProductService } from "@/shared/services/product.service";
import { useMutation } from "@tanstack/react-query";

export const useDeleteProduct = () => {
  const { isPending, isError, mutateAsync } = useMutation({
    mutationKey: [EProductQueryKeys.DELETE],
    mutationFn: async (productId: string) => {
      return await ProductService.delete(productId);
    },
    onSuccess: () => {
      const queryClient = getQueryClient();
      queryClient.invalidateQueries({ queryKey: [EProductQueryKeys.GET_ALL] });
    },
  });

  const onDeleteProduct = async (productId: string) =>
    await mutateAsync(productId);

  return {
    isPending,
    isError,
    onDeleteProduct,
  };
};

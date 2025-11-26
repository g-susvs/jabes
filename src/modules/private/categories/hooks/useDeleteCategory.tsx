import { getQueryClient } from "@/libs/tanstack-query";
import { ECategoryQueryKeys } from "@/shared/constants/query-keys";
import { CategoryService } from "@/shared/services/category.service";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCategory = () => {
  const { isPending, isError, mutateAsync } = useMutation({
    mutationKey: [ECategoryQueryKeys.DELETE],
    mutationFn: async (categoryId: string) => {
      return await CategoryService.delete(categoryId);
    },
    onSuccess: () => {
      const queryClient = getQueryClient();
      queryClient.invalidateQueries({ queryKey: [ECategoryQueryKeys.GET_ALL] });
    },
  });

  const onDeleteCategory = async (categoryId: string) =>
    await mutateAsync(categoryId);

  return {
    isPending,
    isError,
    onDeleteCategory,
  };
};

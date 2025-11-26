import { getQueryClient } from "@/libs/tanstack-query";
import { ECategoryQueryKeys } from "@/shared/constants/query-keys";
import { CategoryService } from "@/shared/services/category.service";
import { useMutation } from "@tanstack/react-query";

export const useEditCategory = () => {
  const { isPending, isError, mutateAsync } = useMutation({
    mutationKey: [ECategoryQueryKeys.EDIT],
    mutationFn: async (params: {
      categoryId: string;
      data: { name: string; active: boolean };
    }) => {
      return await CategoryService.edit(params.categoryId, params.data);
    },
    onSuccess: () => {
      const queryClient = getQueryClient();
      queryClient.invalidateQueries({ queryKey: [ECategoryQueryKeys.GET_ALL] });
    },
  });

  const onEditCategory = async (params: {
    categoryId: string;
    data: { name: string; active: boolean };
  }) => await mutateAsync(params);

  return {
    isPending,
    isError,
    onEditCategory,
  };
};

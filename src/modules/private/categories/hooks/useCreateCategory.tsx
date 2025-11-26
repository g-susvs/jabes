import { getQueryClient } from "@/libs/tanstack-query";
import { ECategoryQueryKeys } from "@/shared/constants/query-keys";
import { CategoryService } from "@/shared/services/category.service";
import { useMutation } from "@tanstack/react-query";

export const useCreateCategory = () => {
  const { isPending, isError, mutateAsync } = useMutation({
    mutationKey: [ECategoryQueryKeys.CREATE],
    mutationFn: async (data: { name: string; active: boolean }) => {
      return await CategoryService.create(data);
    },
    onSuccess: () => {
      const queryClient = getQueryClient();
      queryClient.invalidateQueries({ queryKey: [ECategoryQueryKeys.GET_ALL] });
    },
  });

  const onCreateCategory = async (data: { name: string; active: boolean }) => await mutateAsync(data);

  return {
    isPending,
    isError,
    onCreateCategory,
  };
};

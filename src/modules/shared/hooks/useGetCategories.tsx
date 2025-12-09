import { ECategoryQueryKeys } from "@/shared/constants/query-keys";
import { CategoryService } from "@/shared/services/category.service";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = (params?: { page: number; size: number }) => {
  const { data, isPending, error, isLoading } = useQuery({
    queryKey: [ECategoryQueryKeys.GET_ALL],
    queryFn: () => CategoryService.getAll(params),
  });

  return {
    data,
    isPending,
    isLoading,
    error,
  };
};

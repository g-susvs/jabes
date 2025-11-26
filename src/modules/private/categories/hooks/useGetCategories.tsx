import { ECategoryQueryKeys } from "@/shared/constants/query-keys";
import { CategoryService } from "@/shared/services/category.service";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  const { data, isPending, error } = useQuery({
    queryKey: [ECategoryQueryKeys.GET_ALL],
    queryFn: () => CategoryService.getAll(),
  });

  return {
    data,
    isPending,
    error,
  };
};

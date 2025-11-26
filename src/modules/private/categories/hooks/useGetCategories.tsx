import { CategoryService } from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoryService.getAll(),
  });

  return {
    data,
    isPending,
    error,
  };
};

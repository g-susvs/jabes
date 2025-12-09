import { EProductQueryKeys } from "@/shared/constants/query-keys";
import { ProductService } from "@/shared/services/product.service";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = (params?: { page: number; size: number }) => {
  const { data, isPending, error } = useQuery({
    queryKey: [EProductQueryKeys.GET_ALL, params],
    queryFn: () => ProductService.getAll(params),
  });

  return {
    data,
    isPending,
    error,
  };
};

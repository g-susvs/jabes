import { EProductQueryKeys } from "@/shared/constants/query-keys";
import { ProductService } from "@/shared/services/product.service";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
  const { data, isPending, error } = useQuery({
    queryKey: [EProductQueryKeys.GET_ALL],
    queryFn: () => ProductService.getAll(),
  });

  return {
    data,
    isPending,
    error,
  };
};

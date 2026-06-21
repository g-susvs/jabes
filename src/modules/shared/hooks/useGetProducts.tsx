import { EProductQueryKeys } from "@/shared/constants/query-keys";
import { StrapiProductService } from "@/shared/services/strapi-product.service";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = (params?: { page: number; size: number }) => {
  const { data, isPending, error, isLoading } = useQuery({
    queryKey: [EProductQueryKeys.GET_ALL, params],
    queryFn: () => StrapiProductService.getAll(params),
  });

  return {
    data,
    isPending,
    isLoading,
    error,
  };
};


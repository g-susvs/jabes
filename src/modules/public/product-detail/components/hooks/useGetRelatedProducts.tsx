import { EProductQueryKeys } from "@/shared/constants/query-keys";
import { IProductFindParams } from "@/shared/interfaces/find-params";
import { StrapiProductService } from "@/shared/services/strapi-product.service";
import { useQuery } from "@tanstack/react-query";

export const useGetRelatedProducts = (params: IProductFindParams) => {
  const { data, isPending, error, isLoading } = useQuery({
    queryKey: [EProductQueryKeys.RELATED_PRODUCTS, params],
    queryFn: () => StrapiProductService.getAll(params),
  });

  return {
    data,
    isPending,
    isLoading,
    error,
  };
};


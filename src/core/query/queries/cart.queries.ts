import { useQuery } from '@tanstack/react-query';
import { cartApi } from '@/core/api/adapters/cart.api';
import { queryKeys } from '../query-keys';

export function useCart() {
  return useQuery({
    queryKey: queryKeys.cart.current(),
    queryFn: () => cartApi.getCart(),
  });
}

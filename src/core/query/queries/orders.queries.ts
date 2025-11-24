import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@/core/api/adapters/orders.api';
import { queryKeys } from '../query-keys';

export function useOrders(params?: { userId?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: queryKeys.orders.list(params),
    queryFn: () => ordersApi.getOrders(params),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => ordersApi.getOrderById(id),
    enabled: !!id,
  });
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi, CreateOrderDto } from '@/core/api/adapters/orders.api';
import { queryKeys } from '../query-keys';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { routesConfig } from '@/config/app.config';

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: CreateOrderDto) => ordersApi.createOrder(data),
    onSuccess: (response) => {
      if (response.success && response.data) {
        queryClient.invalidateQueries({ queryKey: queryKeys.orders.lists() });
        queryClient.invalidateQueries({ queryKey: queryKeys.cart.current() });
        toast.success('Order placed successfully!');
        navigate(routesConfig.orders.detail(response.data.id));
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to place order');
    },
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ordersApi.cancelOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.lists() });
      toast.success('Order cancelled');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to cancel order');
    },
  });
}


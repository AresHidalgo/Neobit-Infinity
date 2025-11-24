import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartApi } from '@/core/api/adapters/cart.api';
import { queryKeys } from '../query-keys';
import { useCartStore } from '@/store/cart.store';
import { toast } from 'sonner';
import { UpdateCartItemDto } from '@/core/api/adapters/cart.api';

export function useAddToCart() {
  const queryClient = useQueryClient();
  const { setCart } = useCartStore();

  return useMutation({
    mutationFn: cartApi.addToCart,
    onSuccess: (response) => {
      if (response.success && response.data) {
        setCart(response.data);
        queryClient.invalidateQueries({ queryKey: queryKeys.cart.current() });
        toast.success('Added to cart!');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to add to cart');
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  const { setCart } = useCartStore();

  return useMutation({
    mutationFn: ({ productId, data, variant }: { productId: string; data: UpdateCartItemDto; variant?: Record<string, any> }) =>
      cartApi.updateCartItem(productId, data, variant),
    onSuccess: (response) => {
      if (response.success && response.data) {
        setCart(response.data);
        queryClient.invalidateQueries({ queryKey: queryKeys.cart.current() });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update cart');
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  const { setCart } = useCartStore();

  return useMutation({
    mutationFn: ({ productId, variant }: { productId: string; variant?: Record<string, any> }) =>
      cartApi.removeFromCart(productId, variant),
    onSuccess: (response) => {
      if (response.success && response.data) {
        setCart(response.data);
        queryClient.invalidateQueries({ queryKey: queryKeys.cart.current() });
        toast.success('Removed from cart');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to remove from cart');
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();
  const { clearCart } = useCartStore();

  return useMutation({
    mutationFn: cartApi.clearCart,
    onSuccess: () => {
      clearCart();
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.current() });
      toast.success('Cart cleared');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to clear cart');
    },
  });
}

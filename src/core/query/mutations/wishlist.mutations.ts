import { useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistApi, AddToWishlistDto } from '@/core/api/adapters/wishlist.api';
import { queryKeys } from '../query-keys';
import { useWishlistStore } from '@/store/wishlist.store';
import { toast } from 'sonner';

export function useAddToWishlist() {
  const queryClient = useQueryClient();
  const { setWishlist } = useWishlistStore();

  return useMutation({
    mutationFn: (data: AddToWishlistDto) => wishlistApi.addToWishlist(data),
    onSuccess: (response) => {
      if (response.success && response.data) {
        setWishlist(response.data);
        queryClient.invalidateQueries({ queryKey: queryKeys.wishlist.current() });
        toast.success('Added to wishlist!');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to add to wishlist');
    },
  });
}

export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();
  const { setWishlist } = useWishlistStore();

  return useMutation({
    mutationFn: (productId: string) => wishlistApi.removeFromWishlist(productId),
    onSuccess: (response) => {
      if (response.success && response.data) {
        setWishlist(response.data);
        queryClient.invalidateQueries({ queryKey: queryKeys.wishlist.current() });
        toast.success('Removed from wishlist');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to remove from wishlist');
    },
  });
}


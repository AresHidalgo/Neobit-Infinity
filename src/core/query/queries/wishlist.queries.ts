import { useQuery } from '@tanstack/react-query';
import { wishlistApi } from '@/core/api/adapters/wishlist.api';
import { queryKeys } from '../query-keys';

export function useWishlist() {
  return useQuery({
    queryKey: queryKeys.wishlist.current(),
    queryFn: () => wishlistApi.getWishlist(),
  });
}


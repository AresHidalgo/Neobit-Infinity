import { useQuery } from '@tanstack/react-query';
import { reviewsApi } from '@/core/api/adapters/reviews.api';
import { queryKeys } from '../query-keys';

export function useReviewsByProduct(productId: string, params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: queryKeys.reviews.byProduct(productId, params),
    queryFn: () => reviewsApi.getReviewsByProduct(productId, params),
    enabled: !!productId,
  });
}


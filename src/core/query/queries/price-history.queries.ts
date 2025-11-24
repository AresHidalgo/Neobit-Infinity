import { useQuery } from '@tanstack/react-query';
import { priceHistoryApi } from '@/core/api/adapters/price-history.api';
import { queryKeys } from '../query-keys';

export function usePriceHistory(productId: string, params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: queryKeys.priceHistory.byProduct(productId, params),
    queryFn: () => priceHistoryApi.getPriceHistory(productId, params),
    enabled: !!productId,
  });
}

export function usePriceHistoryChart(productId: string, days?: number) {
  return useQuery({
    queryKey: queryKeys.priceHistory.chart(productId, days),
    queryFn: () => priceHistoryApi.getPriceHistoryChart(productId, days),
    enabled: !!productId,
  });
}


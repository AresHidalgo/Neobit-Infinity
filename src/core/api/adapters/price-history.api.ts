import httpClient from '../axios.client';
import { getApiUrl } from '@/config/api.config';
import { ApiResponse, PaginatedResponse } from '@/types/api.types';
import { PriceHistory, PriceHistoryChartData } from '@/types/price-history.type';

export const priceHistoryApi = {
  getPriceHistory: async (
    productId: string,
    params?: { page?: number; limit?: number },
  ): Promise<PaginatedResponse<PriceHistory>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const query = queryParams.toString();
    return httpClient.get<PriceHistory[]>(getApiUrl(`/price-history/product/${productId}${query ? `?${query}` : ''}`)) as Promise<PaginatedResponse<PriceHistory>>;
  },

  getPriceHistoryChart: async (
    productId: string,
    days?: number,
  ): Promise<ApiResponse<PriceHistoryChartData>> => {
    const query = days ? `?days=${days}` : '';
    return httpClient.get<PriceHistoryChartData>(getApiUrl(`/price-history/product/${productId}/chart${query}`));
  },
};

import httpClient from '../axios.client';
import { getApiUrl } from '@/config/api.config';
import { ApiResponse, PaginatedResponse } from '@/types/api.types';
import { Alert } from '@/types/alert.type';

export interface CreateAlertDto {
  productId: string;
  targetPrice: number;
  condition?: 'below' | 'above' | 'equal';
}

export const alertsApi = {
  getAlerts: async (params?: { page?: number; limit?: number }): Promise<PaginatedResponse<Alert>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const query = queryParams.toString();
    return httpClient.get<Alert[]>(getApiUrl(`/alerts${query ? `?${query}` : ''}`)) as Promise<PaginatedResponse<Alert>>;
  },

  createAlert: async (data: CreateAlertDto): Promise<ApiResponse<Alert>> => {
    return httpClient.post<Alert>(getApiUrl('/alerts'), data);
  },

  deleteAlert: async (id: string): Promise<ApiResponse<void>> => {
    return httpClient.delete<void>(getApiUrl(`/alerts/${id}`));
  },
};

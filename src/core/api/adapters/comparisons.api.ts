import httpClient from '../axios.client';
import { getApiUrl } from '@/config/api.config';
import { ApiResponse } from '@/types/api.types';
import { ComparisonResponse } from '@/types/comparison.type';

export interface AddToComparisonDto {
  productId: string;
}

export const comparisonsApi = {
  getComparison: async (): Promise<ApiResponse<ComparisonResponse>> => {
    return httpClient.get<ComparisonResponse>(getApiUrl('/comparisons'));
  },

  addToComparison: async (data: AddToComparisonDto): Promise<ApiResponse<ComparisonResponse>> => {
    return httpClient.post<ComparisonResponse>(getApiUrl('/comparisons'), data);
  },

  removeFromComparison: async (productId: string): Promise<ApiResponse<ComparisonResponse>> => {
    return httpClient.delete<ComparisonResponse>(getApiUrl(`/comparisons/${productId}`));
  },
};

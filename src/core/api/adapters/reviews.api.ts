import httpClient from '../axios.client';
import { getApiUrl } from '@/config/api.config';
import { ApiResponse, PaginatedResponse } from '@/types/api.types';
import { Review } from '@/types/review.type';

export interface CreateReviewDto {
  productId: string;
  rating: number;
  comment: string;
  tags?: string[];
}

export interface UpdateReviewDto {
  rating?: number;
  comment?: string;
  tags?: string[];
}

export const reviewsApi = {
  getReviewsByProduct: async (
    productId: string,
    params?: { page?: number; limit?: number },
  ): Promise<PaginatedResponse<Review>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const query = queryParams.toString();
    return httpClient.get<Review[]>(getApiUrl(`/reviews/product/${productId}${query ? `?${query}` : ''}`)) as Promise<PaginatedResponse<Review>>;
  },

  createReview: async (data: CreateReviewDto): Promise<ApiResponse<Review>> => {
    return httpClient.post<Review>(getApiUrl('/reviews'), data);
  },

  updateReview: async (id: string, data: UpdateReviewDto): Promise<ApiResponse<Review>> => {
    return httpClient.put<Review>(getApiUrl(`/reviews/${id}`), data);
  },

  deleteReview: async (id: string): Promise<ApiResponse<void>> => {
    return httpClient.delete<void>(getApiUrl(`/reviews/${id}`));
  },
};

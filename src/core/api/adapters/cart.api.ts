import httpClient from '../axios.client';
import { getApiUrl } from '@/config/api.config';
import { ApiResponse } from '@/types/api.types';
import { CartResponse } from '@/types/cart.type';

export interface AddToCartDto {
  productId: string;
  quantity: number;
  variant?: Record<string, any>;
}

export interface UpdateCartItemDto {
  quantity: number;
}

export const cartApi = {
  getCart: async (): Promise<ApiResponse<CartResponse>> => {
    return httpClient.get<CartResponse>(getApiUrl('/cart'));
  },

  addToCart: async (data: AddToCartDto): Promise<ApiResponse<CartResponse>> => {
    return httpClient.post<CartResponse>(getApiUrl('/cart'), data);
  },

  updateCartItem: async (
    productId: string,
    data: UpdateCartItemDto,
    variant?: Record<string, any>,
  ): Promise<ApiResponse<CartResponse>> => {
    const queryParams = new URLSearchParams();
    if (variant) queryParams.append('variant', JSON.stringify(variant));

    const query = queryParams.toString();
    return httpClient.put<CartResponse>(getApiUrl(`/cart/${productId}${query ? `?${query}` : ''}`), data);
  },

  removeFromCart: async (productId: string, variant?: Record<string, any>): Promise<ApiResponse<CartResponse>> => {
    const queryParams = new URLSearchParams();
    if (variant) queryParams.append('variant', JSON.stringify(variant));

    const query = queryParams.toString();
    return httpClient.delete<CartResponse>(getApiUrl(`/cart/${productId}${query ? `?${query}` : ''}`));
  },

  clearCart: async (): Promise<ApiResponse<void>> => {
    return httpClient.delete<void>(getApiUrl('/cart'));
  },
};

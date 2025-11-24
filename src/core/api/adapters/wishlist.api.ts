import httpClient from '../axios.client';
import { getApiUrl } from '@/config/api.config';
import { ApiResponse } from '@/types/api.types';
import { WishlistResponse } from '@/types/wishlist.type';

export interface AddToWishlistDto {
  productId: string;
}

export const wishlistApi = {
  getWishlist: async (): Promise<ApiResponse<WishlistResponse>> => {
    return httpClient.get<WishlistResponse>(getApiUrl('/wishlist'));
  },

  addToWishlist: async (data: AddToWishlistDto): Promise<ApiResponse<WishlistResponse>> => {
    return httpClient.post<WishlistResponse>(getApiUrl('/wishlist'), data);
  },

  removeFromWishlist: async (productId: string): Promise<ApiResponse<WishlistResponse>> => {
    return httpClient.delete<WishlistResponse>(getApiUrl(`/wishlist/${productId}`));
  },
};

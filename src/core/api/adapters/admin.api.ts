import httpClient from '../axios.client';
import { getApiUrl } from '@/config/api.config';
import { ApiResponse, PaginatedResponse } from '@/types/api.types';
import { DashboardStats } from '@/types/admin.type';
import { User } from '@/types/user.type';
import { Product } from '@/types/product.type';
import { Order } from '@/types/order.type';

export const adminApi = {
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    return httpClient.get<DashboardStats>(getApiUrl('/admin/stats'));
  },

  getUsers: async (params?: { page?: number; limit?: number }): Promise<PaginatedResponse<User>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const query = queryParams.toString();
    return httpClient.get<User[]>(getApiUrl(`/admin/users${query ? `?${query}` : ''}`)) as Promise<PaginatedResponse<User>>;
  },

  getProducts: async (params?: { page?: number; limit?: number }): Promise<PaginatedResponse<Product>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const query = queryParams.toString();
    return httpClient.get<Product[]>(getApiUrl(`/admin/products${query ? `?${query}` : ''}`)) as Promise<PaginatedResponse<Product>>;
  },

  getOrders: async (params?: { page?: number; limit?: number }): Promise<PaginatedResponse<Order>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const query = queryParams.toString();
    return httpClient.get<Order[]>(getApiUrl(`/admin/orders${query ? `?${query}` : ''}`)) as Promise<PaginatedResponse<Order>>;
  },
};

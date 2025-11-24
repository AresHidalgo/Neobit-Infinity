import httpClient from '../axios.client';
import { getApiUrl } from '@/config/api.config';
import { ApiResponse, PaginatedResponse } from '@/types/api.types';
import { Order } from '@/types/order.type';

export interface CreateOrderDto {
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: {
    type: string;
    last4?: string;
    brand?: string;
  };
  promoCode?: string;
}

export interface UpdateOrderStatusDto {
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
}

export const ordersApi = {
  createOrder: async (data: CreateOrderDto): Promise<ApiResponse<Order>> => {
    return httpClient.post<Order>(getApiUrl('/orders'), data);
  },

  getOrders: async (params?: {
    userId?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Order>> => {
    const queryParams = new URLSearchParams();
    if (params?.userId) queryParams.append('userId', params.userId);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const query = queryParams.toString();
    return httpClient.get<Order[]>(getApiUrl(`/orders${query ? `?${query}` : ''}`)) as Promise<PaginatedResponse<Order>>;
  },

  getOrderById: async (id: string): Promise<ApiResponse<Order>> => {
    return httpClient.get<Order>(getApiUrl(`/orders/${id}`));
  },

  updateOrderStatus: async (id: string, data: UpdateOrderStatusDto): Promise<ApiResponse<Order>> => {
    return httpClient.patch<Order>(getApiUrl(`/orders/${id}/status`), data);
  },

  cancelOrder: async (id: string): Promise<ApiResponse<Order>> => {
    return httpClient.patch<Order>(getApiUrl(`/orders/${id}/cancel`), {});
  },
};

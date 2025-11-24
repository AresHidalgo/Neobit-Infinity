import httpClient from '../axios.client';
import { getApiUrl } from '@/config/api.config';
import { ApiResponse } from '@/types/api.types';
import { PaymentResponse } from '@/types/payment.type';

export interface CreatePaymentDto {
  orderId: string;
  paymentMethod: string;
  paymentIntentId?: string;
}

export interface ConfirmPaymentDto {
  orderId: string;
  paymentIntentId: string;
}

export const paymentsApi = {
  createPaymentIntent: async (data: CreatePaymentDto): Promise<ApiResponse<PaymentResponse>> => {
    return httpClient.post<PaymentResponse>(getApiUrl('/payments/intent'), data);
  },

  confirmPayment: async (data: ConfirmPaymentDto): Promise<ApiResponse<PaymentResponse>> => {
    return httpClient.post<PaymentResponse>(getApiUrl('/payments/confirm'), data);
  },
};


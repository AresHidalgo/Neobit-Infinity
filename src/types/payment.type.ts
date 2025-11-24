export interface PaymentResponse {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded';
  paymentIntentId?: string;
  chargeId?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}


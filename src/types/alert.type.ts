export interface Alert {
  id: string;
  userId: string;
  productId: string;
  productName?: string;
  targetPrice: number;
  condition: 'below' | 'above' | 'equal';
  isTriggered: boolean;
  triggeredAt?: Date;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateAlertData {
  productId: string;
  targetPrice: number;
  condition?: 'below' | 'above' | 'equal';
}


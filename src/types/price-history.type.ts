export interface PriceHistory {
  id: string;
  productId: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  currency: string;
  source?: string;
  createdAt: Date;
}

export interface PriceHistoryChartData {
  history: PriceHistory[];
  currentPrice: number;
  highestPrice?: number;
  lowestPrice?: number;
  priceChangePercent?: number;
}


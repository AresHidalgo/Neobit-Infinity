export interface ComparisonProduct {
  productId: string;
  productName: string;
  price: number;
  originalPrice?: number;
  image?: string;
  rating: number;
  reviewCount: number;
  specifications?: Record<string, any>;
  addedAt: Date;
}

export interface ComparisonResponse {
  products: ComparisonProduct[];
  productCount: number;
  maxProducts: number;
}


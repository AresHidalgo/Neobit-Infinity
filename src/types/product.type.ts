export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  tags?: string[];
  images?: string[];
  variants?: {
    color?: string[];
    size?: string[];
    material?: string[];
  };
  stock: number;
  soldCount: number;
  rating: number;
  reviewCount: number;
  sellerId: string;
  isActive: boolean;
  specifications?: Record<string, any>;
  model3dUrl?: string;
  discountPercent?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  tags?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: 'price' | 'rating' | 'createdAt' | 'soldCount';
  order?: 'asc' | 'desc';
  inStock?: boolean;
}

export interface ProductSearchParams extends ProductFilters {
  page?: number;
  limit?: number;
}


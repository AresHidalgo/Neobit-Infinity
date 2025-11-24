export interface SearchFilters {
  category?: string;
  tags?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: 'price' | 'rating' | 'createdAt' | 'soldCount';
  order?: 'asc' | 'desc';
  inStock?: boolean;
}

export interface SearchParams extends SearchFilters {
  search?: string;
  page?: number;
  limit?: number;
}


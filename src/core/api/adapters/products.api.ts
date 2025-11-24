import httpClient from '../axios.client';
import { getApiUrl } from '@/config/api.config';
import { ApiResponse, PaginatedResponse } from '@/types/api.types';
import { Product } from '@/types/product.type';

export interface CreateProductDto {
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
  specifications?: Record<string, any>;
  model3dUrl?: string;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {
  isActive?: boolean;
}

export interface SearchProductDto {
  search?: string;
  category?: string;
  tags?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: 'price' | 'rating' | 'createdAt' | 'soldCount';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  inStock?: boolean;
}

export const productsApi = {
  getProducts: async (params?: SearchProductDto): Promise<PaginatedResponse<Product>> => {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('search', params.search);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.tags) params.tags.forEach((tag) => queryParams.append('tags', tag));
    if (params?.minPrice !== undefined) queryParams.append('minPrice', params.minPrice.toString());
    if (params?.maxPrice !== undefined) queryParams.append('maxPrice', params.maxPrice.toString());
    if (params?.minRating !== undefined) queryParams.append('minRating', params.minRating.toString());
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.order) queryParams.append('order', params.order);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.inStock !== undefined) queryParams.append('inStock', params.inStock.toString());

    const query = queryParams.toString();
    return httpClient.get<Product[]>(getApiUrl(`/products${query ? `?${query}` : ''}`)) as Promise<PaginatedResponse<Product>>;
  },

  getProductById: async (id: string): Promise<ApiResponse<Product>> => {
    return httpClient.get<Product>(getApiUrl(`/products/${id}`));
  },

  getFeatured: async (limit?: number): Promise<ApiResponse<Product[]>> => {
    const query = limit ? `?limit=${limit}` : '';
    return httpClient.get<Product[]>(getApiUrl(`/products/featured${query}`));
  },

  getLatest: async (limit?: number): Promise<ApiResponse<Product[]>> => {
    const query = limit ? `?limit=${limit}` : '';
    return httpClient.get<Product[]>(getApiUrl(`/products/latest${query}`));
  },

  getByCategory: async (category: string, params?: { page?: number; limit?: number }): Promise<PaginatedResponse<Product>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const query = queryParams.toString();
    return httpClient.get<Product[]>(getApiUrl(`/products/category/${category}${query ? `?${query}` : ''}`)) as Promise<PaginatedResponse<Product>>;
  },

  createProduct: async (data: CreateProductDto): Promise<ApiResponse<Product>> => {
    return httpClient.post<Product>(getApiUrl('/products'), data);
  },

  updateProduct: async (id: string, data: UpdateProductDto): Promise<ApiResponse<Product>> => {
    return httpClient.patch<Product>(getApiUrl(`/products/${id}`), data);
  },

  deleteProduct: async (id: string): Promise<ApiResponse<void>> => {
    return httpClient.delete<void>(getApiUrl(`/products/${id}`));
  },

  getMyProducts: async (params?: { page?: number; limit?: number }): Promise<PaginatedResponse<Product>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const query = queryParams.toString();
    return httpClient.get<Product[]>(getApiUrl(`/products/seller/my-products${query ? `?${query}` : ''}`)) as Promise<PaginatedResponse<Product>>;
  },
};

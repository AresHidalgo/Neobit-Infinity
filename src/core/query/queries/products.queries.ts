import { useQuery } from '@tanstack/react-query';
import { productsApi, SearchProductDto } from '@/core/api/adapters/products.api';
import { queryKeys } from '../query-keys';

export function useProducts(params?: SearchProductDto) {
  return useQuery({
    queryKey: queryKeys.products.list(params),
    queryFn: () => productsApi.getProducts(params),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => productsApi.getProductById(id),
    enabled: !!id,
  });
}

export function useFeaturedProducts(limit?: number) {
  return useQuery({
    queryKey: queryKeys.products.featured(limit),
    queryFn: () => productsApi.getFeatured(limit),
  });
}

export function useLatestProducts(limit?: number) {
  return useQuery({
    queryKey: queryKeys.products.latest(limit),
    queryFn: () => productsApi.getLatest(limit),
  });
}

export function useProductsByCategory(category: string, params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: queryKeys.products.byCategory(category, params),
    queryFn: () => productsApi.getByCategory(category, params),
    enabled: !!category,
  });
}

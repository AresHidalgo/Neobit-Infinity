import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '@/core/query/queries/products.queries';
import { SearchFilters, SearchParams } from '@/types/search.type';

export function useSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState<SearchFilters>({
    category: searchParams.get('category') || undefined,
    minPrice: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined,
    maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined,
    minRating: searchParams.get('minRating') ? parseFloat(searchParams.get('minRating')!) : undefined,
    inStock: searchParams.get('inStock') === 'true' ? true : undefined,
    sortBy: (searchParams.get('sortBy') as SearchFilters['sortBy']) || undefined,
    order: (searchParams.get('order') as 'asc' | 'desc') || 'desc',
  });

  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');

  const searchParamsForApi: SearchParams = {
    search: query,
    ...filters,
    page,
    limit,
  };

  const { data, isLoading, error } = useProducts(searchParamsForApi);

  // Update URL when filters or query change
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (filters.category) params.set('category', filters.category);
    if (filters.minPrice) params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice.toString());
    if (filters.minRating) params.set('minRating', filters.minRating.toString());
    if (filters.inStock) params.set('inStock', 'true');
    if (filters.sortBy) params.set('sortBy', filters.sortBy);
    if (filters.order) params.set('order', filters.order);
    if (page > 1) params.set('page', page.toString());
    if (limit !== 12) params.set('limit', limit.toString());

    setSearchParams(params, { replace: true });
  }, [query, filters, page, limit, setSearchParams]);

  return {
    query,
    setQuery,
    filters,
    setFilters,
    page,
    limit,
    products: data?.data || [],
    pagination: data?.meta,
    isLoading,
    error,
  };
}


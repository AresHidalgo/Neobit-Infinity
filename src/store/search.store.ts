import { create } from 'zustand';
import { SearchFilters } from '@/types/search.type';

interface SearchState {
  query: string;
  filters: SearchFilters;
  setQuery: (query: string) => void;
  setFilters: (filters: SearchFilters) => void;
  clearSearch: () => void;
}

const initialFilters: SearchFilters = {
  category: undefined,
  tags: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  minRating: undefined,
  sortBy: undefined,
  order: undefined,
  inStock: undefined,
};

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  filters: initialFilters,
  setQuery: (query) => set({ query }),
  setFilters: (filters) => set({ filters }),
  clearSearch: () => set({ query: '', filters: initialFilters }),
}));


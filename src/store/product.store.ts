import { create } from 'zustand';
import { Product } from '@/types/product.type';

interface ProductState {
  currentProduct: Product | null;
  recentProducts: Product[];
  setCurrentProduct: (product: Product) => void;
  addRecentProduct: (product: Product) => void;
  clearRecentProducts: () => void;
}

export const useProductStore = create<ProductState>()((set) => ({
  currentProduct: null,
  recentProducts: [],
  setCurrentProduct: (product) => set({ currentProduct: product }),
  addRecentProduct: (product) =>
    set((state) => {
      const filtered = state.recentProducts.filter((p) => p.id !== product.id);
      return {
        recentProducts: [product, ...filtered].slice(0, 10), // Keep last 10
      };
    }),
  clearRecentProducts: () => set({ recentProducts: [] }),
}));


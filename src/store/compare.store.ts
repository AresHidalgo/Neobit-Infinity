import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ComparisonProduct } from '@/types/comparison.type';

const MAX_COMPARISON_ITEMS = 5;

interface CompareState {
  products: ComparisonProduct[];
  productCount: number;
  maxProducts: number;
  setComparison: (comparison: { products: ComparisonProduct[]; productCount: number }) => void;
  clearCompare: () => void;
}

const initialState: CompareState = {
  products: [],
  productCount: 0,
  maxProducts: MAX_COMPARISON_ITEMS,
  setComparison: () => {},
  clearCompare: () => {},
};

export const useCompareStore = create<CompareState>()(
  persist(
    (set) => ({
      ...initialState,
      setComparison: (comparison) => set(comparison),
      clearCompare: () => set({ products: [], productCount: 0 }),
    }),
    {
      name: 'compare-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        products: state.products,
        productCount: state.productCount,
      }),
    },
  ),
);


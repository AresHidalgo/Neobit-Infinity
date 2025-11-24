import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem } from '@/types/cart.type';

interface CartState {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  setCart: (cart: {
    items: CartItem[];
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    total: number;
    itemCount: number;
  }) => void;
  clearCart: () => void;
}

const initialState: CartState = {
  items: [],
  itemCount: 0,
  subtotal: 0,
  tax: 0,
  shipping: 0,
  discount: 0,
  total: 0,
  setCart: () => {},
  clearCart: () => {},
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      ...initialState,
      setCart: (cart) => set(cart),
      clearCart: () => set(initialState),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        itemCount: state.itemCount,
        subtotal: state.subtotal,
        tax: state.tax,
        shipping: state.shipping,
        discount: state.discount,
        total: state.total,
      }),
    },
  ),
);


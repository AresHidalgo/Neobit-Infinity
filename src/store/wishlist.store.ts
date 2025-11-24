import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { WishlistItem } from '@/types/wishlist.type';

interface WishlistState {
  items: WishlistItem[];
  itemCount: number;
  setWishlist: (wishlist: { items: WishlistItem[]; itemCount: number }) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      items: [],
      itemCount: 0,
      setWishlist: (wishlist) => set(wishlist),
      clearWishlist: () => set({ items: [], itemCount: 0 }),
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        itemCount: state.itemCount,
      }),
    },
  ),
);


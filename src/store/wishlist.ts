import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface WishlistItem {
  id: string;
  name: string;
  slug: string;
  price: string;
  image: string | null;
}

interface WishlistState {
  items: WishlistItem[];
  toggleItem: (item: WishlistItem) => void;
  isItemInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (product) => {
        const wishlist = get().items;
        const findProduct = wishlist.find((p) => p.id === product.id);

        if (findProduct) {
          // Remove item
          set({ items: wishlist.filter((p) => p.id !== product.id) });
        } else {
          // Add item
          set({ items: [...wishlist, product] });
        }
      },
      isItemInWishlist: (id) => {
        return get().items.some((p) => p.id === id);
      },
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

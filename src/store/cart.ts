import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: string;
  slug: string;
  image: string | null;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const cart = get().items;
        const findProduct = cart.find((p) => p.id === product.id);

        if (findProduct) {
          findProduct.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }

        set({ items: [...cart] });
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
        } else {
          const cart = get().items;
          const findProduct = cart.find((p) => p.id === id);
          if (findProduct) {
            findProduct.quantity = quantity;
            set({ items: [...cart] });
          }
        }
      },
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'cart-storage', // unique name
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

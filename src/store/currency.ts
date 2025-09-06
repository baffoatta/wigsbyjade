import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Currency = 'USD' | 'GHS';

interface CurrencyState {
  currency: Currency;
  exchangeRate: number; // GHS per USD
  setCurrency: (currency: Currency) => void;
}

// Let's assume a fixed exchange rate for now
const GHS_PER_USD = 14.50;

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      currency: 'GHS', // Default to GHS
      exchangeRate: GHS_PER_USD,
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'currency-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

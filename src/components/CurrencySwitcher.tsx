'use client';

import { useCurrencyStore } from '@/store/currency';

const CurrencySwitcher = () => {
  const { currency, setCurrency } = useCurrencyStore();

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value as 'GHS' | 'USD');
  };

  return (
    <div>
      <select
        value={currency}
        onChange={handleCurrencyChange}
        className="p-2 border rounded-md bg-gray-100 text-gray-800"
      >
        <option value="GHS">GHS (GH₵)</option>
        <option value="USD">USD ($)</option>
      </select>
    </div>
  );
};

export default CurrencySwitcher;

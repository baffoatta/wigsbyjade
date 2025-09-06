'use client';

import { useCurrencyStore } from '@/store/currency';
import { formatPrice } from '@/lib/formatPrice';

interface PriceDisplayProps {
  priceString: string | undefined | null;
  className?: string;
}

const PriceDisplay = ({ priceString, className }: PriceDisplayProps) => {
  const { currency, exchangeRate } = useCurrencyStore();
  const displayPrice = formatPrice(priceString, currency, exchangeRate);

  return <p className={className || 'text-gray-600'}>{displayPrice}</p>;
};

export default PriceDisplay;

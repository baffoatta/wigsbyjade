type Currency = 'USD' | 'GHS';

export const formatPrice = (
  priceString: string | undefined | null,
  targetCurrency: Currency,
  exchangeRate: number
): string => {
  if (!priceString) {
    return targetCurrency === 'USD' ? '$0.00' : 'GH₵0.00';
  }

  // Assuming the price from WooCommerce is always in GHS
  const basePriceGHS = parseFloat(priceString.replace(/[^0-9.-]+/g, ''));

  if (isNaN(basePriceGHS)) {
    return targetCurrency === 'USD' ? '$0.00' : 'GH₵0.00';
  }

  let finalPrice: number;

  if (targetCurrency === 'USD') {
    finalPrice = basePriceGHS / exchangeRate;
  } else {
    finalPrice = basePriceGHS;
  }

  return new Intl.NumberFormat(targetCurrency === 'USD' ? 'en-US' : 'en-GH', {
    style: 'currency',
    currency: targetCurrency,
  }).format(finalPrice);
};

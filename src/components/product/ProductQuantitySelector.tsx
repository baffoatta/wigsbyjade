import React from "react";
import { ProductQuantitySelectorProps } from "../../types/product";

const ProductQuantitySelector: React.FC<ProductQuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  maxQuantity = 99,
  disabled = false,
}) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-md w-fit">
      <button
        onClick={handleDecrease}
        disabled={disabled || quantity <= 1}
        className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 rounded-l-md"
        aria-label="Decrease quantity"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 12H4"
          />
        </svg>
      </button>

      <div className="px-4 py-2 min-w-[60px] text-center border-x border-gray-300 bg-gray-50">
        <span className="text-lg font-medium text-gray-900">{quantity}</span>
      </div>

      <button
        onClick={handleIncrease}
        disabled={disabled || quantity >= maxQuantity}
        className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 rounded-r-md"
        aria-label="Increase quantity"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </div>
  );
};

export default ProductQuantitySelector;

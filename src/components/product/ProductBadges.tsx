import React from "react";
import { ProductBadgesProps } from "../../types/product";

const ProductBadges: React.FC<ProductBadgesProps> = ({ badges }) => {
  const badgeItems = [
    {
      key: "freeDelivery",
      label: "Free Delivery",
      icon: (
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
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
      show: badges.freeDelivery,
    },
    {
      key: "recommended",
      label: "HC Recommended",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ),
      show: badges.recommended,
    },
    {
      key: "securePayment",
      label: "100% Secure Payment",
      icon: (
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      show: badges.securePayment,
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {badgeItems.map(
        (item) =>
          item.show && (
            <div
              key={item.key}
              className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full border border-green-200"
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          )
      )}
    </div>
  );
};

export default ProductBadges;

"use client";

import React from "react";
import { ProductAccordionProps } from "../../types/product";

const ProductAccordion: React.FC<ProductAccordionProps> = ({
  items,
  onToggle,
}) => {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="border border-gray-200 rounded-md">
          <button
            onClick={() => onToggle(item.id)}
            className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 rounded-md"
            aria-expanded={item.isOpen}
            aria-controls={`accordion-content-${item.id}`}
          >
            <span className="font-medium text-gray-900">{item.title}</span>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                item.isOpen ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {item.isOpen && (
            <div
              id={`accordion-content-${item.id}`}
              className="px-4 pb-3 text-sm text-gray-600 leading-relaxed"
            >
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductAccordion;

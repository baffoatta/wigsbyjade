import React from "react";
import { ProductDescription as ProductDescriptionType } from "../../types/product";

interface ProductDescriptionProps {
  description: ProductDescriptionType;
  className?: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
  className = "",
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Section Title */}
      <h3 className="text-lg font-semibold text-gray-900">
        {description.tagline}
      </h3>

      {/* Tagline */}
      <p className="text-gray-600 italic">{description.tagline}</p>

      {/* Main Content */}
      <div className="prose prose-sm max-w-none">
        <p className="text-gray-700 leading-relaxed">{description.content}</p>
      </div>

      {/* Features List */}
      {description.features && description.features.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Key Features:</h4>
          <ul className="space-y-1">
            {description.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <svg
                  className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;

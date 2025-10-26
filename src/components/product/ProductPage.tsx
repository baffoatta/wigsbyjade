"use client";

import React from "react";
import { Product } from "../../types/product";
import ProductDetails from "./ProductDetails";
import ProductImageGallery from "./ProductImageGallery";

interface ProductPageProps {
  product: Product;
  onAddToCart?: (product: Product, quantity: number) => void;
  onBuyNow?: (product: Product, quantity: number) => void;
  className?: string;
}

const ProductPage: React.FC<ProductPageProps> = ({
  product,
  onAddToCart,
  onBuyNow,
  className = "",
}) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 py-8 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Side - Image Gallery */}
        <div className="order-1">
          <ProductImageGallery images={product.images} />
        </div>

        {/* Right Side - Product Details */}
        <div className="order-2">
          <ProductDetails
            product={product}
            onAddToCart={onAddToCart}
            onBuyNow={onBuyNow}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

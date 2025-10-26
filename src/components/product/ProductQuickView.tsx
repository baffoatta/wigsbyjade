"use client";

import React from "react";
import { Product } from "../../types/product";
import Modal from "../ui/Modal";
import ProductDetails from "./ProductDetails";
import ProductImageGallery from "./ProductImageGallery";

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product, quantity: number) => void;
  onBuyNow?: (product: Product, quantity: number) => void;
}

const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="6xl" className="p-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[600px] max-h-[80vh]">
        {/* Left Side - Image Gallery */}
        <div className="p-6 lg:p-8 lg:sticky lg:top-0 self-start">
          <ProductImageGallery images={product.images} />
        </div>

        {/* Right Side - Product Details */}
        <div className="p-6 lg:p-8 border-l border-gray-200 bg-gray-50 overflow-y-auto max-h-[80vh]">
          <ProductDetails
            product={product}
            onAddToCart={onAddToCart}
            onBuyNow={onBuyNow}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ProductQuickView;

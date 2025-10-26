"use client";

import React, { useState } from "react";
import { Product } from "../../types/product";
import PriceDisplay from "../PriceDisplay";
import Button from "../ui/Button";
import ProductAccordion from "./ProductAccordion";
import ProductBadges from "./ProductBadges";
import ProductDescription from "./ProductDescription";
import ProductQuantitySelector from "./ProductQuantitySelector";

interface ProductDetailsProps {
  product: Product;
  onAddToCart?: (product: Product, quantity: number) => void;
  onBuyNow?: (product: Product, quantity: number) => void;
  className?: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  onAddToCart,
  onBuyNow,
  className = "",
}) => {
  const [quantity, setQuantity] = useState(1);
  const [accordionItems, setAccordionItems] = useState([
    {
      id: "delivery",
      title: "DELIVERY INFO",
      content: product.deliveryInfo,
      isOpen: false,
    },
    {
      id: "returns",
      title: "FREE EXCHANGES & RETURNS",
      content: product.returnPolicy,
      isOpen: false,
    },
    {
      id: "packaging",
      title: "PRODUCT PACKAGING",
      content: product.packaging,
      isOpen: false,
    },
  ]);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleAccordionToggle = (id: string) => {
    setAccordionItems((items) =>
      items.map((item) => ({
        ...item,
        isOpen: item.id === id ? !item.isOpen : false, // Only one open at a time
      }))
    );
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
    } else {
      console.log("Add to cart:", { product: product.id, quantity });
    }
  };

  const handleBuyNow = () => {
    if (onBuyNow) {
      onBuyNow(product, quantity);
    } else {
      console.log("Buy now:", { product: product.id, quantity });
    }
  };

  const isLowStock = product.stock.quantity <= product.stock.lowStockThreshold;
  const isOutOfStock = product.stock.quantity === 0;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Product Title */}
      <h1 className="text-2xl font-semibold text-gray-900 leading-tight">
        {product.title}
      </h1>

      {/* Price */}
      <div className="text-3xl font-bold text-gray-900">
        <PriceDisplay
          priceString={`${product.currency} ${product.price.toLocaleString()}`}
        />
      </div>

      {/* Feature Badges */}
      <ProductBadges badges={product.badges} />

      {/* Quantity Selector */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <ProductQuantitySelector
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          maxQuantity={product.stock.quantity}
          disabled={isOutOfStock}
        />
      </div>

      {/* Stock Warning */}
      {isLowStock && !isOutOfStock && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-amber-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-amber-800">
              Low stock - {product.stock.quantity} item
              {product.stock.quantity !== 1 ? "s" : ""} left
            </span>
          </div>
        </div>
      )}

      {/* Out of Stock Warning */}
      {isOutOfStock && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-red-800">
              Out of stock
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="outline"
          fullWidth
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="py-4"
        >
          ADD TO CART
        </Button>

        <Button
          variant="primary"
          fullWidth
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className="py-4"
        >
          BUY IT NOW
        </Button>
      </div>

      {/* Subscription Notice */}
      {product.isRecurring && (
        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
          <p>
            By purchasing this item, you agree to our cancellation policy and
            authorize recurring charges until you cancel.
          </p>
        </div>
      )}

      {/* Accordion Sections */}
      <ProductAccordion
        items={accordionItems}
        onToggle={handleAccordionToggle}
      />

      {/* Product Description */}
      <ProductDescription description={product.description} />
    </div>
  );
};

export default ProductDetails;

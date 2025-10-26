"use client";

import Link from "next/link";
import React, { useState } from "react";
import AddToWishlistButton from "./AddToWishlistButton";
import PriceDisplay from "./PriceDisplay";

// Flexible product interface for ProductCard
interface ProductCardProduct {
  id: number;
  name: string;
  slug: string;
  price?: string;
  images?: Array<{
    src: string;
    alt?: string;
    thumbnail?: string;
  }>;
}

interface ProductCardProps {
  product: ProductCardProduct;
  onQuickView?: (productId: number) => void;
  isDesktop?: boolean;
  showQuickView?: boolean;
  showWishlist?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  isDesktop = false,
  showQuickView = true,
  showWishlist = true,
  className = "",
}) => {
  const [imageError, setImageError] = useState(false);
  const [hoverImageError, setHoverImageError] = useState(false);

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product.id);
    }
  };

  const mainImage = product.images?.[0];
  const hoverImage = product.images?.[1] || product.images?.[0];

  // Use thumbnail for faster loading if available
  const mainImageSrc = mainImage?.thumbnail || mainImage?.src;
  const hoverImageSrc = hoverImage?.thumbnail || hoverImage?.src;

  // Prepare product data for wishlist
  const productForWishlist = {
    id: product.id.toString(),
    name: product.name,
    slug: product.slug,
    price: product.price || "0",
    image: mainImageSrc || null,
  };

  return (
    <div className={`group relative bg-white ${className}`}>
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4 bg-gray-100">
          {/* Main Image */}
          {mainImageSrc && !imageError ? (
            <div
              role="img"
              aria-label={mainImage?.alt || product.name}
              className={`absolute inset-0 w-full h-full bg-center bg-cover transition-all duration-500 ease-in-out ${
                hoverImageSrc &&
                hoverImageSrc !== mainImageSrc &&
                !hoverImageError
                  ? "group-hover:opacity-0"
                  : ""
              }`}
              style={{ backgroundImage: `url(${mainImageSrc})` }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-300 rounded-lg mb-2"></div>
              <span className="text-gray-400 text-xs text-center px-2">
                {product.name.length > 30
                  ? `${product.name.substring(0, 30)}...`
                  : product.name}
              </span>
            </div>
          )}

          {/* Hover Image - Only show if different from main image */}
          {hoverImageSrc && hoverImageSrc !== mainImageSrc && (
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none"
              aria-hidden="true"
              style={{
                backgroundImage: `url(${hoverImageSrc})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )}

          {/* Wishlist Button */}
          {showWishlist && (
            <div className="absolute top-2 right-2 z-20">
              <AddToWishlistButton product={productForWishlist} />
            </div>
          )}

          {/* Quick View Button Overlay - Desktop only */}
          {isDesktop && showQuickView && onQuickView && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 pointer-events-none transition-colors duration-300 ease-in-out flex items-center justify-center">
              <button
                onClick={handleQuickView}
                className="pointer-events-auto bg-black text-white px-6 py-3 text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                Quick view
              </button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900 leading-tight">
            {product.name}
          </h3>
          <PriceDisplay priceString={product.price} />
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

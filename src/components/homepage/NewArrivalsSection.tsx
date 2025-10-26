"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { transformWCProductToProduct } from "../../lib/transformers/productTransformer";
import { type WCProduct } from "../../lib/woocommerce";
import { Product } from "../../types/product";
import ProductCard from "../ProductCard";
import ProductQuickView from "../product/ProductQuickView";

// Custom Arrow Icons
const ChevronLeftIcon: React.FC<{ className?: string }> = ({
  className = "w-6 h-6",
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const ChevronRightIcon: React.FC<{ className?: string }> = ({
  className = "w-6 h-6",
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

const NewArrivalsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [products, setProducts] = useState<WCProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "/api/products?per_page=8&orderby=date&order=desc&status=publish"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const wcProducts = await response.json();
        setProducts(wcProducts);
      } catch (err) {
        console.error("Failed to fetch new arrivals:", err);
        setError("Failed to load new arrivals");
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth; // Full width on mobile
      container.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % products.length;
    scrollToIndex(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex =
      currentIndex === 0 ? products.length - 1 : currentIndex - 1;
    scrollToIndex(prevIndex);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth;
      const newIndex = Math.round(container.scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
    }
  };

  const handleQuickView = (productId: number) => {
    const wcProduct = products.find((p) => p.id === productId);
    if (wcProduct) {
      const transformedProduct = transformWCProductToProduct(wcProduct);
      setSelectedProduct(transformedProduct);
      setIsQuickViewOpen(true);
    }
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    // TODO: Implement add to cart functionality
    console.log("Add to cart:", { product: product.id, quantity });
  };

  const handleBuyNow = (product: Product, quantity: number) => {
    // TODO: Implement buy now functionality
    console.log("Buy now:", { product: product.id, quantity });
  };

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-2">
            Quality Wigs for Every Occasion
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 uppercase tracking-wide mb-6">
            Shop New Arrivals
          </h2>
          <Link
            href="/products"
            className="inline-block border border-gray-900 px-8 py-3 text-sm font-medium text-gray-900 uppercase tracking-wide hover:bg-gray-900 hover:text-white transition-colors duration-300"
          >
            View All
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="border border-gray-900 px-6 py-2 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Products Display */}
        {!loading && !error && products.length > 0 && (
          <>
            {/* Desktop Grid View */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={handleQuickView}
                  isDesktop={isDesktop}
                  showQuickView={true}
                  showWishlist={true}
                />
              ))}
            </div>

            {/* Mobile Slider View */}
            <div className="md:hidden relative">
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                onScroll={handleScroll}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 w-full snap-center px-2"
                  >
                    <ProductCard
                      product={product}
                      onQuickView={handleQuickView}
                      isDesktop={isDesktop}
                      showQuickView={false}
                      showWishlist={true}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 z-10"
                aria-label="Previous product"
              >
                <ChevronLeftIcon className="w-6 h-6 text-gray-900" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 z-10"
                aria-label="Next product"
              >
                <ChevronRightIcon className="w-6 h-6 text-gray-900" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-6 space-x-2">
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-gray-900 w-6"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* No Products */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No new arrivals available at the moment.
            </p>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <ProductQuickView
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
    </section>
  );
};

export default NewArrivalsSection;

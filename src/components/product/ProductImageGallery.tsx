"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import PlaceholderImage from "../homepage/PlaceholderImage";

interface ProductImageGalleryProps {
  images: Array<{
    url: string;
    alt: string;
    isVideo?: boolean;
  }>;
  className?: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  className = "",
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setActiveImageIndex((prev) =>
          prev > 0 ? prev - 1 : images.length - 1
        );
      } else if (event.key === "ArrowRight") {
        setActiveImageIndex((prev) =>
          prev < images.length - 1 ? prev + 1 : 0
        );
      }
    };

    if (galleryRef.current) {
      galleryRef.current.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      const currentRef = galleryRef.current;
      if (currentRef) {
        currentRef.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [images.length]);

  const handleThumbnailClick = (index: number) => {
    setActiveImageIndex(index);
  };

  const handleImageZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const currentImage = images[activeImageIndex];

  return (
    <div className={`lg:flex lg:items-start lg:gap-4 ${className}`}>
      {/* Vertical thumbnails (desktop) */}
      {images.length > 1 && (
        <div className="hidden lg:flex lg:flex-col lg:space-y-2 lg:w-20 lg:overflow-y-auto lg:max-h-[70vh]">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                index === activeImageIndex
                  ? "border-black"
                  : "border-gray-200 hover:border-gray-400"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              {image.url ? (
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <PlaceholderImage
                  width={80}
                  height={80}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              )}
              {image.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div
        ref={galleryRef}
        className="relative aspect-square lg:aspect-auto overflow-hidden rounded-lg bg-gray-100 cursor-zoom-in w-full lg:flex-1 lg:h-[72vh] lg:max-h-[75vh]"
        onClick={handleImageZoom}
        tabIndex={0}
        role="img"
        aria-label={`Product image ${activeImageIndex + 1} of ${images.length}`}
      >
        {currentImage ? (
          <Image
            src={currentImage.url}
            alt={currentImage.alt}
            fill
            className={`object-cover transition-transform duration-300 ${
              isZoomed ? "scale-150" : "scale-100"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            priority={activeImageIndex === 0}
          />
        ) : (
          <PlaceholderImage
            width={600}
            height={600}
            alt="Product image"
            className="w-full h-full object-cover"
          />
        )}

        {/* Video Play Icon */}
        {currentImage?.isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="bg-white rounded-full p-4 shadow-lg">
              <svg
                className="w-8 h-8 text-black"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {/* Zoom Indicator */}
        {isZoomed && (
          <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
            Click to zoom out
          </div>
        )}
      </div>

      {/* Horizontal thumbnails (mobile) */}
      {images.length > 1 && (
        <div className="mt-2 flex lg:hidden space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                index === activeImageIndex
                  ? "border-black"
                  : "border-gray-200 hover:border-gray-400"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              {image.url ? (
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <PlaceholderImage
                  width={64}
                  height={64}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              )}
              {image.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="lg:hidden text-center text-sm text-gray-600 mt-1">
          {activeImageIndex + 1} of {images.length}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;

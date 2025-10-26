"use client";

import { heroSlides, trustSignals } from "@/data/heroSectionData";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Touch handlers for mobile swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Main Slider Container */}
      <div
        className="relative w-full h-full"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image - Desktop */}
            <div className="absolute inset-0 hidden md:block">
              <Image
                src={slide.backgroundImage}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Background Image - Mobile */}
            <div className="absolute inset-0 block md:hidden">
              <Image
                src={slide.mobileBackgroundImage}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-4xl mx-auto">
                {/* Mobile Layout */}
                <div className="block md:hidden">
                  {/* Subtitle */}
                  {slide.subtitle && (
                    <p className="text-white text-xs font-medium uppercase tracking-wider mb-1">
                      {slide.subtitle}
                    </p>
                  )}

                  {/* Main Title */}
                  <h1 className="text-white text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-3">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  {slide.description && (
                    <p className="text-white text-sm font-medium uppercase tracking-wide mb-4">
                      {slide.description}
                    </p>
                  )}

                  {/* Features (for slides that have them) - Mobile */}
                  {slide.features && (
                    <div className="flex flex-col gap-2 justify-center mb-4">
                      {slide.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="bg-amber-100/90 text-amber-900 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide"
                        >
                          {feature}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA Button - Mobile */}
                  <Link
                    href={slide.ctaLink}
                    className="inline-block border-2 border-white text-white px-6 py-2 text-xs font-medium uppercase tracking-wider hover:bg-white hover:text-gray-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                  >
                    {slide.ctaText}
                  </Link>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:block">
                  {/* Subtitle */}
                  {slide.subtitle && (
                    <p className="text-white text-sm sm:text-base md:text-lg font-medium uppercase tracking-wider mb-2">
                      {slide.subtitle}
                    </p>
                  )}

                  {/* Main Title */}
                  <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-tight mb-4">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  {slide.description && (
                    <p className="text-white text-lg sm:text-xl md:text-2xl font-medium uppercase tracking-wide mb-8">
                      {slide.description}
                    </p>
                  )}

                  {/* Features (for slides that have them) - Desktop */}
                  {slide.features && (
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                      {slide.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="bg-amber-100/90 text-amber-900 px-4 py-2 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wide"
                        >
                          {feature}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA Button - Desktop */}
                  <Link
                    href={slide.ctaLink}
                    className="inline-block border-2 border-white text-white px-8 py-3 sm:px-10 sm:py-4 text-sm sm:text-base font-medium uppercase tracking-wider hover:bg-white hover:text-gray-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                  >
                    {slide.ctaText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-20 md:bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${
              index === currentSlide
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows - Desktop Only */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded-full p-2 hidden md:block"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded-full p-2 hidden md:block"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Trust Signals Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-pink-500/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between text-white text-xs sm:text-sm font-medium uppercase tracking-wide">
            <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-0">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs sm:text-sm">
                {trustSignals.customers}
              </span>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-0">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs sm:text-sm">{trustSignals.reviews}</span>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs sm:text-sm">
                {trustSignals.beginnerFriendly}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Tab */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20">
        <Link
          href="/reviews"
          className="bg-pink-500/90 backdrop-blur-sm text-white p-2 sm:p-4 flex flex-col items-center space-y-1 sm:space-y-2 hover:bg-pink-600/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          aria-label="View reviews"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-xs font-medium uppercase tracking-wider writing-mode-vertical-rl">
            Reviews
          </span>
        </Link>
      </div>
    </div>
  );
};

export default HeroSlider;

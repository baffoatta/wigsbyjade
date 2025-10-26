# Hero Section Images

This directory contains the hero section slider images for both desktop and mobile views. Please add the following images based on the hero section data:

## Required Desktop Images:

1. **power-bob.jpg** - Power Bob collection hero image
2. **6x4-wigs.jpg** - 6x4 Wigs collection hero image
3. **premium-peruvian.jpg** - Premium Peruvian collection hero image
4. **vietnamese-collection.jpg** - Vietnamese Collection hero image
5. **red-carpet-collection.jpg** - Red Carpet Collection hero image

## Required Mobile Images (in `/mobile/` subdirectory):

1. **power-bob-mobile.jpg** - Power Bob collection mobile hero image
2. **6x4-wigs-mobile.jpg** - 6x4 Wigs collection mobile hero image
3. **premium-peruvian-mobile.jpg** - Premium Peruvian collection mobile hero image
4. **vietnamese-collection-mobile.jpg** - Vietnamese Collection mobile hero image
5. **red-carpet-collection-mobile.jpg** - Red Carpet Collection mobile hero image

## Image Specifications:

### Desktop Images:

- **Format**: JPG or PNG
- **Dimensions**: 1920x1080px (16:9 aspect ratio) minimum
- **File Size**: Optimize for web (under 500KB per image)
- **Quality**: High resolution for crisp display on all devices

### Mobile Images:

- **Format**: JPG or PNG
- **Dimensions**: 750x1334px (9:16 aspect ratio) for mobile portrait
- **File Size**: Optimize for web (under 300KB per image)
- **Quality**: High resolution but optimized for mobile bandwidth
- **Design**: Specifically designed for mobile view with proper text placement and mobile-friendly composition

## Usage:

These images are referenced in `/src/data/heroSectionData.ts` and will be automatically loaded by the HeroSlider component with responsive behavior:

- Desktop images show on screens ≥ 768px (md breakpoint)
- Mobile images show on screens < 768px

## Optimization Tips:

- Use Next.js Image component for automatic optimization
- Consider using WebP format for better compression
- Implement lazy loading for better performance
- Use appropriate alt text for accessibility
- Mobile images should be designed with mobile-first approach
- Ensure text overlays are readable on mobile screens
- Consider touch-friendly button sizes and spacing

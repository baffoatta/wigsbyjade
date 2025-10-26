import { Product } from "../types/product";

export const sampleProducts: Product[] = [
  {
    id: "1",
    slug: "peruvian-hd-5x5-lace-wig-water-wave-40-inch",
    title: "Peruvian HD 5x5 Lace Wig Water Wave 40 Inch",
    price: 14999,
    currency: "R",
    images: [
      {
        url: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=800&fit=crop&crop=center",
        alt: "Peruvian HD 5x5 Lace Wig Water Wave 40 Inch - Main View",
      },
      {
        url: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=800&fit=crop&crop=center",
        alt: "Peruvian HD 5x5 Lace Wig Water Wave 40 Inch - Side View",
      },
      {
        url: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=800&fit=crop&crop=center",
        alt: "Peruvian HD 5x5 Lace Wig Water Wave 40 Inch - Back View",
        isVideo: true,
      },
      {
        url: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=800&fit=crop&crop=center",
        alt: "Peruvian HD 5x5 Lace Wig Water Wave 40 Inch - Detail View",
      },
      {
        url: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=800&fit=crop&crop=center",
        alt: "Peruvian HD 5x5 Lace Wig Water Wave 40 Inch - Styling View",
      },
    ],
    badges: {
      freeDelivery: true,
      recommended: true,
      securePayment: true,
    },
    stock: {
      quantity: 1,
      lowStockThreshold: 5,
    },
    description: {
      tagline: "The definition of long hair luxury.",
      content:
        "This 40-inch Peruvian HD 5x5 Lace Wig delivers a stunning cascade of juicy, soft water waves that flow effortlessly down your back. Crafted with premium Peruvian hair and featuring a 5x5 HD lace front, this wig offers natural-looking hairline and maximum comfort.",
      features: [
        "Premium Peruvian hair for natural texture and movement",
        "5x5 HD lace front for undetectable hairline",
        "40-inch length for dramatic, flowing waves",
        "Water wave pattern for effortless styling",
        "Pre-plucked hairline for natural appearance",
        "Bleached knots for realistic scalp appearance",
        "Comes with adjustable straps for perfect fit",
        "Can be styled with heat tools up to 350°F",
      ],
    },
    deliveryInfo:
      "Free delivery on orders over R500. Standard delivery takes 3-5 business days. Express delivery available for R150.",
    returnPolicy:
      "30-day free returns and exchanges. Items must be in original condition with tags attached. Free return shipping included.",
    packaging:
      "Your wig comes in a premium gift box with care instructions, wig cap, and styling tips. Perfect for gifting or personal use.",
    isRecurring: false,
  },
  {
    id: "2",
    slug: "vietnamese-5x5-sdd-lace-wig-straight-col-1b-28-inch",
    title: "Vietnamese 5x5 SDD Lace Wig Straight Col 1B 28 Inch",
    price: 14999,
    currency: "R",
    images: [
      {
        url: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=800&fit=crop&crop=center",
        alt: "Vietnamese 5x5 SDD Lace Wig Straight Col 1B 28 Inch - Main View",
      },
      {
        url: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=800&fit=crop&crop=center",
        alt: "Vietnamese 5x5 SDD Lace Wig Straight Col 1B 28 Inch - Side View",
      },
      {
        url: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=800&fit=crop&crop=center",
        alt: "Vietnamese 5x5 SDD Lace Wig Straight Col 1B 28 Inch - Detail View",
      },
    ],
    badges: {
      freeDelivery: true,
      recommended: false,
      securePayment: true,
    },
    stock: {
      quantity: 8,
      lowStockThreshold: 5,
    },
    description: {
      tagline: "Silky straight perfection.",
      content:
        "Experience the luxury of Vietnamese hair with this stunning 28-inch straight wig. The 5x5 SDD lace front ensures a natural hairline while the silky texture provides effortless styling.",
      features: [
        "Premium Vietnamese hair for silky texture",
        "5x5 SDD lace front for natural hairline",
        "28-inch length for versatile styling",
        "Straight texture for easy maintenance",
        "Pre-plucked hairline for realistic appearance",
        "Bleached knots for undetectable scalp",
        "Adjustable straps for secure fit",
        "Heat-friendly up to 350°F",
      ],
    },
    deliveryInfo:
      "Free delivery on orders over R500. Standard delivery takes 3-5 business days.",
    returnPolicy:
      "30-day free returns and exchanges. Items must be in original condition.",
    packaging:
      "Premium gift box with care instructions and styling accessories.",
    isRecurring: false,
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return sampleProducts.find((product) => product.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return sampleProducts.find((product) => product.id === id);
};

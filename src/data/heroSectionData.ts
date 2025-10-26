export interface HeroSlide {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
  mobileBackgroundImage: string;
  features?: string[];
  isActive?: boolean;
}

export interface TrustSignals {
  customers: string;
  reviews: string;
  beginnerFriendly: string;
}

export const trustSignals: TrustSignals = {
  customers: "750K+ Customers since 2013",
  reviews: "Over 7500 Reviews",
  beginnerFriendly: "Glueless Beginner Friendly Wigs",
};

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "POWER BOB",
    subtitle: "OWN THE ROOM WITH OUR",
    ctaText: "SHOP NOW",
    ctaLink: "/products?category=bob",
    backgroundImage: "/images/hero/power-bob.jpg",
    mobileBackgroundImage: "/images/hero/mobile/power-bob-mobile.jpg",
    isActive: true,
  },
  {
    id: 2,
    title: "6X4 WIGS",
    subtitle: "MORE WAYS TO PART.",
    description: "ONE PERFECT WIG.",
    ctaText: "SHOP NOW",
    ctaLink: "/products?category=6x4",
    backgroundImage: "/images/hero/6x4-wigs.jpg",
    mobileBackgroundImage: "/images/hero/mobile/6x4-wigs-mobile.jpg",
    features: [
      "NATURAL HAIRLINE & NATURAL LOOK",
      "LIGHTWEIGHT & BREATHABLE",
      "EASY & QUICK INSTALLATION",
    ],
  },
  {
    id: 3,
    title: "PREMIUM PERUVIAN",
    subtitle: "KNOTS SO SMALL, IT'S LIKE THEY WERE NEVER THERE.",
    ctaText: "SHOP PREMIUM",
    ctaLink: "/products?category=peruvian",
    backgroundImage: "/images/hero/premium-peruvian.jpg",
    mobileBackgroundImage: "/images/hero/mobile/premium-peruvian-mobile.jpg",
  },
  {
    id: 4,
    title: "VIETNAMESE COLLECTION",
    subtitle: "OUR NEW SUPER DOUBLE DRAWN",
    ctaText: "SHOP QUALITY",
    ctaLink: "/products?category=vietnamese",
    backgroundImage: "/images/hero/vietnamese-collection.jpg",
    mobileBackgroundImage:
      "/images/hero/mobile/vietnamese-collection-mobile.jpg",
  },
  {
    id: 5,
    title: "RED CARPET COLLECTION",
    subtitle: "INTRODUCING OUR NEW",
    description: "MADE FOR SPECIAL OCCASIONS",
    ctaText: "SHOP QUALITY",
    ctaLink: "/products?category=red-carpet",
    backgroundImage: "/images/hero/red-carpet-collection.jpg",
    mobileBackgroundImage:
      "/images/hero/mobile/red-carpet-collection-mobile.jpg",
  },
];

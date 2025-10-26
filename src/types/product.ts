export interface ProductImage {
  url: string;
  alt: string;
  isVideo?: boolean;
}

export interface ProductBadges {
  freeDelivery: boolean;
  recommended: boolean;
  securePayment: boolean;
}

export interface ProductStock {
  quantity: number;
  lowStockThreshold: number;
}

export interface ProductDescription {
  tagline: string;
  content: string;
  features: string[];
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  currency: string;
  images: ProductImage[];
  badges: ProductBadges;
  stock: ProductStock;
  description: ProductDescription;
  deliveryInfo: string;
  returnPolicy: string;
  packaging: string;
  isRecurring?: boolean;
}

export interface ProductQuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  maxQuantity?: number;
  disabled?: boolean;
}

export interface ProductBadgesProps {
  badges: ProductBadges;
}

export interface ProductAccordionItem {
  id: string;
  title: string;
  content: string;
  isOpen: boolean;
}

export interface ProductAccordionProps {
  items: ProductAccordionItem[];
  onToggle: (id: string) => void;
}

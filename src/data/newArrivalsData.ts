export interface NewArrivalProduct {
  id: string;
  name: string;
  slug: string;
  price: string;
  image?: string;
  hoverImage?: string;
}

// Placeholder data for new arrivals
export const newArrivalsProducts: NewArrivalProduct[] = [
  {
    id: "1",
    name: "Peruvian HD 5x5 Lace Wig Straight NC30 22 Inch",
    slug: "peruvian-hd-5x5-lace-wig-straight-nc30-22-inch",
    price: "R 8,899.00",
    hoverImage: "hover-image-1",
  },
  {
    id: "2",
    name: "Vietnamese 5x5 SDD Lace Wig Straight Col 1B 28 Inch",
    slug: "vietnamese-5x5-sdd-lace-wig-straight-col-1b-28-inch",
    price: "R 14,999.00",
    hoverImage: "hover-image-2",
  },
  {
    id: "3",
    name: "Peruvian HD 5x5 Lace Wig Water Wave 40 Inch",
    slug: "peruvian-hd-5x5-lace-wig-water-wave-40-inch",
    price: "R 14,999.00",
    hoverImage: "hover-image-3",
  },
  {
    id: "4",
    name: "Peruvian HD 5x5 Lace Wig BL 08",
    slug: "peruvian-hd-5x5-lace-wig-bl-08",
    price: "from R 10,299.00",
    hoverImage: "hover-image-4",
  },
  {
    id: "5",
    name: "Brazilian HD 4x4 Lace Wig Curly 30 Inch",
    slug: "brazilian-hd-4x4-lace-wig-curly-30-inch",
    price: "R 12,499.00",
    hoverImage: "hover-image-5",
  },
  {
    id: "6",
    name: "Malaysian HD 5x5 Lace Wig Straight 24 Inch",
    slug: "malaysian-hd-5x5-lace-wig-straight-24-inch",
    price: "R 9,999.00",
    hoverImage: "hover-image-6",
  },
];

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: NavItem[];
}

export interface SocialIcon {
  name: string;
  href: string;
  icon: string;
}

export const utilityNavItems: NavItem[] = [
  { label: "Salon", href: "/salon" },
  { label: "6000+ Reviews", href: "/reviews" },
  { label: "Loyalty Program", href: "/loyalty" },
  { label: "Buy Now Pay Later", href: "/payment-options" },
  { label: "On Sale", href: "/sale" },
  { label: "New Arrivals", href: "/new" },
  { label: "Best Sellers", href: "/bestsellers" },
  { label: "Contact Us", href: "/contact" },
];

export const mainNavItems: NavItem[] = [
  {
    label: "SHOP HAIR",
    href: "/shop-hair",
    hasDropdown: true,
    dropdownItems: [
      { label: "All Hair", href: "/shop-hair/all" },
      { label: "Human Hair", href: "/shop-hair/human" },
      { label: "Synthetic Hair", href: "/shop-hair/synthetic" },
      { label: "Blonde Hair", href: "/shop-hair/blonde" },
      { label: "Black Hair", href: "/shop-hair/black" },
    ],
  },
  { label: "NEW", href: "/new" },
  { label: "POPULAR", href: "/popular" },
  {
    label: "ON SALE",
    href: "/sale",
    hasDropdown: true,
    dropdownItems: [
      { label: "Hair Extensions", href: "/sale/extensions" },
      { label: "Wigs", href: "/sale/wigs" },
      { label: "Accessories", href: "/sale/accessories" },
    ],
  },
  { label: "2 FOR 1", href: "/2-for-1" },
  {
    label: "BY STYLE",
    href: "/by-style",
    hasDropdown: true,
    dropdownItems: [
      { label: "Straight", href: "/by-style/straight" },
      { label: "Wavy", href: "/by-style/wavy" },
      { label: "Curly", href: "/by-style/curly" },
      { label: "Kinky", href: "/by-style/kinky" },
    ],
  },
  {
    label: "BY CAP",
    href: "/by-cap",
    hasDropdown: true,
    dropdownItems: [
      { label: "Full Lace", href: "/by-cap/full-lace" },
      { label: "Lace Front", href: "/by-cap/lace-front" },
      { label: "Monofilament", href: "/by-cap/monofilament" },
      { label: "Basic Cap", href: "/by-cap/basic" },
    ],
  },
  { label: "CARE", href: "/care" },
  {
    label: "WHY HC",
    href: "/why-hc",
    hasDropdown: true,
    dropdownItems: [
      { label: "About Us", href: "/why-hc/about" },
      { label: "Quality Promise", href: "/why-hc/quality" },
      { label: "Customer Reviews", href: "/why-hc/reviews" },
      { label: "Shipping Info", href: "/why-hc/shipping" },
    ],
  },
  { label: "LOYALTY", href: "/loyalty" },
];

export const socialIcons: SocialIcon[] = [
  {
    name: "Instagram",
    href: "https://instagram.com/wigsbyjade",
    icon: "instagram",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/wigsbyjade",
    icon: "facebook",
  },
  { name: "YouTube", href: "https://youtube.com/wigsbyjade", icon: "youtube" },
];

export const promoBanner = {
  text: "SEASON'S GLAM SALE: UP TO 40% OFF MUST-HAVE LOOKS",
  ctaText: "Shop Now",
  ctaHref: "/sale",
};

import { Product } from "../../types/product";
import { WCProduct } from "../woocommerce";

/**
 * Transforms a WooCommerce product to the internal Product type
 */
export function transformWCProductToProduct(wooProduct: WCProduct): Product {
  return transformWooCommerceProduct(wooProduct);
}

export function transformWooCommerceProduct(wooProduct: WCProduct): Product {
  // Extract features from description or meta data
  const features = extractFeatures(wooProduct);

  return {
    id: wooProduct.id.toString(),
    slug: wooProduct.slug,
    title: wooProduct.name,
    price: parseFloat(wooProduct.price || "0"),
    currency: "R",
    images: wooProduct.images.map((img) => ({
      url: img.src,
      alt: img.alt || wooProduct.name,
      isVideo: false, // You can enhance this to detect video URLs
    })),
    badges: {
      freeDelivery: parseFloat(wooProduct.price || "0") > 500,
      recommended: wooProduct.featured,
      securePayment: true,
    },
    stock: {
      quantity: wooProduct.stock_quantity || 0,
      lowStockThreshold: 5,
    },
    description: {
      tagline:
        wooProduct.short_description || extractTagline(wooProduct.description),
      content: wooProduct.description || wooProduct.short_description || "",
      features,
    },
    deliveryInfo:
      "Free delivery on orders over R500. Standard delivery takes 3-5 business days.",
    returnPolicy:
      "30-day free returns and exchanges. Items must be in original condition with tags attached.",
    packaging:
      "Your product comes in premium packaging with care instructions and styling tips.",
    isRecurring: false,
  };
}

/**
 * Extracts a tagline from the product description
 */
function extractTagline(description: string): string {
  if (!description) return "";

  // Try to extract the first sentence
  const firstSentence = description.split(".")[0];
  if (firstSentence && firstSentence.length < 100) {
    return firstSentence.trim();
  }

  // Otherwise, take the first 80 characters
  return description.substring(0, 80).trim() + "...";
}

/**
 * Extracts features from the product description or meta data
 */
function extractFeatures(wooProduct: WCProduct): string[] {
  const features: string[] = [];

  // Extract from attributes if available
  if (wooProduct.attributes && wooProduct.attributes.length > 0) {
    wooProduct.attributes.forEach((attr) => {
      if (attr.options && attr.options.length > 0) {
        features.push(`${attr.name}: ${attr.options.join(", ")}`);
      }
    });
  }

  // Extract from description if features section exists
  if (wooProduct.description) {
    const featureMatches = wooProduct.description.match(
      /(?:^|\n)\s*[-•]\s*(.+)/gm
    );
    if (featureMatches) {
      featureMatches.forEach((match) => {
        const feature = match.replace(/^[\s\n]*[-•]\s*/, "").trim();
        if (feature && !features.includes(feature)) {
          features.push(feature);
        }
      });
    }
  }

  // If no features found, create some from product data
  if (features.length === 0) {
    if (wooProduct.type) {
      features.push(`Type: ${wooProduct.type}`);
    }
    if (wooProduct.categories && wooProduct.categories.length > 0) {
      features.push(`Category: ${wooProduct.categories[0].name}`);
    }
    if (wooProduct.sold_individually) {
      features.push("Sold individually");
    }
  }

  return features.slice(0, 8); // Limit to 8 features
}

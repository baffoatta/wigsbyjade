"use client";

import ProductPage from "../../../components/product/ProductPage";
import { Product } from "../../../types/product";

interface ProductPageClientProps {
  product: Product;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const handleAddToCart = (product: Product, quantity: number) => {
    // TODO: Implement add to cart functionality
    console.log("Add to cart:", { product: product.id, quantity });
  };

  const handleBuyNow = (product: Product, quantity: number) => {
    // TODO: Implement buy now functionality
    console.log("Buy now:", { product: product.id, quantity });
  };

  return (
    <ProductPage
      product={product}
      onAddToCart={handleAddToCart}
      onBuyNow={handleBuyNow}
    />
  );
}

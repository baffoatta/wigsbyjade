'use client';

import { useCartStore } from '@/store/cart';

// The product prop will be a subset of the full product type
interface ProductForCart {
  id: string;
  name: string;
  price: string;
  slug: string;
  image: string | null;
}

interface ProductActionsProps {
  product: ProductForCart;
}

const ProductActions = ({ product }: ProductActionsProps) => {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(product);
    // Optional: Show a toast or confirmation message
    alert(`${product.name} added to cart!`);
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="bg-pink-500 text-white font-bold py-3 px-8 rounded-full hover:bg-pink-600 transition duration-300"
    >
      Add to Cart
    </button>
  );
};

export default ProductActions;

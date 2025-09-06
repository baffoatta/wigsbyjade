'use client';

import { useWishlistStore, WishlistItem } from '@/store/wishlist';

interface AddToWishlistButtonProps {
  product: WishlistItem;
  className?: string;
}

const AddToWishlistButton = ({ product, className }: AddToWishlistButtonProps) => {
  const { toggleItem, isItemInWishlist } = useWishlistStore();
  const inWishlist = isItemInWishlist(product.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation if the button is inside a Link
    e.stopPropagation();
    toggleItem(product);
  };

  return (
    <button
      onClick={handleToggle}
      className={`absolute top-2 right-2 p-2 rounded-full bg-white/70 hover:bg-white transition ${className}`}
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 ${inWishlist ? 'text-red-500' : 'text-gray-500'}`}
        fill={inWishlist ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z"
        />
      </svg>
    </button>
  );
};

export default AddToWishlistButton;

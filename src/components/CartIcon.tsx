'use client';

import { useCartStore } from '@/store/cart';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const CartIcon = () => {
  const { items } = useCartStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Link href="/cart" className="relative text-gray-600 hover:text-gray-800">
      {/* You can use an SVG icon here */}
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
      {isClient && totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;

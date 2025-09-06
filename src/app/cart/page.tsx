'use client';

import { useCartStore } from '@/store/cart';
import Image from 'next/image';
import Link from 'next/link';
import { useCurrencyStore } from '@/store/currency';
import { formatPrice } from '@/lib/formatPrice';

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const { currency, exchangeRate } = useCurrencyStore();

  const getSubtotal = () => {
    return items.reduce((acc, item) => {
      // Assuming item.price is always in GHS from the backend
      const priceGHS = parseFloat(item.price.replace(/[^0-9.-]+/g,""));
      return acc + priceGHS * item.quantity;
    }, 0);
  };

  const subtotalGHS = getSubtotal();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="text-center">
          <p className="text-xl mb-4">Your cart is empty.</p>
          <Link href="/products" className="bg-pink-500 text-white font-bold py-3 px-8 rounded-full hover:bg-pink-600 transition duration-300">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center border-b border-gray-200 py-4">
                <div className="relative w-24 h-24 mr-4">
                  <Image
                    src={item.image || '/placeholder.svg'}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <Link href={`/products/${item.slug}`} className="font-semibold hover:underline">{item.name}</Link>
                  <p className="text-gray-600">{formatPrice(item.price, currency, exchangeRate)}</p>
                  <button onClick={() => removeItem(item.id)} className="text-red-500 hover:underline text-sm">Remove</button>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                    className="w-16 text-center border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{formatPrice(subtotalGHS.toString(), currency, exchangeRate)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-xl border-t border-gray-300 pt-4 mt-4">
              <span>Total</span>
              <span>{formatPrice(subtotalGHS.toString(), currency, exchangeRate)}</span>
            </div>
            <Link href="/checkout" className="block text-center w-full mt-6 bg-pink-500 text-white font-bold py-3 rounded-full hover:bg-pink-600 transition duration-300">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

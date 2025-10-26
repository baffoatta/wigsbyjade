"use client";

import ProductCard from "@/components/ProductCard";
import { useWishlistStore } from "@/store/wishlist";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WishlistPage() {
  const router = useRouter();
  const { items } = useWishlistStore();

  useEffect(() => {
    const token = Cookies.get("auth-token");
    if (!token) {
      router.push("/account/login");
    }
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Wishlist</h1>
      {items.length === 0 ? (
        <div className="text-center">
          <p className="text-xl mb-4">Your wishlist is empty.</p>
          <Link
            href="/products"
            className="bg-pink-500 text-white font-bold py-3 px-8 rounded-full hover:bg-pink-600 transition duration-300"
          >
            Find Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {items.map((item) => {
            // Convert wishlist item to ProductCard format
            const productForCard = {
              id: parseInt(item.id),
              name: item.name,
              slug: item.slug,
              price: item.price,
              images: item.image
                ? [
                    {
                      src: item.image,
                      alt: item.name,
                      thumbnail: item.image,
                    },
                  ]
                : [],
            };
            return (
              <ProductCard
                key={item.id}
                product={productForCard}
                showQuickView={false}
                showWishlist={true}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

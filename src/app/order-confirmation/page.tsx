"use client";

import { useCartStore } from "@/store/cart";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCartStore();

  const paymentStatus = searchParams.get("redirect_status");

  useEffect(() => {
    // Clear the cart only when the payment was successful
    if (paymentStatus === "succeeded") {
      clearCart();
    }
  }, [paymentStatus, clearCart]);

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      {paymentStatus === "succeeded" ? (
        <>
          <h1 className="text-4xl font-bold text-green-600 mb-4">Thank You!</h1>
          <p className="text-xl text-gray-700 mb-8">
            Your order has been placed successfully.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Payment Failed
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            There was an issue with your payment. Please try again.
          </p>
        </>
      )}
      <Link
        href="/products"
        className="bg-pink-500 text-white font-bold py-3 px-8 rounded-full hover:bg-pink-600 transition duration-300"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-12 text-center">
          Loading...
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}

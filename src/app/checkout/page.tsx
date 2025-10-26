"use client";

import CheckoutForm from "@/components/checkout/CheckoutForm";
import stripePromise from "@/lib/stripe";
import { useCartStore } from "@/store/cart";
import { useCurrencyStore } from "@/store/currency";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const { items } = useCartStore();
  const { currency, exchangeRate } = useCurrencyStore();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const totalGHS = items.reduce((acc, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
      return acc + price * item.quantity;
    }, 0);

    if (totalGHS > 0) {
      let amountForStripe;
      if (currency === "USD") {
        amountForStripe = totalGHS / exchangeRate;
      } else {
        amountForStripe = totalGHS;
      }

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(amountForStripe * 100), // amount in cents
          currency: currency.toLowerCase(), // Stripe expects lowercase currency codes
        }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [items, currency, exchangeRate]);

  const appearance = {
    theme: "stripe" as const,
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
      <div className="max-w-lg mx-auto">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
        {!clientSecret && items.length > 0 && <p>Loading payment form...</p>}
        {items.length === 0 && (
          <p>Your cart is empty. Add some products to checkout.</p>
        )}
      </div>
    </div>
  );
}

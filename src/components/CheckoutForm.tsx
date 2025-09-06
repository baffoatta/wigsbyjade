'use client';

import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/order-confirmation`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("An unexpected error occurred.");
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
      {/* Add shipping form fields here */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        <input type="text" placeholder="Full Name" className="p-2 border rounded" required />
        <input type="email" placeholder="Email" className="p-2 border rounded" required />
        <input type="text" placeholder="Address" className="p-2 border rounded" required />
        <input type="text" placeholder="City" className="p-2 border rounded" required />
        <input type="text" placeholder="Country" className="p-2 border rounded" required />
      </div>

      <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
      <PaymentElement />
      <button disabled={isProcessing || !stripe || !elements} id="submit" className="w-full mt-6 bg-pink-500 text-white font-bold py-3 rounded-full hover:bg-pink-600 transition duration-300 disabled:opacity-50">
        <span id="button-text">
          {isProcessing ? "Processing..." : "Pay now"}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {errorMessage && <div id="payment-message" className="text-red-500 mt-2">{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;

import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(request: Request) {
  try {
    const { amount, currency } = await request.json();

    if (amount === undefined || currency === undefined) {
      return NextResponse.json(
        { error: "Amount and currency are required" },
        { status: 400 }
      );
    }

    if (!["usd", "ghs"].includes(currency)) {
      return NextResponse.json({ error: "Invalid currency" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

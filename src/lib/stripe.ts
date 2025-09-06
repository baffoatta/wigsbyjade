import { loadStripe } from '@stripe/stripe-js';

// Make sure to replace with your actual publishable key in .env.local
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default stripePromise;

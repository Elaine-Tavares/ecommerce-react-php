// src/components/Checkout/Checkout.jsx
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ComprarForm from "../components/ComprarForm";
import { Helmet } from "react-helmet";

// sua chave pública do Stripe (test key)
const stripePromise = loadStripe("pk_test_51RpTT8BXYXcVjJgwSBhMlYrKEflfvt2A1WnqIT1QXF1Xqqthp4YCmqm4twFW2yb5mLwNuXybMkFBzUrVeVtzNjpV00A1tXbIU5");

export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <Helmet>
        <title>Finalizar compra | Elaine's Charm</title>
        <meta name="description" content="Revise seus produtos e finalize sua compra com segurança na Elaine's Charm." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <ComprarForm/>
    </Elements>
  );
}

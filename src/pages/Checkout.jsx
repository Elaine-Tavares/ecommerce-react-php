// src/components/Checkout/Checkout.jsx
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ComprarForm from "../components/ComprarForm";

// sua chave pública do Stripe (test key)
const stripePromise = loadStripe("pk_test_51RpTT8BXYXcVjJgwSBhMlYrKEflfvt2A1WnqIT1QXF1Xqqthp4YCmqm4twFW2yb5mLwNuXybMkFBzUrVeVtzNjpV00A1tXbIU5");

export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <ComprarForm/>
    </Elements>
  );
}

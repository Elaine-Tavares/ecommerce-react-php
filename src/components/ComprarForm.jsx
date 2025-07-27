// src/components/Checkout/CheckoutForm.jsx
import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";


export default function ComprarForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    if (paymentMethod === "card") {
      // Exemplo: pegar clientSecret do seu backend aqui
      const clientSecret = "client_secret_from_backend";

      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement }
      });

      if (error) {
        setMessage(error.message);
      } else if (paymentIntent?.status === "succeeded") {
        setMessage("Pagamento realizado com sucesso!");
      }
    } else {
      setMessage("Método de pagamento ainda não implementado.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Escolha a forma de pagamento</h3>
      <select onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod}>
        <option value="card">Cartão de Crédito</option>
        <option value="boleto">Boleto</option>
        <option value="pix">Pix</option>
      </select>

      {paymentMethod === "card" && (
        <div style={{ margin: "20px 0" }}>
          <CardElement options={{ hidePostalCode: true }} />
        </div>
      )}

      <button type="submit" disabled={!stripe}>Pagar</button>
      {message && <p>{message}</p>}
    </form>
  );
}

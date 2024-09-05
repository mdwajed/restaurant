"use client";
import CheckoutForm from "@/Components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
const PaymentPage = ( { params }) => {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = params;
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/create-intent/${id}`,
          {
            method: "POST",
          }
        );
        const data = await res.json();
        console.log(data);
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, [id]);
  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };
  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default PaymentPage;

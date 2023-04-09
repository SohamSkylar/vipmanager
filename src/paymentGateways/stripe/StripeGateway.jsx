import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useState } from "react";
import { useEffect } from "react";

const StripeGateway = () => {
  const stripePromise = loadStripe(
    "pk_test_51MhcS0SEQsEMOguBBH6PnGCz8nCNfhGfpZo42EIfBV9MBTykymiJd6tSCsTeFwycvzrJbEcqQILBrKwq44j7ky7j00CZmJq9ds"
  );
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    fetch("http://localhost:8001/api/payments/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <div className="container bg-slate-400 w-full mx-auto">
        <div className="w-3/5 m-auto h-screen justify-center items-center grid grid-cols-1">
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
      </div>
    </div>
  );
};

export default StripeGateway;

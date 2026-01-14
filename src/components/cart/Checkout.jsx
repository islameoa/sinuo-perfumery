import React, { useEffect, useMemo, useState } from "react";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

// Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";

// PayPal
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function StripePay({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const onPay = async () => {
    setMsg("");
    if (!stripe || !elements) return;
    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout-success`,
      },
    });

    if (error) setMsg(error.message || "Payment failed.");
    setLoading(false);
  };

  return (
    <div className="border border-white/10 bg-white/5 rounded-2xl p-6">
      <p className="uppercase tracking-[0.22em] text-[12px] text-white/60 mb-4">
        Card / Apple Pay / Google Pay
      </p>

      <PaymentElement />

      {msg && <p className="mt-4 text-sm text-white/70">{msg}</p>}

      <button
        onClick={onPay}
        disabled={!stripe || loading}
        className="
          mt-6 w-full px-6 py-3 rounded-lg uppercase
          bg-[#321f12] text-white border border-white/15
          transition hover:bg-black/30
          disabled:opacity-60
        "
      >
        {loading ? "Processing…" : "Pay with Stripe"}
      </button>
    </div>
  );
}

export default function Checkout() {
  const { items, total, clear } = useCart();
  const [clientSecret, setClientSecret] = useState(null);

  const elementsOptions = useMemo(
    () => ({
      clientSecret,
      appearance: {
        theme: "night",
      },
    }),
    [clientSecret]
  );

  useEffect(() => {
    // Si no hay items, no creamos intent
    if (items.length === 0) return;

    (async () => {
      const r = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await r.json();
      setClientSecret(data.clientSecret);
    })();
  }, [items]);

  return (
    <section className="min-h-screen bg-[#4e0808] text-white px-6 md:px-20 pt-28 pb-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Summary */}
        <div>
          <p className="uppercase tracking-[0.35em] text-[12px] text-white/60 mb-6">
            Checkout
          </p>

          <h1 className="text-[10vw] sm:text-[7vw] md:text-[4vw] uppercase leading-[0.95]">
            your order.
          </h1>

          <div className="mt-10 border border-white/10 bg-white/5 rounded-2xl p-6">
            {items.length === 0 ? (
              <p className="text-white/70">Cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {items.map((it) => (
                  <div key={`${it.id}__${it.variant || ""}`} className="flex justify-between gap-4">
                    <div>
                      <p className="uppercase tracking-[0.12em]">{it.name}</p>
                      <p className="text-white/60 text-xs uppercase tracking-[0.18em]">
                        {it.variant} • Qty {it.qty}
                      </p>
                    </div>
                    <p>€{(it.price * it.qty).toFixed(2)}</p>
                  </div>
                ))}

                <div className="pt-4 border-t border-white/10 flex justify-between">
                  <p className="uppercase tracking-[0.22em] text-[12px] text-white/70">
                    Total
                  </p>
                  <p className="text-lg">€{total.toFixed(2)}</p>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/shop"
            className="inline-flex mt-6 text-white/70 hover:text-white transition"
          >
            ← Back to shop
          </Link>
        </div>

        {/* Payments */}
        <div className="space-y-8">
          {/* PayPal */}
          <div className="border border-white/10 bg-white/5 rounded-2xl p-6">
            <p className="uppercase tracking-[0.22em] text-[12px] text-white/60 mb-4">
              PayPal
            </p>

            <PayPalScriptProvider options={{ clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID, currency: "EUR" }}>
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={async () => {
                  const r = await fetch("/api/paypal/create-order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ items }),
                  });
                  const data = await r.json();
                  return data.id; // orderID
                }}
                onApprove={async (data) => {
                  await fetch("/api/paypal/capture-order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ orderID: data.orderID }),
                  });
                  clear();
                  window.location.href = "/checkout-success";
                }}
              />
            </PayPalScriptProvider>
          </div>

          {/* Stripe */}
          {clientSecret ? (
            <Elements stripe={stripePromise} options={elementsOptions}>
              <StripePay clientSecret={clientSecret} />
            </Elements>
          ) : (
            <div className="border border-white/10 bg-white/5 rounded-2xl p-6 text-white/70">
              Loading payment options…
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
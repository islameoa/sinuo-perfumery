import React, { useEffect, useMemo, useState } from "react";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

// Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";

// PayPal
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PERFUME_IMAGE = "/assets/images/packagingClean.png";

const STRIPE_PK = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
const PAYPAL_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID;

const stripePromise = STRIPE_PK ? loadStripe(STRIPE_PK) : null;

function StripePay() {
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
      confirmParams: { return_url: `${window.location.origin}/checkout-success` },
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

      {/* ✅ Swap colors */}
      <button
        onClick={onPay}
        disabled={!stripe || loading}
        className="
          mt-6 w-full px-6 py-3 rounded-lg uppercase
          bg-[#faf6ef] text-black border border-white/15
          transition-all duration-300 ease-out
          hover:bg-transparent hover:text-white
          hover:-translate-y-[1px] hover:shadow-lg
          active:translate-y-0 active:shadow-md
          disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none
        "
      >
        {loading ? "Processing…" : "Pay now"}
      </button>
    </div>
  );
}

export default function Checkout() {
  const { items, total, clear, addItem } = useCart();
  const hasItems = items.length > 0;

  const stripeEnabled = Boolean(stripePromise);
  const paypalEnabled = Boolean(PAYPAL_ID);

  const [clientSecret, setClientSecret] = useState(null);
  const [stripeReady, setStripeReady] = useState(false);

  const quickAdd = (variant) => {
    const price = variant === "2ml" ? 9 : 119;
    addItem({
      id: "sinuo-diaspora",
      name: "Sinuo Diaspora",
      variant,
      price,
      qty: 1,
    });
  };

  const elementsOptions = useMemo(() => {
    if (!clientSecret) return null;

    return {
      clientSecret,
      appearance: {
        theme: "night",
        variables: {
          colorPrimary: "#faf6ef",
          colorBackground: "rgba(255,255,255,0.06)",
          colorText: "#faf6ef",
          colorDanger: "#ff6b6b",
          borderRadius: "12px",
          spacingUnit: "6px",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
        },
        rules: {
          ".Input": {
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "none",
            backgroundColor: "rgba(255,255,255,0.06)",
          },
          ".Input:focus": {
            border: "1px solid rgba(250,246,239,0.55)",
          },
          ".Label": {
            color: "rgba(250,246,239,0.75)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontSize: "12px",
          },
          ".Tab, .Block": {
            backgroundColor: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "14px",
          },
        },
      },
    };
  }, [clientSecret]);

  // ✅ Create payment intent only when needed
  useEffect(() => {
    if (!hasItems || !stripeEnabled) {
      setClientSecret(null);
      setStripeReady(true);
      return;
    }

    setStripeReady(false);
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 12000);

    (async () => {
      try {
        const r = await fetch("/api/stripe/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
          signal: ctrl.signal,
        });

        if (!r.ok) throw new Error("Stripe unavailable");
        const data = await r.json();
        setClientSecret(data?.clientSecret || null);
      } catch {
        setClientSecret(null);
      } finally {
        clearTimeout(t);
        setStripeReady(true);
      }
    })();

    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [hasItems, stripeEnabled, items]);

  const showPayPal = paypalEnabled && hasItems;
  const showStripe = stripeEnabled && hasItems && Boolean(clientSecret);
  const showStripeLoading = stripeEnabled && hasItems && !stripeReady;

  return (
    <section className="min-h-screen bg-[#4e0808] text-white px-6 md:px-20 pt-28 pb-24">
      <div className="justify-center">
        <div>
          <Link to="/shop" className="inline-flex text-white/70 hover:text-white transition float-right">
            ← Back to shop
          </Link>
          <p className="uppercase tracking-[0.35em] text-[12px] text-white/60 mb-6">
            Checkout
          </p>

          <h1 className="text-[10vw] sm:text-[7vw] md:text-[4vw] uppercase leading-[0.95]">
            your order.
          </h1>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between pt-16 gap-8 w-full xl:w-3/4 mx-auto">
          <div className="border border-white/10 bg-white/5 rounded-2xl p-6 w-full md:w-1/2">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 mb-6">
              <img
                src={PERFUME_IMAGE}
                alt="Sinuo Diaspora"
                className="w-full h-[220px] object-cover"
                draggable="false"
              />
            </div>

            {!hasItems ? (
              <div className="space-y-4">
                <p className="text-white/70">Cart is empty.</p>
                <div className="border border-white/10 bg-white/5 rounded-2xl p-4">
                  <p className="uppercase tracking-[0.22em] text-[11px] text-white/60 mb-3">
                    Quick add
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => quickAdd("2ml")}
                      className="
                        flex-1 px-4 py-3 rounded-lg uppercase text-sm
                        bg-[#faf6ef] text-black border border-white/15
                        transition-all duration-300 ease-out
                        hover:bg-transparent hover:text-white
                      "
                    >
                      2ml <span className="opacity-70">€9</span>
                    </button>
                    <button
                      onClick={() => quickAdd("100ml")}
                      className="
                        flex-1 px-4 py-3 rounded-lg uppercase text-sm
                        bg-[#faf6ef] text-black border border-white/15
                        transition-all duration-300 ease-out
                        hover:bg-transparent hover:text-white
                      "
                    >
                      100ml <span className="opacity-70">€119</span>
                    </button>
                  </div>
                </div>
              </div>
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
                  <p className="uppercase tracking-[0.22em] text-[12px] text-white/70">Total</p>
                  <p className="text-lg">€{total.toFixed(2)}</p>
                </div>
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-6 ml-0 md:ml-8">
            {!hasItems && (
              <div>
                {/* <div className="border border-white/10 bg-white/5 rounded-2xl p-6">
                  <p className="uppercase tracking-[0.22em] text-[12px] text-white/60 mb-4">
                    Payment
                  </p>
                  <p className="text-white/70 mb-5">Add an item to unlock payment methods.</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => quickAdd("2ml")}
                      className="
                        flex-1 px-4 py-3 rounded-lg uppercase text-sm
                        bg-[#faf6ef] text-black border border-white/15
                        transition-all duration-300 ease-out
                        hover:bg-transparent hover:text-white
                      "
                    >
                      2ml €9
                    </button>
                    <button
                      onClick={() => quickAdd("100ml")}
                      className="
                        flex-1 px-4 py-3 rounded-lg uppercase text-sm
                        bg-[#faf6ef] text-black border border-white/15
                        transition-all duration-300 ease-out
                        hover:bg-transparent hover:text-white
                      "
                    >
                      100ml €119
                    </button>
                  </div>
                </div> */}
              </div>
            )}

            {showPayPal && (
              <div className="border border-white/10 bg-white/5 rounded-2xl p-6 relative z-[1]">
                <p className="uppercase tracking-[0.22em] text-[12px] text-white/60 mb-4">
                  PayPal
                </p>

                <PayPalScriptProvider options={{ clientId: PAYPAL_ID, currency: "EUR" }}>
                  <div className="relative z-[1]">
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      createOrder={async () => {
                        const r = await fetch("/api/paypal/create-order", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ items }),
                        });
                        const data = await r.json();
                        return data.id;
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
                  </div>
                </PayPalScriptProvider>
              </div>
            )}

            {showStripe && elementsOptions ? (
              <Elements stripe={stripePromise} options={elementsOptions}>
                <StripePay />
              </Elements>
            ) : showStripeLoading ? (
              <div className="border border-white/10 bg-white/5 rounded-2xl p-6 text-white/70">
                Loading payment options…
              </div>
            ) : null}

            {hasItems && !showPayPal && !showStripe && !showStripeLoading && (
              <div className="border border-white/10 bg-white/5 rounded-2xl p-6 text-white/70">
                No payment methods available right now.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
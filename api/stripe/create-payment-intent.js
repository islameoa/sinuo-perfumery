// api/stripe/create-payment-intent.js
const Stripe = require("stripe");
const crypto = require("crypto");
const { readJson } = require("../_lib/body");
const { calcTotalCentsEUR } = require("../_lib/pricing");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, message: "Method not allowed" });

  try {
    const sk = process.env.STRIPE_SECRET_KEY;
    if (!sk) return res.status(500).json({ ok: false, message: "Stripe not configured" });

    const stripe = new Stripe(sk);

    const body = await readJson(req);
    const items = body?.items;
    const amount = calcTotalCentsEUR(items);
    if (amount <= 0) return res.status(400).json({ ok: false, message: "Empty cart" });

    const orderId = crypto.randomUUID();

    const intent = await stripe.paymentIntents.create(
      {
        amount,
        currency: "eur",
        automatic_payment_methods: { enabled: true },
        metadata: { orderId },
      },
      { idempotencyKey: orderId }
    );

    return res.json({ ok: true, clientSecret: intent.client_secret, orderId });
  } catch (e) {
    return res.status(400).json({ ok: false, message: e?.message || "Stripe error" });
  }
};
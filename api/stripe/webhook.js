// api/stripe/webhook.js
const Stripe = require("stripe");
const { readRawBody } = require("../_lib/body");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  try {
    const sk = process.env.STRIPE_SECRET_KEY;
    const whsec = process.env.STRIPE_WEBHOOK_SECRET;
    if (!sk || !whsec) return res.status(500).send("Stripe not configured");

    const stripe = new Stripe(sk);

    const sig = req.headers["stripe-signature"];
    if (!sig) return res.status(400).send("Missing stripe-signature");

    const rawBody = await readRawBody(req);

    const event = stripe.webhooks.constructEvent(rawBody, sig, whsec);

    // ✅ Aquí puedes guardar en DB externa / enviar email / etc.
    // Por ahora lo dejamos “ready” y correcto.
    if (event.type === "payment_intent.succeeded") {
      const pi = event.data.object;
      // pi.metadata.orderId
      // console.log("✅ paid", pi.id, pi.metadata);
    }

    if (event.type === "payment_intent.payment_failed") {
      const pi = event.data.object;
      // console.log("❌ failed", pi.id, pi.metadata);
    }

    return res.json({ received: true });
  } catch (e) {
    return res.status(400).send(`Webhook Error: ${e.message}`);
  }
};
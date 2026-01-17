import "dotenv/config";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import Stripe from "stripe";
import Database from "better-sqlite3";
import crypto from "crypto";

const app = express();
const PORT = process.env.PORT || 3001;

// -----------------------------
// Security hardening
// -----------------------------
app.set("trust proxy", 1);
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// -----------------------------
// DB (SQLite) — simple + robust
// -----------------------------
const db = new Database("./sinuo.sqlite");
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    provider TEXT NOT NULL,              -- 'stripe' | 'paypal'
    provider_ref TEXT,                   -- payment_intent_id | paypal_order_id
    currency TEXT NOT NULL,
    amount_cents INTEGER NOT NULL,
    status TEXT NOT NULL,                -- 'created'|'pending'|'paid'|'failed'
    items_json TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  );
`);

// -----------------------------
// Pricing: server is source of truth
// -----------------------------
const PRICE_TABLE_EUR = {
  "sinuo-diaspora__2ml": 9,
  "sinuo-diaspora__100ml": 119,
};

function itemKey(it) {
  const id = String(it?.id || "").trim();
  const variant = String(it?.variant || "").trim();
  return `${id}__${variant}`;
}

function calcTotalCentsEUR(items) {
  if (!Array.isArray(items) || items.length === 0) return 0;

  let total = 0;
  for (const it of items) {
    const key = itemKey(it);
    const unit = PRICE_TABLE_EUR[key];
    if (typeof unit !== "number") throw new Error(`Unknown product/variant: ${key}`);

    const qty = Math.max(1, Math.min(99, Number(it?.qty || 1)));
    total += Math.round(unit * 100) * qty;
  }
  return total;
}

function now() {
  return Date.now();
}

function createOrder({ provider, currency, amount_cents, items, provider_ref = null }) {
  const id = crypto.randomUUID();
  const t = now();
  db.prepare(
    `INSERT INTO orders (id, provider, provider_ref, currency, amount_cents, status, items_json, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(id, provider, provider_ref, currency, amount_cents, "pending", JSON.stringify(items), t, t);
  return id;
}

function setOrderPaidByProviderRef(provider, provider_ref) {
  const t = now();
  db.prepare(
    `UPDATE orders SET status='paid', updated_at=? WHERE provider=? AND provider_ref=?`
  ).run(t, provider, provider_ref);
}

function setOrderFailedByProviderRef(provider, provider_ref) {
  const t = now();
  db.prepare(
    `UPDATE orders SET status='failed', updated_at=? WHERE provider=? AND provider_ref=?`
  ).run(t, provider, provider_ref);
}

// -----------------------------
// Stripe
// -----------------------------
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

// ✅ Stripe webhook needs RAW body (no json parser here)
app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    try {
      if (!stripe) return res.status(500).send("Stripe not configured");

      const sig = req.headers["stripe-signature"];
      const whsec = process.env.STRIPE_WEBHOOK_SECRET;
      if (!sig || !whsec) return res.status(400).send("Missing webhook signature/secret");

      // Stripe requires raw body for signature verification  [oai_citation:4‡Stripe Docs](https://docs.stripe.com/webhooks?utm_source=chatgpt.com)
      const event = stripe.webhooks.constructEvent(req.body, sig, whsec);

      // Handle events
      if (event.type === "payment_intent.succeeded") {
        const pi = event.data.object;
        setOrderPaidByProviderRef("stripe", pi.id);
      }

      if (event.type === "payment_intent.payment_failed") {
        const pi = event.data.object;
        setOrderFailedByProviderRef("stripe", pi.id);
      }

      return res.json({ received: true });
    } catch (e) {
      return res.status(400).send(`Webhook Error: ${e.message}`);
    }
  }
);

// For all other routes we can use JSON
app.use(express.json());

// Create PaymentIntent + create order in DB
app.post("/api/stripe/create-payment-intent", async (req, res) => {
  try {
    if (!stripe) return res.status(500).json({ ok: false, message: "Stripe not configured" });

    const items = req.body?.items;
    const amount = calcTotalCentsEUR(items);
    if (amount <= 0) return res.status(400).json({ ok: false, message: "Empty cart" });

    // Create order first
    const orderId = createOrder({
      provider: "stripe",
      currency: "eur",
      amount_cents: amount,
      items,
    });

    // Idempotency: use orderId so retries don't double create
    const intent = await stripe.paymentIntents.create(
      {
        amount,
        currency: "eur",
        automatic_payment_methods: { enabled: true }, // Payment Element decides ApplePay/GooglePay/card  [oai_citation:5‡Stripe Docs](https://docs.stripe.com/payments/payment-element?utm_source=chatgpt.com)
        metadata: { orderId },
      },
      { idempotencyKey: orderId }
    );

    // Save provider_ref on order
    db.prepare(`UPDATE orders SET provider_ref=?, updated_at=? WHERE id=?`)
      .run(intent.id, now(), orderId);

    return res.json({ ok: true, clientSecret: intent.client_secret, orderId });
  } catch (e) {
    return res.status(400).json({ ok: false, message: e?.message || "Stripe error" });
  }
});

// -----------------------------
// PayPal
// -----------------------------
const PAYPAL_BASE =
  process.env.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

async function paypalAccessToken() {
  const id = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!id || !secret) throw new Error("PayPal not configured");

  const auth = Buffer.from(`${id}:${secret}`).toString("base64");

  const r = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!r.ok) {
    const t = await r.text().catch(() => "");
    throw new Error(`PayPal token error: ${r.status} ${t}`);
  }
  const data = await r.json();
  return data.access_token;
}

// Create PayPal order + create DB order
app.post("/api/paypal/create-order", async (req, res) => {
  try {
    const items = req.body?.items;
    const amountCents = calcTotalCentsEUR(items);
    if (amountCents <= 0) return res.status(400).json({ ok: false, message: "Empty cart" });

    const orderId = createOrder({
      provider: "paypal",
      currency: "EUR",
      amount_cents: amountCents,
      items,
    });

    const token = await paypalAccessToken();
    const value = (amountCents / 100).toFixed(2);

    // PayPal Orders API  [oai_citation:6‡PayPal Developer](https://developer.paypal.com/docs/api/orders/v2/?utm_source=chatgpt.com)
    const r = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        // Idempotency for PayPal
        "PayPal-Request-Id": orderId,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            custom_id: orderId,
            amount: { currency_code: "EUR", value },
          },
        ],
      }),
    });

    const data = await r.json().catch(() => ({}));
    if (!r.ok) return res.status(r.status).json({ ok: false, data });

    // Save provider_ref
    db.prepare(`UPDATE orders SET provider_ref=?, updated_at=? WHERE id=?`)
      .run(data.id, now(), orderId);

    return res.json({ ok: true, id: data.id, orderId });
  } catch (e) {
    return res.status(400).json({ ok: false, message: e?.message || "PayPal error" });
  }
});

// Capture PayPal order and mark paid (server-side truth)
app.post("/api/paypal/capture-order", async (req, res) => {
  try {
    const paypalOrderId = String(req.body?.orderID || "").trim();
    if (!paypalOrderId) return res.status(400).json({ ok: false, message: "Missing orderID" });

    const token = await paypalAccessToken();

    const r = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${paypalOrderId}/capture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await r.json().catch(() => ({}));
    if (!r.ok) return res.status(r.status).json({ ok: false, data });

    setOrderPaidByProviderRef("paypal", paypalOrderId);

    return res.json({ ok: true, data });
  } catch (e) {
    return res.status(400).json({ ok: false, message: e?.message || "PayPal error" });
  }
});

// -----------------------------
// MailerLite sample (como antes)
// -----------------------------
app.post("/api/sample", async (req, res) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();
    if (!email || !email.includes("@")) {
      return res.status(400).json({ ok: false, message: "Invalid email" });
    }

    const MAILERLITE_TOKEN = process.env.MAILERLITE_TOKEN;
    const GROUP_ID = process.env.MAILERLITE_SAMPLE_GROUP_ID;

    const r = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${MAILERLITE_TOKEN}`,
      },
      body: JSON.stringify({ email, groups: [GROUP_ID] }),
    });

    const data = await r.json().catch(() => ({}));
    if (!r.ok) return res.status(r.status).json({ ok: false, data });

    return res.json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

// Health
app.get("/api/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`API running on :${PORT}`));
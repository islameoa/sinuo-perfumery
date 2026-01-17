// api/paypal/create-order.js
const crypto = require("crypto");
const { readJson } = require("../_lib/body");
const { calcTotalCentsEUR } = require("../_lib/pricing");
const { PAYPAL_BASE, paypalAccessToken } = require("../_lib/paypal");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, message: "Method not allowed" });

  try {
    const body = await readJson(req);
    const items = body?.items;

    const amountCents = calcTotalCentsEUR(items);
    if (amountCents <= 0) return res.status(400).json({ ok: false, message: "Empty cart" });

    const orderId = crypto.randomUUID();
    const value = (amountCents / 100).toFixed(2);

    const token = await paypalAccessToken();

    const r = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "PayPal-Request-Id": orderId, // idempotency
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

    return res.json({ ok: true, id: data.id, orderId });
  } catch (e) {
    return res.status(400).json({ ok: false, message: e?.message || "PayPal error" });
  }
};
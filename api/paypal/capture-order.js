// api/paypal/capture-order.js
const { readJson } = require("../_lib/body");
const { PAYPAL_BASE, paypalAccessToken } = require("../_lib/paypal");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, message: "Method not allowed" });

  try {
    const body = await readJson(req);
    const paypalOrderId = String(body?.orderID || "").trim();
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

    return res.json({ ok: true, data });
  } catch (e) {
    return res.status(400).json({ ok: false, message: e?.message || "PayPal error" });
  }
};
// api/sample.js
const { readJson } = require("./_lib/body");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, message: "Method not allowed" });

  try {
    const body = await readJson(req);
    const email = String(body?.email || "").trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return res.status(400).json({ ok: false, message: "Invalid email" });
    }

    const token = process.env.MAILERLITE_TOKEN;
    const groupId = process.env.MAILERLITE_SAMPLE_GROUP_ID;

    if (!token || !groupId) {
      return res.status(500).json({ ok: false, message: "MailerLite not configured" });
    }

    const r = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, groups: [groupId] }),
    });

    const data = await r.json().catch(() => ({}));
    if (!r.ok) return res.status(r.status).json({ ok: false, data });

    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};
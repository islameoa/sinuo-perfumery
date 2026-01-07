import express from "express";

const app = express();
app.use(express.json());

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

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`API running on :${port}`));
"use client";

import { useState } from "react";

export default function Contact() {  
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }

      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-16" style={{
      color: "white",
      backgroundColor: "#4e0808"
    }}>
      <div className="max-w-7xl mx-auto mt-36 md:mt-20">
        <header className="mb-16">
          <p
            className="text-6xl md:text-8xl tracking-[0.05em] uppercase"
          >
            Contact
          </p>
          <p
            className="mt-6 text-lg max-w-xl"
          >
          Write to us — collabs, questions, anything.
          </p>
        </header>

        {success ? (
          <p className="text-lg"
            style={{ fontFamily: "ModernSerif" }}
          >
            Message sent. I&apos;ll get back to you soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10">
            <div>
              <label className="block text-xs uppercase tracking-[0.25em] mb-2">
                Name
              </label>
              <input
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full border-b bg-transparent py-3 outline-none transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.25em] mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full border-b bg-transparent py-3 outline-none transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.25em] mb-2">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full border-b bg-transparent py-3 outline-none transition-colors duration-300"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              disabled={loading}
              className="inline-flex items-center gap-3 rounded-full px-8 py-3 uppercase tracking-[0.25em] text-sm transition-all duration-300 disabled:opacity-50"
              style={{
                border: `1px solid white`,
              }}
            >
              {loading ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
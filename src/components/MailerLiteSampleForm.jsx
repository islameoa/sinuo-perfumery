import React, { useMemo, useState } from "react";

export default function MailerLiteSampleForm({
  endpoint = "/api/sample",
  placeholder = "your@email.com",
  buttonText = "Get the sample",
}) {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [email, setEmail] = useState("");

  const isValidEmail = useMemo(() => {
    const v = email.trim();
    return v.length > 5 && v.includes("@") && v.includes(".");
  }, [email]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail || status === "loading") return;

    setStatus("loading");
    try {
      const r = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!r.ok) throw new Error("Request failed");
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 1800);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 1800);
    }
  };

  const disabled = !isValidEmail || status === "loading";

  return (
    <form onSubmit={onSubmit} className="w-full md:w-auto">
      <div className="flex flex-col sm:flex-row w-full md:w-[460px] gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="
            w-full px-4 py-3 rounded-lg
            bg-[#faf6ef] text-black placeholder:text-black/45
            border border-black/10
            outline-none
            transition
            focus:border-black/25 focus:ring-2 focus:ring-black/10
          "
        />

        <button
          type="submit"
          disabled={disabled}
          className={[
            `px-6 py-3 rounded-lg uppercase inline-flex items-center justify-center
            bg-[#4e0808] text-white border border-white/15
            transition-all duration-300 ease-out
            hover:bg-transparent
            hover:-translate-y-[1px] hover:shadow-lg
            active:translate-y-0 active:shadow-md
            whitespace-nowrap`,
            disabled ? "opacity-60 cursor-not-allowed hover:translate-y-0 hover:shadow-none" : ""
          ].join(" ")}
        >
          {status === "loading"
            ? "Sending…"
            : status === "success"
            ? "Sent ✓"
            : status === "error"
            ? "Try again"
            : buttonText}
        </button>
      </div>
      
      <p className="mt-3 text-[11px] tracking-[0.18em] uppercase text-white/45">
        no spam — only samples & drops - unsubscribe anytime
      </p>
    </form>
  );
}
import React from "react";

export default function Cookies() {
  return (
    <section className="min-h-screen bg-[#4e0808] text-white px-6 md:px-20 pt-28 pb-24">
      <p className="uppercase tracking-[0.35em] text-[12px] text-white/60 mb-6">
        Cookies
      </p>

      <h1 className="text-[10vw] sm:text-[7vw] md:text-[4vw] uppercase leading-[0.95]">
        minimal tracking.
      </h1>

      <div className="mt-10 max-w-3xl text-white/75 leading-relaxed text-[18px] space-y-8">
        <p>
          We use cookies to keep the site working (basic functionality) and to understand what people
          enjoy, so we can improve.
        </p>
        <div className="border-t border-white/10 pt-6">
          <p className="uppercase tracking-[0.22em] text-[12px] text-white/85 mb-2">Control</p>
          <p>
            You can manage cookies in your browser settings anytime.
          </p>
        </div>
        <p className="text-white/60 text-sm uppercase tracking-[0.18em]">
          Placeholder content — connect your cookie banner/consent tool later.
        </p>
      </div>
    </section>
  );
}
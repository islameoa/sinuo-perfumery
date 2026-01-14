import React from "react";

export default function Shipping() {
  return (
    <section className="min-h-screen bg-[#4e0808] text-white px-6 md:px-20 pt-28 pb-24">
      <p className="uppercase tracking-[0.35em] text-[12px] text-white/60 mb-6">
        Shipping
      </p>

      <h1 className="text-[10vw] sm:text-[7vw] md:text-[4vw] uppercase leading-[0.95]">
        simple + clear.
      </h1>

      <div className="mt-10 max-w-3xl space-y-8 text-white/75 leading-relaxed text-[18px]">
        <p>
          We ship from Spain. Delivery times and pricing depend on your region and the drop.
        </p>
        <div className="border-t border-white/10 pt-6">
          <p className="uppercase tracking-[0.22em] text-[12px] text-white/85 mb-2">Processing</p>
          <p>Orders usually ship within 24–72 hours (business days).</p>
        </div>
        <div className="border-t border-white/10 pt-6">
          <p className="uppercase tracking-[0.22em] text-[12px] text-white/85 mb-2">Tracking</p>
          <p>You’ll receive a tracking link once your order is dispatched.</p>
        </div>
        <div className="border-t border-white/10 pt-6">
          <p className="uppercase tracking-[0.22em] text-[12px] text-white/85 mb-2">Issues</p>
          <p>If something arrives damaged, contact us within 48 hours with photos.</p>
        </div>
      </div>
    </section>
  );
}
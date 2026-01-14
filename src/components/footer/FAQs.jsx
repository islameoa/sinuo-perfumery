import React, { useState } from "react";

const Item = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-white/10">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full py-6 flex items-center justify-between text-left"
      >
        <span className="uppercase tracking-[0.18em] text-white/90 text-sm md:text-base">
          {q}
        </span>
        <span className="text-white/60 text-2xl leading-none">{open ? "−" : "+"}</span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden pb-6 text-white/70 leading-relaxed">
          {a}
        </div>
      </div>
    </div>
  );
};

export default function FAQs() {
  return (
    <section className="min-h-screen bg-[#4e0808] text-white px-6 md:px-20 pt-28 pb-24">
      <p className="uppercase tracking-[0.35em] text-[12px] text-white/60 mb-6">
        FAQs
      </p>

      <h1 className="text-[10vw] sm:text-[7vw] md:text-[4vw] uppercase leading-[0.95]">
        quick answers.
      </h1>

      <div className="mt-12 max-w-3xl">
        <Item
          q="Are your fragrances unisex?"
          a="Yes. We design for identity, not gender. Wear what feels like you."
        />
        <Item
          q="How long do they last?"
          a="Skin chemistry changes everything, but our goal is a lasting, skin-close trail that stays present."
        />
        <Item
          q="Do you offer samples?"
          a="Yes — 2ml is the best entry. Wear it for a week and let it become yours."
        />
        <Item
          q="Are you cruelty-free?"
          a="We do not test on animals. We aim for responsible sourcing and continuous improvement."
        />
      </div>
    </section>
  );
}
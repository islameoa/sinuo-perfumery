import React from "react";

export default function OurMission() {
  return (
    <section className="min-h-screen bg-[#4e0808] text-white px-6 md:px-20 pt-28 pb-24">
      <p className="uppercase tracking-[0.35em] text-[12px] text-white/60 mb-6">
        Our mission
      </p>

      <h1 className="text-[10vw] sm:text-[7vw] md:text-[4vw] uppercase leading-[0.95]">
        break barriers.<br />build beauty.
      </h1>

      <p className="mt-10 max-w-[65ch] text-white/75 text-[18px] leading-relaxed">
        SINUO exists to prove that greatness can be built from anywhere.
        We create fragrances and objects that merge roots and future — a space where
        diaspora identity becomes power, not a compromise.
      </p>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          ["Identity-first", "We design for the in-between — for people who don’t fit neatly."],
          ["Art as language", "Scent is memory. Visuals are mood. Objects are culture."],
          ["Freedom to become", "No norms. No boxes. Just your path, worn daily."],
        ].map(([t, d]) => (
          <div key={t} className="border-t border-white/10 pt-6">
            <h3 className="uppercase tracking-[0.22em] text-[12px] text-white/85">{t}</h3>
            <p className="mt-3 text-white/70 leading-relaxed">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
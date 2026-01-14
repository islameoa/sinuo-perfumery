import React from "react";

export default function LegalNotice() {
  return (
    <section className="min-h-screen bg-[#4e0808] text-white px-6 md:px-20 pt-28 pb-24">
      <p className="uppercase tracking-[0.35em] text-[12px] text-white/60 mb-6">
        Legal notice
      </p>

      <h1 className="text-[10vw] sm:text-[7vw] md:text-[4vw] uppercase leading-[0.95]">
        transparency.
      </h1>

      <div className="mt-10 max-w-3xl text-white/75 leading-relaxed text-[18px] space-y-8">
        <p>
          This website is operated by SINUO. Details such as business name, address and tax
          information will be provided here as the store launches officially.
        </p>
        <p className="text-white/60 text-sm uppercase tracking-[0.18em]">
          Placeholder content — update with your official company details.
        </p>
      </div>
    </section>
  );
}
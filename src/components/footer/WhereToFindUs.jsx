import React from "react";
import { Link } from "react-router-dom";

export default function WhereToFindUs() {
  return (
    <section className="min-h-screen bg-[#4e0808] text-white px-6 md:px-20 pt-28 pb-24">
      <p className="uppercase tracking-[0.35em] text-[12px] text-white/60 mb-6">
        Where to find us
      </p>

      <h1 className="text-[10vw] sm:text-[7vw] md:text-[4vw] uppercase leading-[0.95]">
        IRL soon.<br />Online now.
      </h1>

      <p className="mt-8 max-w-[60ch] text-white/75 text-[18px] leading-relaxed">
        SINUO is currently available online. Select pop-ups and partner stores are coming soon.
        If you run a concept store or want to host a drop, reach out.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="border-t border-white/10 pt-6">
          <h3 className="uppercase tracking-[0.22em] text-[12px] text-white/80">
            Online
          </h3>
          <p className="mt-3 text-white/70">
            Available worldwide (shipping zones vary by drop).
          </p>
        </div>

        <div className="border-t border-white/10 pt-6">
          <h3 className="uppercase tracking-[0.22em] text-[12px] text-white/80">
            Pop-ups
          </h3>
          <p className="mt-3 text-white/70">
            Madrid / Barcelona — seasonal. Follow our socials for dates.
          </p>
        </div>
      </div>

      <Link
        to="/contact"
        className="mt-14 inline-flex px-6 py-3 rounded-lg uppercase border border-white/15 bg-white/10 backdrop-blur hover:bg-white/15 transition"
      >
        Contact
      </Link>
    </section>
  );
}
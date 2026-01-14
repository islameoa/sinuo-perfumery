import React from "react";

export default function Privacy() {
  return (
    <section className="min-h-screen bg-[#4e0808] text-white px-6 md:px-20 pt-28 pb-24">
      <p className="uppercase tracking-[0.35em] text-[12px] text-white/60 mb-6">
        Privacy
      </p>

      <h1 className="text-[10vw] sm:text-[7vw] md:text-[4vw] uppercase leading-[0.95]">
        your data,<br />handled with care.
      </h1>

      <div className="mt-10 max-w-3xl text-white/75 leading-relaxed text-[18px] space-y-8">
        <p>
          We only collect what we need to run the store and improve your experience (e.g. email for
          sample access, order updates, and drop announcements if you opt in).
        </p>
        <div className="border-t border-white/10 pt-6">
          <p className="uppercase tracking-[0.22em] text-[12px] text-white/85 mb-2">Email</p>
          <p>
            If you sign up, your email is stored securely and you can unsubscribe anytime.
          </p>
        </div>
        <p className="text-white/60 text-sm uppercase tracking-[0.18em]">
          Placeholder content — add your GDPR policy details when ready.
        </p>
      </div>
    </section>
  );
}
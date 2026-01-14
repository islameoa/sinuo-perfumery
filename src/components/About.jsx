import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";
import "../styles/About.css";
import { Link } from "react-router-dom";
import MailerLiteSampleForm from "./MailerLiteSampleForm";

export default function About() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0vh", "30vh"]);

  const container1 = useRef(null);
  const { scrollYProgress: scrollYProgress1 } = useScroll({
    target: container1,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress1, [0, 1], ["0%", "12%"]);
  const [ctaOpen, setCtaOpen] = useState(true);

  return (
    <div ref={container} className="w-full" style={{ backgroundColor: "#4e0808" }}>
      {/* HERO: video + logo + CTA */}
      <div className="relative w-full h-screen overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
            <source src="/assets/videos/sinuoDance.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <p className="uppercase tracking-[0.35em] text-[14px] text-white/70 mb-4">
            Who are we?
          </p>

          <h1 className="text-[9vw] sm:text-[7vw] md:text-[5vw] leading-[0.95] uppercase">
            elegance.<br />culture.<br />duality.
          </h1>

          <p className="mt-8 max-w-[58ch] text-[20px] text-white/80 leading-relaxed">
            Children of the African diaspora in Spain.
            <br />
            We grew up translating ourselves — language, style, identity.
            <br />
            So we made a brand that doesn't ask you to simplify.
          </p>

          <Link
            to="/shop"
            className="
              mt-10 px-6 py-3 rounded-lg uppercase inline-flex items-center justify-center
              bg-[#4e0808] text-white border border-white/15
              transition-all duration-300 ease-out
              hover:bg-[#321f12]
              hover:-translate-y-[1px] hover:shadow-lg
              active:translate-y-0 active:shadow-md
              focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black
            "
          >
            Discover now
          </Link>
        </div>
      </div>

      {/* BIG QUOTE (simple / loud typography) */}
      <div className="flex justify-center my-40 px-6">
        <p className="text-[6vw] sm:text-[5vw] md:text-[3.4vw] uppercase text-center max-w-[70vw] leading-none text-white">
          A worldwide reference for young people who live between cultures
          <br />
          <br />
          Fragrances that merge worlds and bring memories back.
        </p>
      </div>

      {/* SPLIT: image left, manifesto right */}
      <div className="flex flex-col md:flex-row h-screen pb-20 md:pb-0">
        <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
          <img
            src="/assets/images/packagingClean.png"
            alt="Sinuo packaging"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center mb-10 pt-24 md:pt-0 px-8 md:px-16">
          <div className="max-w-xl">
            <p className="uppercase tracking-[0.35em] text-[14px] text-white/60 mb-6">
              Manifesto
            </p>

            <h2 className="text-[8vw] sm:text-[6vw] md:text-[3vw] uppercase leading-[0.95] text-white">
              quiet luxury <br /> for the young.
            </h2>

            <p className="mt-8 text-white/70 leading-relaxed text-[20px]">
              SINUO blends art and creation.
              <br />
              It's what happens when <b>roots</b> meet <b>future</b> — without apology.
              <br />
              A scent can be a memory. A message. A mirror.
              <br />
              Not to fit in.
              <br />
              To feel whole.
            </p>

            <div className="mt-10 flex flex-wrap gap-2">
              {["minimal", "magnetic", "skin-close", "lasting"].map((t) => (
                <span
                  key={t}
                  className="px-3 py-2 rounded-full border border-white/15 text-white/70 uppercase tracking-[0.22em] text-[14px]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BLEND DIFFERENCE SECTION (like your last block) */}
      <div
        ref={container1}
        className="relative flex items-center justify-center overflow-hidden"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="relative z-10 p-10 md:p-20 mix-blend-difference text-white w-full h-full flex flex-col justify-between">
          <p className="text-[4vw] sm:text-[3vw] md:text-[2vw] uppercase mix-blend-difference">
            We honor where we come from
          </p>

          <p className="text-[6vw] sm:text-[4.5vw] md:text-[3vw] uppercase mix-blend-difference leading-[0.95] self-end">
            and design where we're going.
          </p>
        </div>

        <div className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden">
          <motion.div style={{ y: y1 }} className="w-full h-screen">
            <img
              src="/assets/images/sinuoFatherLogo.png"
              alt="Sinuo"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </div>
      </div>

      {/* SIMPLE PRINCIPLES (big type) */}
      <div className="px-6 md:px-20 py-28">
        <p className="uppercase tracking-[0.35em] text-[14px] text-white/60">
          Principles
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            ["Born between worlds", "Worn as one."],
            ["Culture, distilled", "Creative by nature."],
            ["Freedom to become", "Choose your path. Wear it."],
            ["Made for the young", "Sharp, warm, effortless. No gatekeeping."],
          ].map(([title, sub]) => (
            <div key={title} className="border-t border-white/10 pt-8">
              <h3 className="text-[7vw] text-white sm:text-[4vw] md:text-[2.2vw] uppercase leading-[0.95]">
                {title}
              </h3>
              <p className="mt-4 text-white/70 max-w-[46ch]">{sub}</p>
            </div>
          ))}
        </div>
      </div>
      {/* FLOATING CTA (always) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-24px)] max-w-4xl">
        <AnimatePresence mode="wait">
          {ctaOpen ? (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 18, scale: 0.98, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 18, scale: 0.98, filter: "blur(8px)" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl px-6 py-5 md:px-8 md:py-6 shadow-2xl"
            >
              {/* Close (X) */}
              <motion.button
                type="button"
                onClick={() => setCtaOpen(false)}
                aria-label="Close"
                whileTap={{ scale: 0.95 }}
                className="
                  absolute right-3 top-3
                  h-9 w-9 rounded-full
                  border border-white/15
                  bg-black/25 text-white/80
                  flex items-center justify-center
                  transition
                  hover:bg-black/35 hover:text-white
                "
              >
                ×
              </motion.button>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pr-10">
                <div>
                  <p className="text-[5vw] sm:text-[3.8vw] md:text-[1.5vw] uppercase leading-[0.95] text-white">
                    try 2ml.<br/>wear it for a week.
                  </p>
                </div>

                <MailerLiteSampleForm
                  endpoint="/api/sample"
                  placeholder="Enter your email"
                  buttonText="Get the sample"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="pill"
              initial={{ opacity: 0, y: 14, scale: 0.98, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 14, scale: 0.98, filter: "blur(8px)" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center"
            >
              <motion.button
                type="button"
                onClick={() => setCtaOpen(true)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="
                  rounded-full px-5 py-3
                  border border-white/15
                  bg-white/10 backdrop-blur-xl
                  text-white uppercase tracking-[0.22em] text-[11px]
                  shadow-2xl
                  transition-all duration-300 ease-out
                  hover:bg-white/15
                  active:translate-y-0
                  mb-9 md:mb-0
                "
                aria-label="Open sample CTA"
              >
                Get 2ml sample
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>  
  );
}
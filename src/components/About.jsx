import React, { useRef } from "react";
import "../styles/About.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

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

  return (
    <div ref={container} className="w-full" style={{ backgroundColor: "#0b0b0d" }}>
      {/* HERO: video + logo + CTA */}
      <div className="relative w-full h-screen overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
            <source src="/assets/videos/sinuoCherryOud.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <img
            src="/assets/images/LogoDefBigWhite.svg"
            alt="Sinuo"
            className="w-[220px] sm:w-[260px] md:w-[320px] mb-10 opacity-95"
          />

          <p className="uppercase tracking-[0.35em] text-[11px] text-white/70 mb-4">
            About Sinuo
          </p>

          <h1 className="text-[9vw] sm:text-[7vw] md:text-[5vw] leading-[0.95] uppercase">
            roots.<br />future.<br />presence.
          </h1>

          <p className="mt-8 max-w-[58ch] text-white/80 text-sm md:text-base leading-relaxed">
            Sinuo is a perfume studio for people who live between worlds. Minimal, emotional,
            wearable — designed to linger like memory.
          </p>

          <Link
            to="/shop"
            className="
              mt-10 px-6 py-3 rounded-lg uppercase inline-flex items-center justify-center
              bg-[#8c2f39] text-white border border-white/15
              transition-all duration-300 ease-out
              hover:bg-[#dfcfc0] hover:text-black
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
          “Scent is identity you don’t have to explain.”
        </p>
      </div>

      {/* SPLIT: image left, manifesto right */}
      <div className="flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
          <img
            src="/assets/images/packagingClean.png"
            alt="Sinuo packaging"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center px-8 md:px-16">
          <div className="max-w-xl">
            <p className="uppercase tracking-[0.35em] text-[11px] text-white/60 mb-6">
              Manifesto
            </p>

            <h2 className="text-[8vw] sm:text-[6vw] md:text-[3vw] uppercase leading-[0.95] text-white">
              quiet luxury <br /> for the young.
            </h2>

            <p className="mt-8 text-white/70 leading-relaxed">
              Not loud. Not safe. Just clean design + emotional weight.
              Built for everyday life — and the night that changes it.
            </p>

            <div className="mt-10 flex flex-wrap gap-2">
              {["minimal", "magnetic", "diaspora-coded", "skin-close", "lasting"].map((t) => (
                <span
                  key={t}
                  className="px-3 py-2 rounded-full border border-white/15 text-white/70 uppercase tracking-[0.22em] text-[10px]"
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
        className="relative flex items-center justify-center h-screen overflow-hidden"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="relative z-10 p-10 md:p-20 mix-blend-difference text-white w-full h-full flex flex-col justify-between">
          <p className="text-[4vw] sm:text-[3vw] md:text-[2vw] w-full md:w-[50vw] self-end uppercase mix-blend-difference">
            A memory in motion — soft at first, undeniable later.
          </p>

          <p className="text-[8vw] sm:text-[6.5vw] md:text-[5vw] uppercase mix-blend-difference leading-[0.95]">
            This is not hype.<br />
            It’s a signature.
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
        <p className="uppercase tracking-[0.35em] text-[11px] text-white/60 mb-10">
          Principles
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            ["Quiet, not boring", "Clean, sharp, emotionally warm."],
            ["Wearable by default", "Daily + night. No rules."],
            ["Memory-coded", "Feels familiar. Stays on skin."],
            ["Designed like a world", "Perfume + visuals + objects."],
          ].map(([title, sub]) => (
            <div key={title} className="border-t border-white/10 pt-8">
              <h3 className="text-[7vw] sm:text-[4vw] md:text-[2.2vw] uppercase leading-[0.95]">
                {title}
              </h3>
              <p className="mt-4 text-white/65 max-w-[46ch]">{sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA END */}
      <div className="px-6 md:px-20 pb-24">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <p className="uppercase tracking-[0.35em] text-[11px] text-white/60 mb-3">
              Start here
            </p>
            <p className="text-[7vw] sm:text-[4.5vw] md:text-[2.6vw] uppercase leading-[0.95] text-white">
              try 2ml.<br />wear it for a week.
            </p>
          </div>

          <Link
            to="/shop"
            className="
              px-6 py-3 rounded-lg uppercase inline-flex items-center justify-center
              bg-[#E34D5C] text-white border border-white/15
              transition-all duration-300 ease-out
              hover:bg-[#f6f2ea] hover:text-black
              hover:-translate-y-[1px] hover:shadow-lg
              active:translate-y-0 active:shadow-md
            "
          >
            Shop now
          </Link>
        </div>
      </div>
    </div>
  );
}
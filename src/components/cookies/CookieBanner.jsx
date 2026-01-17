import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CONSENT_KEY = "sinuo_cookie_consent_v1";
const CONSENT_EVENT = "sinuo:consent";

const defaultConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
  ts: null,
};

function readConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      ...defaultConsent,
      ...parsed,
      necessary: true, // always true
    };
  } catch {
    return null;
  }
}

function writeConsent(consent) {
  localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({ ...consent, necessary: true, ts: Date.now() })
  );
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function useCookieConsent() {
  const [consent, setConsent] = useState(() => {
    if (typeof window === "undefined") return defaultConsent;
    return readConsent() ?? defaultConsent;
  });

  const [hasDecision, setHasDecision] = useState(() => {
    if (typeof window === "undefined") return true;
    return !!readConsent();
  });

  const sync = () => {
    const c = readConsent();
    setHasDecision(!!c);
    setConsent(c ?? defaultConsent);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onEvent = () => sync();
    const onStorage = (e) => {
      if (e.key === CONSENT_KEY) sync();
    };

    window.addEventListener(CONSENT_EVENT, onEvent);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener(CONSENT_EVENT, onEvent);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const save = (next) => {
    const c = { ...defaultConsent, ...next, necessary: true };
    setConsent(c);
    writeConsent(c);
    setHasDecision(true);
  };

  return { consent, hasDecision, needsDecision: !hasDecision, save };
}

export default function CookieBanner() {
  const { consent, hasDecision, save } = useCookieConsent();
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const [draft, setDraft] = useState({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    setShow(!hasDecision);
  }, [hasDecision]);

  useEffect(() => {
    if (!open) return;
    setDraft({
      analytics: !!consent.analytics,
      marketing: !!consent.marketing,
    });
  }, [open, consent.analytics, consent.marketing]);

  const acceptAll = () => {
    save({ analytics: true, marketing: true });
    setShow(false);
  };

  const rejectAll = () => {
    save({ analytics: false, marketing: false });
    setShow(false);
  };

  const acceptSelected = () => {
    save({ analytics: !!draft.analytics, marketing: !!draft.marketing });
    setShow(false);
    setOpen(false);
  };

  if (hasDecision && !show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-4 inset-x-0 z-[9998] mx-auto w-[calc(100%-2rem)] max-w-[760px]"
        >
          <div className="border border-white/10 bg-[#2a0505]/95 backdrop-blur-xl text-white shadow-2xl">
            <div className="p-5 md:p-6">
              <p className="uppercase tracking-[0.35em] text-[11px] text-white/60">
                Cookies
              </p>
              <p className="mt-2 text-[15px] text-white/85 leading-relaxed">
                We use cookies to improve the experience.
                <span className="text-white/60"> No noise, no tracking by default.</span>
              </p>

              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={rejectAll}
                  className="
                    px-4 py-3 rounded-lg uppercase text-[12px]
                    bg-transparent text-[#faf6ef] border border-white/15
                    transition-all duration-300 ease-out
                    hover:bg-[#faf6ef] hover:text-black
                  "
                >
                  Reject all
                </button>

                <button
                  onClick={() => setOpen(true)}
                  className="
                    px-4 py-3 rounded-lg uppercase text-[12px]
                    bg-white/5 text-[#faf6ef] border border-white/10
                    transition-all duration-300 ease-out
                    hover:bg-white/10
                  "
                >
                  Manage
                </button>

                <button
                  onClick={acceptAll}
                  className="
                    px-4 py-3 rounded-lg uppercase text-[12px] sm:ml-auto
                    bg-[#faf6ef] text-black border border-white/15
                    transition-all duration-300 ease-out
                    hover:bg-transparent hover:text-[#faf6ef]
                  "
                >
                  Accept all
                </button>
              </div>
            </div>

            {/* Manage modal */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="border-t border-white/10 overflow-hidden"
                >
                  <div className="p-5 md:p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="uppercase tracking-[0.22em] text-[12px] text-white/70">
                        Preferences
                      </p>

                      <button
                        onClick={() => setOpen(false)}
                        className="text-white/60 hover:text-white transition"
                        aria-label="Close"
                      >
                        ✕
                      </button>
                    </div>

                    <ToggleRow
                      title="Necessary"
                      subtitle="Keeps the site working (cart, security)."
                      checked
                      disabled
                      onChange={() => {}}
                    />

                    <ToggleRow
                      title="Analytics"
                      subtitle="Helps us understand what to improve."
                      checked={!!draft.analytics}
                      onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
                    />

                    <ToggleRow
                      title="Marketing"
                      subtitle="Personalized content & retargeting (optional)."
                      checked={!!draft.marketing}
                      onChange={(v) => setDraft((d) => ({ ...d, marketing: v }))}
                    />

                    <button
                      onClick={acceptSelected}
                      className="
                        w-full px-4 py-3 rounded-lg uppercase text-[12px]
                        bg-[#faf6ef] text-black border border-white/15
                        transition-all duration-300 ease-out
                        hover:bg-transparent hover:text-[#faf6ef]
                      "
                    >
                      Save preferences
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ToggleRow({ title, subtitle, checked, disabled, onChange }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
      <div>
        <p className="uppercase tracking-[0.18em] text-[12px] text-white/85">
          {title}
        </p>
        <p className="mt-1 text-[13px] text-white/60">{subtitle}</p>
      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={[
          "w-12 h-7 rounded-full border transition relative shrink-0",
          disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
          checked ? "bg-[#faf6ef] border-white/15" : "bg-transparent border-white/15",
        ].join(" ")}
        aria-pressed={checked}
        aria-label={`Toggle ${title}`}
      >
        <span
          className={[
            "absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full transition",
            checked ? "left-6 bg-black" : "left-1 bg-[#faf6ef]",
          ].join(" ")}
        />
      </button>
    </div>
  );
}
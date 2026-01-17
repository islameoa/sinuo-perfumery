import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCookieConsent } from "./CookieBanner";

export default function CookieGate() {
  const { needsDecision } = useCookieConsent();

  useEffect(() => {
    if (!needsDecision) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [needsDecision]);

  return (
    <AnimatePresence>
      {needsDecision && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9990] bg-black/35"
        />
      )}
    </AnimatePresence>
  );
}
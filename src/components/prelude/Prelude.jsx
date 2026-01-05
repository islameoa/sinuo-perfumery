import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SINUO_PATH =
  "M216.01,28.92c-9.41,40.71,8.82,77.08-40.78,108.24-20.36,10.13-51.69,6-61.1-17.27-12.03-25.19,13.29-85.92-28.01-88.4-52.22,2.24-33.01,68.25-35.98,109.02h-22.78c9.41-40.71-8.82-77.07,40.78-108.24,18.84-9.21,47.24-6.92,58.76,12.73,8.64,11.67,4.99,42.09,5.7,56.41-2.09,31.86,19.54,46.67,46.79,29.56,22.86-17.46,11.96-68,13.82-102.06h22.8Z";

const Prelude = ({
  onComplete,
  minDuration = 1200,
  exitDuration = 0.6,
  cycleDuration = 1.8,
  strokeWidth = 3,
}) => {
  const [isComplete, setIsComplete] = useState(false);

  const viewBox = useMemo(() => "0 0 216.01 142.35", []);

  useEffect(() => {
    const t = setTimeout(() => {
      setIsComplete(true);
      const t2 = setTimeout(() => onComplete?.(), exitDuration * 1000 + 50);
      return () => clearTimeout(t2);
    }, minDuration);

    return () => clearTimeout(t);
  }, [minDuration, exitDuration, onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: exitDuration, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background: "linear-gradient(180deg, #dfcfc0 0%, #dfdfdf 100%)",
          }}
        >
          {/* Grano sutil */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.06,
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative flex flex-col items-center justify-center px-6">
            <motion.svg
              width="280"
              height="190"
              viewBox={viewBox}
              className="drop-shadow-sm"
              aria-label="Sinuo loading"
            >
              <defs>
                {/* Mask que “pinta” el logo */}
                <mask id="sinuo-reveal" maskUnits="userSpaceOnUse">
                  {/* Fondo negro = oculto */}
                  <rect x="0" y="0" width="216.01" height="142.35" fill="black" />

                  {/* Trazo blanco animado = visible */}
                  <motion.path
                    d={SINUO_PATH}
                    fill="none"
                    stroke="white"
                    strokeWidth={43}           // 👈 más grande = pinta el relleno
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 1 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      duration: cycleDuration,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                  />

                  {/* Punto (si quieres que aparezca también “pintado”) */}
                  <motion.circle
                    cx="9"
                    cy="9"
                    r="9"
                    fill="white"
                    initial={{ scale: 0.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: cycleDuration * 0.6,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "mirror",
                      delay: 0.05,
                    }}
                  />
                </mask>
              </defs>

              {/* Logo relleno */}
              <path
                d={SINUO_PATH}
                fill="rgba(0,0,0,0.92)"
                mask="url(#sinuo-reveal)"
              />
              <circle
                cx="9"
                cy="9"
                r="9"
                fill="rgba(0,0,0,0.92)"
                mask="url(#sinuo-reveal)"
              />
            </motion.svg>
            
            <motion.img
              src="/assets/images/LogoDefBig.svg"
              alt="Sinuo"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 h-8 w-auto opacity-80"
            />
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Prelude;
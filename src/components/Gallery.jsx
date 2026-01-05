import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../styles/Gallery.css";

const RATIOS = ["1 / 1", "4 / 5", "3 / 4", "16 / 9", "2 / 3"];

export default function Gallery({ items = [] }) {
  const [active, setActive] = useState(null);

  const prepared = useMemo(() => {
    return items.map((it, i) => ({
      ...it,
      // ratio estable para look irregular sin huecos
      ratio: it.ratio || RATIOS[i % RATIOS.length],
    }));
  }, [items]);

  return (
    <>
      <div className="gal">
        {prepared.map((it, i) => (
          <button
            key={`${it.src}-${i}`}
            type="button"
            className="gal-item"
            style={{ aspectRatio: it.ratio }}
            onClick={() => setActive(it)}
            aria-label="Open media"
          >
            {it.type === "video" ? (
              <video
                className="gal-media"
                src={it.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : (
              <img
                className="gal-media"
                src={it.src}
                alt={it.alt || ""}
                loading="lazy"
                draggable={false}
              />
            )}

            {/* hover overlay */}
            <span className="gal-hover" aria-hidden="true" />
          </button>
        ))}
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="gal-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="gal-lightbox-inner"
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 12 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="gal-close"
                onClick={() => setActive(null)}
                aria-label="Close"
              >
                Close
              </button>

              {active.type === "video" ? (
                <video
                  className="gal-lightbox-media"
                  src={active.src}
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img className="gal-lightbox-media" src={active.src} alt={active.alt || ""} />
              )}

              {active.alt && <div className="gal-caption">{active.alt}</div>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
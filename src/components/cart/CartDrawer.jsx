import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, total, inc, dec, removeItem } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.button
            aria-label="Close cart"
            className="fixed inset-0 z-[80] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Panel */}
          <motion.aside
            className="fixed right-0 top-0 z-[90] h-full w-[92vw] max-w-[420px]
                       bg-[#4e0808] text-white border-l border-white/10"
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="px-6 py-5 flex items-center justify-between border-b border-white/10">
                <p className="uppercase tracking-[0.22em] text-[12px] text-white/80">
                  Cart
                </p>
                <button
                  onClick={closeCart}
                  className="h-9 w-9 rounded-full border border-white/15 bg-black/20
                             text-white/80 hover:bg-black/30 transition flex items-center justify-center"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-auto px-6 py-4">
                {items.length === 0 ? (
                  <div className="pt-10 text-white/70">
                    Your cart is empty.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((it) => (
                      <div
                        key={`${it.id}__${it.variant || ""}`}
                        className="border border-white/10 rounded-xl p-4 bg-white/5"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="uppercase tracking-[0.12em] text-sm">
                              {it.name}
                            </p>
                            {it.variant && (
                              <p className="mt-1 text-white/65 text-xs uppercase tracking-[0.18em]">
                                {it.variant}
                              </p>
                            )}
                            <p className="mt-2 text-white/80">
                              €{it.price}
                              <span className="text-white/50"> / unit</span>
                            </p>
                          </div>

                          <button
                            onClick={() => removeItem(it.id, it.variant)}
                            className="text-white/60 hover:text-white transition text-sm"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          {/* Qty controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => dec(it.id, it.variant)}
                              className="h-9 w-9 rounded-lg border border-white/15 bg-black/15
                                         hover:bg-black/25 transition"
                            >
                              −
                            </button>

                            <div className="min-w-[42px] text-center text-white/90">
                              {it.qty}
                            </div>

                            <button
                              onClick={() => inc(it.id, it.variant)}
                              className="h-9 w-9 rounded-lg border border-white/15 bg-black/15
                                         hover:bg-black/25 transition"
                            >
                              +
                            </button>
                          </div>

                          <p className="text-white/90">
                            €{(it.price * it.qty).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer total + checkout */}
              <div className="px-6 py-5 border-t border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <p className="uppercase tracking-[0.22em] text-[12px] text-white/70">
                    Total
                  </p>
                  <p className="text-white text-lg">€{total.toFixed(2)}</p>
                </div>

                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="
                    w-full px-6 py-3 rounded-lg uppercase inline-flex items-center justify-center
                    bg-[#321f12] text-white border border-white/15
                    transition-all duration-300 ease-out
                    hover:bg-black/30 hover:-translate-y-[1px] hover:shadow-lg
                    active:translate-y-0 active:shadow-md
                  "
                >
                  Checkout
                </Link>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
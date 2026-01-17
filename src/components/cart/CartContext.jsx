import React, { createContext, useContext, useMemo, useEffect, useState } from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "sinuo_cart_v1";
const CART_TTL_DAYS = 30; // opcional

function readCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    // soporta tanto array antiguo como {items,ts}
    const items = Array.isArray(parsed) ? parsed : parsed?.items;
    const ts = Array.isArray(parsed) ? null : parsed?.ts;

    if (!Array.isArray(items)) return [];

    // TTL opcional
    if (ts) {
      const ageMs = Date.now() - ts;
      const ttlMs = CART_TTL_DAYS * 24 * 60 * 60 * 1000;
      if (ageMs > ttlMs) {
        localStorage.removeItem(CART_STORAGE_KEY);
        return [];
      }
    }

    // saneado mínimo
    return items
      .filter(Boolean)
      .map((it) => ({
        id: String(it.id || ""),
        name: String(it.name || ""),
        variant: it.variant ? String(it.variant) : "",
        price: Number(it.price || 0),
        qty: Math.max(1, Number(it.qty || 1)),
      }))
      .filter((it) => it.id && it.price >= 0);
  } catch {
    return [];
  }
}

function writeCart(items) {
  try {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify({ items, ts: Date.now() })
    );
  } catch {
    // ignore
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    // lazy init (solo 1 vez)
    if (typeof window === "undefined") return [];
    return readCart();
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // ✅ Persistir cada cambio
  useEffect(() => {
    if (typeof window === "undefined") return;
    writeCart(items);
  }, [items]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((v) => !v);

  const addItem = (item) => {
    setItems((prev) => {
      const key = `${item.id}__${item.variant || ""}`;
      const idx = prev.findIndex((p) => `${p.id}__${p.variant || ""}` === key);
      const qtyToAdd = item.qty ?? 1;

      if (idx === -1) return [...prev, { ...item, qty: qtyToAdd }];

      const next = [...prev];
      next[idx] = { ...next[idx], qty: next[idx].qty + qtyToAdd };
      return next;
    });
    openCart();
  };

  const removeItem = (id, variant) => {
    const key = `${id}__${variant || ""}`;
    setItems((prev) => prev.filter((p) => `${p.id}__${p.variant || ""}` !== key));
  };

  const setQty = (id, variant, qty) => {
    const key = `${id}__${variant || ""}`;
    setItems((prev) =>
      prev.map((p) => {
        const same = `${p.id}__${p.variant || ""}` === key;
        return same ? { ...p, qty: Math.max(1, qty) } : p;
      })
    );
  };

  const inc = (id, variant) => {
    const key = `${id}__${variant || ""}`;
    setItems((prev) =>
      prev.map((p) =>
        `${p.id}__${p.variant || ""}` === key ? { ...p, qty: p.qty + 1 } : p
      )
    );
  };

  const dec = (id, variant) => {
    const key = `${id}__${variant || ""}`;
    setItems((prev) =>
      prev.map((p) =>
        `${p.id}__${p.variant || ""}` === key
          ? { ...p, qty: Math.max(1, p.qty - 1) }
          : p
      )
    );
  };

  const clear = () => setItems([]);

  const cartCount = useMemo(() => items.reduce((a, it) => a + it.qty, 0), [items]);
  const total = useMemo(() => items.reduce((a, it) => a + it.price * it.qty, 0), [items]);

  const value = {
    items,
    cartCount,
    total,
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
    addItem,
    removeItem,
    setQty,
    inc,
    dec,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
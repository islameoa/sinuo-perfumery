import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((v) => !v);

  const addItem = (item) => {
    // item: {id,name,variant,price,qty}
    setItems((prev) => {
      const key = `${item.id}__${item.variant || ""}`;
      const idx = prev.findIndex((p) => `${p.id}__${p.variant || ""}` === key);
      if (idx === -1) return [...prev, { ...item, qty: item.qty ?? 1 }];
      const next = [...prev];
      next[idx] = { ...next[idx], qty: next[idx].qty + (item.qty ?? 1) };
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
      prev
        .map((p) => {
          const same = `${p.id}__${p.variant || ""}` === key;
          if (!same) return p;
          return { ...p, qty: Math.max(1, qty) };
        })
        .filter((p) => p.qty > 0)
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
        `${p.id}__${p.variant || ""}` === key ? { ...p, qty: Math.max(1, p.qty - 1) } : p
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
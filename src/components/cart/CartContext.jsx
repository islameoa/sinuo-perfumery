import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    // item: { id, name, variant, price, qty }
    setItems((prev) => {
      const idx = prev.findIndex(
        (p) => p.id === item.id && p.variant === item.variant
      );

      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + (item.qty ?? 1) };
        return copy;
      }

      return [...prev, { ...item, qty: item.qty ?? 1 }];
    });
  };

  const cartCount = useMemo(
    () => items.reduce((sum, it) => sum + (it.qty ?? 1), 0),
    [items]
  );

  const value = useMemo(() => ({ items, addItem, cartCount }), [items, cartCount]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
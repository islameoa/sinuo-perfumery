// api/_lib/pricing.js
const PRICE_TABLE_EUR = {
    "sinuo-diaspora__2ml": 9,
    "sinuo-diaspora__100ml": 119,
  };
  
  function itemKey(it) {
    const id = String(it?.id || "").trim();
    const variant = String(it?.variant || "").trim();
    return `${id}__${variant}`;
  }
  
  function normalizeQty(qty) {
    const n = Number(qty || 1);
    if (Number.isNaN(n)) return 1;
    return Math.max(1, Math.min(99, Math.floor(n)));
  }
  
  function calcTotalCentsEUR(items) {
    if (!Array.isArray(items) || items.length === 0) return 0;
  
    let total = 0;
    for (const it of items) {
      const key = itemKey(it);
      const unit = PRICE_TABLE_EUR[key];
      if (typeof unit !== "number") throw new Error(`Unknown product/variant: ${key}`);
      const qty = normalizeQty(it?.qty);
      total += Math.round(unit * 100) * qty;
    }
    return total;
  }
  
  module.exports = { PRICE_TABLE_EUR, itemKey, calcTotalCentsEUR, normalizeQty };
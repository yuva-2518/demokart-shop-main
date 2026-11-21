"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import products from "@/data/products";
import Toast from "@/components/Toast";

const STORAGE_KEY = "demokart-cart";
export const MAX_QTY = 10;
const productById = new Map(products.map((p) => [p.id, p]));

const CartContext = createContext(null);

// Read + validate saved cart. Returns [{ id, quantity }] — never throws.
function readStoredCart() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const merged = new Map();
    for (const e of parsed) {
      if (!e || typeof e !== "object") continue;
      if (!productById.has(e.id)) continue; // unknown / removed product
      if (!Number.isInteger(e.quantity) || e.quantity < 1) continue;
      merged.set(e.id, Math.min(MAX_QTY, (merged.get(e.id) ?? 0) + e.quantity));
    }
    return [...merged].map(([id, quantity]) => ({ id, quantity }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // empty on server + first client render
  const [isLoaded, setIsLoaded] = useState(false);
  const [toast, setToast] = useState(0); // increments on every successful add
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  // Load after mount, and keep other tabs in sync
  useEffect(() => {
    // Intentional: hydrate from localStorage after mount to avoid SSR/client mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(readStoredCart());
    setIsLoaded(true);
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY || e.key === null) setItems(readStoredCart());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Persist — only once loaded, so the empty initial state never overwrites the saved cart
  useEffect(() => {
    if (!isLoaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, isLoaded]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(0), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const addToCart = useCallback((id) => {
    if (!productById.has(id)) return false;
    const existing = itemsRef.current.find((i) => i.id === id);
    if (existing && existing.quantity >= MAX_QTY) return false;
    setItems((prev) =>
      prev.some((i) => i.id === id)
        ? prev.map((i) => (i.id === id ? { ...i, quantity: Math.min(MAX_QTY, i.quantity + 1) } : i))
        : [...prev, { id, quantity: 1 }]
    );
    setToast((n) => n + 1);
    return true;
  }, []);

  const increaseQty = useCallback((id) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: Math.min(MAX_QTY, i.quantity + 1) } : i)));
  }, []);

  const decreaseQty = useCallback((id) => {
    setItems((prev) =>
      prev.flatMap((i) => (i.id !== id ? [i] : i.quantity > 1 ? [{ ...i, quantity: i.quantity - 1 }] : []))
    );
  }, []);

  const removeFromCart = useCallback((id) => setItems((prev) => prev.filter((i) => i.id !== id)), []);
  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items]);
  const total = useMemo(
    () => items.reduce((sum, i) => sum + (productById.get(i.id)?.price ?? 0) * i.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, itemCount, total, isLoaded, addToCart, increaseQty, decreaseQty, removeFromCart, clearCart }),
    [items, itemCount, total, isLoaded, addToCart, increaseQty, decreaseQty, removeFromCart, clearCart]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <Toast visible={toast > 0} />
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

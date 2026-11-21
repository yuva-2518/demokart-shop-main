"use client";
import { useEffect, useState } from "react";
import { useCart, MAX_QTY } from "@/context/CartContext";

const badgeStyles = {
  Bestseller: "bg-amber-500 text-zinc-900",
  New: "bg-indigo-600 text-white",
  Sale: "bg-rose-600 text-white",
};

export default function ProductCard({ product }) {
  const { id, name, category, price, originalPrice, rating, reviews, badge, image } = product;
  const { items, addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const inCart = items.find((i) => i.id === id)?.quantity ?? 0;
  const atMax = inCart >= MAX_QTY;

  useEffect(() => {
    if (!justAdded) return;
    const t = setTimeout(() => setJustAdded(false), 1500);
    return () => clearTimeout(t);
  }, [justAdded]);

  const handleAdd = () => {
    if (addToCart(id)) setJustAdded(true);
  };
  const off = Math.round(((originalPrice - price) / originalPrice) * 100);
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-zinc-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          loading="lazy"
          width={600}
          height={600}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://placehold.co/600x600/png?text=${encodeURIComponent(name)}`;
          }}
          className="aspect-square h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {badge && (
          <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold ${badgeStyles[badge]}`}>{badge}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">{category}</p>
        <h3 className="mt-1 line-clamp-2 min-h-[2.75rem] font-semibold leading-snug text-zinc-900">{name}</h3>
        <div className="mt-2 flex items-center gap-1.5 text-sm" aria-label={`Rated ${rating} out of 5 from ${reviews} reviews`}>
          <svg className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.8 4.8 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z" /></svg>
          <span className="font-semibold text-zinc-800">{rating}</span>
          <span className="text-zinc-500">({reviews.toLocaleString("en-IN")})</span>
        </div>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-2">
          <span className="text-xl font-bold text-zinc-900">₹{price.toLocaleString("en-IN")}</span>
          <span className="text-sm text-zinc-500 line-through">₹{originalPrice.toLocaleString("en-IN")}</span>
          <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-bold text-green-800">{off}% off</span>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={justAdded || atMax}
          aria-label={`Add ${name} to cart`}
          className="mt-4 w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-green-700 disabled:active:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
        >
          {justAdded ? "Added ✓" : atMax ? "Max quantity in cart" : "Add to cart"}
        </button>
        <p className="mt-2 h-4 text-center text-xs font-medium text-indigo-700">{inCart > 0 ? `In cart: ${inCart}` : ""}</p>
      </div>
    </article>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header({ query = "", onQueryChange }) {
  const [open, setOpen] = useState(false);
  const { itemCount, isLoaded } = useCart();
  const hasSearch = typeof onQueryChange === "function";
  const input = (
    <input
      type="search"
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      placeholder="Search for products"
      aria-label="Search products"
      className="w-full rounded-full border border-zinc-200 bg-zinc-50 py-2.5 pl-11 pr-4 text-sm text-zinc-900 placeholder-zinc-500 focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/30"
    />
  );
  const searchIcon = (
    <svg className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="m20 20-3.5-3.5" /></svg>
  );
  const btn = "relative rounded-full p-2.5 text-zinc-700 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600";
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded" aria-label="DemoKart home">
          Demo<span className="text-indigo-600">Kart</span>
        </Link>
        {hasSearch ? <div className="relative mx-auto hidden w-full max-w-xl md:block">{searchIcon}{input}</div> : <div className="mx-auto" />}
        <div className="ml-auto flex items-center gap-1">
          {hasSearch && <button type="button" className={`${btn} md:hidden`} aria-label="Toggle search" aria-expanded={open} onClick={() => setOpen(!open)}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="m20 20-3.5-3.5" /></svg>
          </button>}
          <button type="button" className={btn} aria-label="Account">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path strokeLinecap="round" d="M4 20c0-4 4-6 8-6s8 2 8 6" /></svg>
          </button>
          <Link href="/cart" className={btn} aria-label={`Cart, ${itemCount} items`}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l2.4 11h10.2L20 7H6" /><circle cx="9" cy="19.5" r="1.3" /><circle cx="17" cy="19.5" r="1.3" /></svg>
            {isLoaded && itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-xs font-bold text-white">{itemCount > 9 ? "9+" : itemCount}</span>
            )}
          </Link>
        </div>
      </div>
      {hasSearch && open && <div className="relative border-t border-zinc-100 px-4 py-3 md:hidden">{searchIcon}{input}</div>}
    </header>
  );
}

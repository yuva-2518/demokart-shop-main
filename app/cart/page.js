"use client";
import { useMemo } from "react";
import Link from "next/link";
import products from "@/data/products";
import { useCart, MAX_QTY } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const rupees = (n) => `₹${n.toLocaleString("en-IN")}`;
const focus = "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2";

function QtyControl({ name, quantity, onDec, onInc }) {
  const b = `flex h-9 w-9 items-center justify-center rounded-full text-lg font-semibold text-zinc-700 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:text-zinc-300 disabled:hover:bg-transparent ${focus}`;
  return (
    <div className="inline-flex items-center rounded-full border border-zinc-300">
      <button type="button" className={b} onClick={onDec} aria-label={`Decrease quantity of ${name}`}>–</button>
      <span className="w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite" aria-label={`Quantity ${quantity}`}>{quantity}</span>
      <button type="button" className={b} onClick={onInc} disabled={quantity >= MAX_QTY} aria-label={`Increase quantity of ${name}`}>+</button>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem]" aria-busy="true" aria-label="Loading cart">
      <div className="space-y-4">
        {[0, 1].map((i) => <div key={i} className="h-36 animate-pulse rounded-2xl bg-zinc-200" />)}
      </div>
      <div className="h-56 animate-pulse rounded-2xl bg-zinc-200" />
    </div>
  );
}

export default function CartPage() {
  const { items, itemCount, total, isLoaded, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart();

  const lines = useMemo(() => {
    const byId = new Map(products.map((p) => [p.id, p]));
    return items.map((i) => ({ product: byId.get(i.id), quantity: i.quantity })).filter((l) => l.product);
  }, [items]);

  const handleClear = () => {
    if (window.confirm("Remove all items from your cart?")) clearCart();
  };

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/" className={`inline-flex items-center gap-1 rounded text-sm font-semibold text-indigo-700 hover:underline ${focus}`}>
          <span aria-hidden="true">←</span> Continue shopping
        </Link>
        <h1 className="mb-8 mt-4 text-3xl font-bold tracking-tight text-zinc-900">Your cart</h1>

        {!isLoaded ? (
          <Skeleton />
        ) : lines.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white py-20 text-center">
            <svg className="mx-auto h-16 w-16 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l2.4 11h10.2L20 7H6" /><circle cx="9" cy="19.5" r="1.3" /><circle cx="17" cy="19.5" r="1.3" /></svg>
            <h2 className="mt-4 text-xl font-semibold text-zinc-900">Your cart is empty</h2>
            <p className="mt-1 text-sm text-zinc-600">Looks like you haven&apos;t added anything yet.</p>
            <Link href="/" className={`mt-6 inline-block rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white hover:bg-indigo-700 ${focus}`}>
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_22rem]">
            <ul className="space-y-4">
              {lines.map(({ product: p, quantity }) => (
                <li key={p.id} className="flex gap-4 rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm sm:gap-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={600}
                    height={600}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://placehold.co/600x600/png?text=${encodeURIComponent(p.name)}`;
                    }}
                    className="aspect-square h-24 w-24 shrink-0 rounded-xl bg-zinc-100 object-cover sm:h-32 sm:w-32"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">{p.category}</p>
                    <h2 className="line-clamp-2 font-semibold leading-snug text-zinc-900">{p.name}</h2>
                    <p className="mt-1 text-sm text-zinc-600">{rupees(p.price)} each</p>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-3">
                      <QtyControl name={p.name} quantity={quantity} onDec={() => decreaseQty(p.id)} onInc={() => increaseQty(p.id)} />
                      <p className="text-lg font-bold text-zinc-900">{rupees(p.price * quantity)}</p>
                    </div>
                    <button type="button" onClick={() => removeFromCart(p.id)} aria-label={`Remove ${p.name} from cart`} className={`mt-2 self-start rounded text-sm font-medium text-rose-700 hover:underline ${focus}`}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <aside aria-label="Order summary" className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm lg:sticky lg:top-24">
              <h2 className="text-lg font-bold text-zinc-900">Order summary</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-zinc-600">Items</dt><dd className="font-medium text-zinc-900">{itemCount}</dd></div>
                <div className="flex justify-between"><dt className="text-zinc-600">Subtotal</dt><dd className="font-medium text-zinc-900">{rupees(total)}</dd></div>
                <div className="flex justify-between border-t border-zinc-100 pt-3 text-base"><dt className="font-bold text-zinc-900">Total</dt><dd className="font-bold text-zinc-900">{rupees(total)}</dd></div>
              </dl>
              <button type="button" disabled title="Coming soon" className="mt-6 w-full cursor-not-allowed rounded-xl bg-zinc-200 py-3 text-sm font-semibold text-zinc-600">
                Checkout · Coming soon
              </button>
              <button type="button" onClick={handleClear} className={`mt-3 w-full rounded py-2 text-sm font-medium text-zinc-600 hover:text-rose-700 hover:underline ${focus}`}>
                Clear cart
              </button>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

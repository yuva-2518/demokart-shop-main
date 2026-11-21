import Link from "next/link";

export default function Toast({ visible }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4" role="status">
      {visible && (
        <div className="pointer-events-auto flex items-center gap-4 rounded-full bg-zinc-900 py-3 pl-5 pr-4 text-sm text-white shadow-xl animate-[fadeIn_200ms_ease-out]">
          <span>Added to cart</span>
          <Link href="/cart" className="rounded font-semibold text-indigo-300 underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
            View cart
          </Link>
        </div>
      )}
    </div>
  );
}

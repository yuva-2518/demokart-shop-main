import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onClear }) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white py-20 text-center">
        <p className="text-4xl" aria-hidden="true">🔍</p>
        <h3 className="mt-3 text-lg font-semibold text-zinc-900">No products found</h3>
        <p className="mt-1 text-sm text-zinc-600">Try a different search or pick another category.</p>
        <button
          type="button"
          onClick={onClear}
          className="mt-5 rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
        >
          Clear filters
        </button>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div
      role="group"
      aria-label="Filter by category"
      className="-mx-4 flex flex-nowrap gap-2 overflow-x-auto px-4 py-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
    >
      {categories.map((c) => (
        <button
          key={c}
          type="button"
          aria-pressed={active === c}
          onClick={() => onChange(c)}
          className={`shrink-0 whitespace-nowrap rounded-full border px-5 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 ${
            active === c
              ? "border-indigo-600 bg-indigo-600 text-white"
              : "border-zinc-300 bg-white text-zinc-700 hover:border-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

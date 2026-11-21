export default function SortSelect({ options, value, onChange }) {
  return (
    <div className="relative w-full sm:w-auto">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Sort products by price"
        className="w-full appearance-none rounded-full border border-zinc-300 bg-white py-2 pl-5 pr-11 text-sm font-semibold text-zinc-700 hover:border-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 sm:w-52"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <svg className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5.5 7.5 10 12l4.5-4.5z" /></svg>
    </div>
  );
}

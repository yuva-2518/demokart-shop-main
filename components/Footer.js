const cols = {
  Shop: ["Electronics", "Fashion", "Home", "Books"],
  Support: ["Help centre", "Track order", "Returns", "Contact us"],
  Company: ["About DemoKart", "Careers", "Press", "Privacy policy"],
};

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <p className="text-2xl font-extrabold tracking-tight text-zinc-900">Demo<span className="text-indigo-600">Kart</span></p>
          <p className="mt-3 max-w-xs text-sm text-zinc-600">Quality products, honest prices, delivered to your door.</p>
        </div>
        {Object.entries(cols).map(([title, links]) => (
          <nav key={title} aria-label={title}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-900">{title}</h2>
            <ul className="mt-4 space-y-2">
              {links.map((l) => (
                <li key={l}><a href="#" className="text-sm text-zinc-600 hover:text-indigo-700 focus:outline-none focus-visible:underline">{l}</a></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-zinc-100 py-5 text-center text-sm text-zinc-500">© 2026 DemoKart. All rights reserved.</div>
    </footer>
  );
}

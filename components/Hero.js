export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-100">Festive season sale</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Everything you love, up to 40% off.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-indigo-100">
          Top picks in electronics, fashion, home and books, delivered across India.
        </p>
        <a href="#products" className="mt-8 inline-block rounded-full bg-white px-7 py-3 text-sm font-bold text-indigo-700 shadow-lg transition hover:bg-indigo-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50">
          Shop now
        </a>
      </div>
    </section>
  );
}

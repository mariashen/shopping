import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { products, styleDescriptions } from "@/lib/products";

export default function Home() {
  const trendingProducts = products.filter((p) => p.trending).slice(0, 4);
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <section className="bg-black text-white min-h-[85vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-black to-purple-900/30" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-pink-400 font-semibold text-sm tracking-widest uppercase mb-4">
              Your style, your rules
            </p>
            <h1 className="text-6xl md:text-7xl font-black leading-none mb-6">
              Dress how
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                you feel.
              </span>
            </h1>
            <p className="text-gray-300 text-lg mb-10 leading-relaxed max-w-md">
              Discover pieces that match your vibe — streetwear, Y2K, cottagecore, and everything in between.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/quiz"
                className="bg-pink-500 hover:bg-pink-400 text-white font-bold px-8 py-4 rounded-full text-lg transition-colors"
              >
                Take Style Quiz
              </Link>
              <Link
                href="/shop"
                className="border border-white/30 hover:border-white text-white font-bold px-8 py-4 rounded-full text-lg transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className="hidden md:grid grid-cols-2 gap-3">
            {trendingProducts.slice(0, 4).map((product, i) => (
              <div
                key={product.id}
                className={`relative rounded-2xl overflow-hidden ${i === 0 ? "row-span-2 aspect-[2/3]" : "aspect-square"}`}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="250px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style Categories */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black mb-3">Find Your Aesthetic</h2>
          <p className="text-gray-500">Not sure where to start? Pick a style that speaks to you.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {(Object.entries(styleDescriptions) as [keyof typeof styleDescriptions, typeof styleDescriptions[keyof typeof styleDescriptions]][]).map(([key, style]) => (
            <Link
              key={key}
              href={`/shop?style=${key}`}
              className="group relative bg-gray-50 hover:bg-pink-50 border border-gray-100 hover:border-pink-200 rounded-2xl p-6 transition-all"
            >
              <span className="text-4xl block mb-3">{style.emoji}</span>
              <h3 className="font-bold text-lg mb-1 group-hover:text-pink-600 transition-colors">
                {style.label}
              </h3>
              <p className="text-sm text-gray-500">{style.description}</p>
              <span className="mt-4 text-xs font-semibold text-pink-500 group-hover:underline block">
                Shop {style.label} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black">Trending Now</h2>
              <p className="text-gray-500 mt-1">What everyone&apos;s wearing right now</p>
            </div>
            <Link href="/shop?filter=trending" className="text-sm font-semibold hover:text-pink-500 transition-colors">
              See all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-4xl font-black mb-4">Not sure what to wear?</h2>
          <p className="text-pink-100 text-lg mb-8 max-w-md mx-auto">
            Take our 2-minute style quiz and we&apos;ll curate picks just for you.
          </p>
          <Link
            href="/quiz"
            className="inline-block bg-white text-pink-600 font-bold px-10 py-4 rounded-full text-lg hover:bg-pink-50 transition-colors"
          >
            Start Quiz
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black">New Arrivals</h2>
              <p className="text-gray-500 mt-1">Fresh drops, just landed</p>
            </div>
            <Link href="/shop?filter=newArrival" className="text-sm font-semibold hover:text-pink-500 transition-colors">
              See all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-black text-2xl">
            DRIP<span className="text-pink-500">.</span>
          </span>
          <p className="text-gray-500 text-sm">Made for the generation that sets the trends.</p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <Link href="/quiz" className="hover:text-white transition-colors">Style Quiz</Link>
            <Link href="/cart" className="hover:text-white transition-colors">Cart</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

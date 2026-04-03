"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getCartFromStorage, getCartCount } from "@/lib/cart";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateCount = () => {
      const cart = getCartFromStorage();
      setCartCount(getCartCount(cart));
    };
    updateCount();
    window.addEventListener("cartUpdated", updateCount);
    return () => window.removeEventListener("cartUpdated", updateCount);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="font-black text-2xl tracking-tight text-black hover:opacity-70 transition-opacity">
          DRIP<span className="text-pink-500">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/shop" className="hover:text-pink-500 transition-colors">Shop</Link>
          <Link href="/quiz" className="hover:text-pink-500 transition-colors">Style Quiz</Link>
          <Link href="/shop?filter=trending" className="hover:text-pink-500 transition-colors">Trending</Link>
          <Link href="/shop?filter=newArrival" className="hover:text-pink-500 transition-colors">New In</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative flex items-center gap-1.5 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-pink-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-4 text-sm font-medium">
          <Link href="/shop" onClick={() => setMenuOpen(false)} className="hover:text-pink-500">Shop</Link>
          <Link href="/quiz" onClick={() => setMenuOpen(false)} className="hover:text-pink-500">Style Quiz</Link>
          <Link href="/shop?filter=trending" onClick={() => setMenuOpen(false)} className="hover:text-pink-500">Trending</Link>
          <Link href="/shop?filter=newArrival" onClick={() => setMenuOpen(false)} className="hover:text-pink-500">New In</Link>
        </div>
      )}
    </nav>
  );
}

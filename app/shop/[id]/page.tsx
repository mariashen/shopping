"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { products } from "@/lib/products";
import { getCartFromStorage, saveCartToStorage } from "@/lib/cart";
import ProductCard from "@/components/ProductCard";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-black mb-4">Product not found</h1>
        <Link href="/shop" className="text-pink-500 underline">Back to shop</Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.id !== product.id && p.styles.some((s) => product.styles.includes(s)))
    .slice(0, 4);

  function addToCart() {
    if (!selectedSize || !selectedColor) return;
    const cart = getCartFromStorage();
    const existing = cart.find(
      (item) => item.product.id === product!.id && item.size === selectedSize && item.color === selectedColor
    );
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ product: product!, size: selectedSize, color: selectedColor, quantity: 1 });
    }
    saveCartToStorage(cart);
    window.dispatchEvent(new Event("cartUpdated"));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-black font-medium">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.trending && (
              <span className="bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">Trending</span>
            )}
            {product.newArrival && (
              <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">New In</span>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <p className="text-sm text-gray-400 uppercase tracking-wider mb-2 capitalize">{product.category}</p>
          <h1 className="text-3xl font-black mb-3">{product.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-black">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
            )}
            {product.originalPrice && (
              <span className="bg-yellow-100 text-yellow-700 text-sm font-bold px-2 py-0.5 rounded-full">
                Save ${product.originalPrice - product.price}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {product.styles.map((s) => (
              <Link
                key={s}
                href={`/shop?style=${s}`}
                className="text-xs bg-pink-50 text-pink-600 border border-pink-100 px-3 py-1 rounded-full capitalize hover:bg-pink-100 transition-colors"
              >
                {s}
              </Link>
            ))}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

          {/* Color selection */}
          <div className="mb-6">
            <p className="font-semibold mb-3">
              Color{selectedColor ? <span className="font-normal text-gray-500 ml-2">{selectedColor}</span> : ""}
            </p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                    selectedColor === color
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-600 border-gray-200 hover:border-black"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size selection */}
          <div className="mb-8">
            <p className="font-semibold mb-3">
              Size{selectedSize ? <span className="font-normal text-gray-500 ml-2">{selectedSize}</span> : ""}
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-xl text-sm font-semibold border transition-colors ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-600 border-gray-200 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={addToCart}
            disabled={!selectedSize || !selectedColor}
            className={`w-full py-4 rounded-full font-bold text-lg transition-all ${
              added
                ? "bg-green-500 text-white"
                : selectedSize && selectedColor
                ? "bg-black hover:bg-pink-500 text-white"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {added ? "Added to Cart!" : !selectedSize || !selectedColor ? "Select Size & Color" : "Add to Cart"}
          </button>

          {(!selectedSize || !selectedColor) && (
            <p className="text-sm text-gray-400 text-center mt-2">
              {!selectedColor ? "Choose a color" : "Choose a size"} to continue
            </p>
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-black mb-8">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

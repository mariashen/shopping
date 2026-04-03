"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCartFromStorage, saveCartToStorage, getCartTotal, CartItem } from "@/lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCartFromStorage());
  }, []);

  function updateQuantity(index: number, delta: number) {
    const updated = [...cart];
    updated[index].quantity += delta;
    if (updated[index].quantity <= 0) {
      updated.splice(index, 1);
    }
    setCart(updated);
    saveCartToStorage(updated);
    window.dispatchEvent(new Event("cartUpdated"));
  }

  function removeItem(index: number) {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    saveCartToStorage(updated);
    window.dispatchEvent(new Event("cartUpdated"));
  }

  const total = getCartTotal(cart);

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-6">🛍️</div>
        <h1 className="text-3xl font-black mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Time to find some pieces you love.</p>
        <Link
          href="/shop"
          className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-pink-500 transition-colors"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black mb-10">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-10">
        {/* Items */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {cart.map((item, index) => (
            <div key={index} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-2xl">
              <Link href={`/shop/${item.product.id}`} className="relative w-24 h-32 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/shop/${item.product.id}`} className="font-bold hover:text-pink-500 transition-colors">
                  {item.product.name}
                </Link>
                <p className="text-sm text-gray-500 mt-1">
                  {item.color} · Size {item.size}
                </p>
                <p className="font-bold mt-2">${item.product.price}</p>
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => updateQuantity(index, -1)}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-black transition-colors font-bold"
                  >
                    −
                  </button>
                  <span className="font-semibold w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(index, 1)}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-black transition-colors font-bold"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(index)}
                    className="ml-auto text-sm text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-3xl p-6 sticky top-24">
            <h2 className="font-black text-xl mb-6">Order Summary</h2>
            <div className="flex justify-between mb-3 text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-3 text-sm">
              <span className="text-gray-500">Shipping</span>
              <span className="font-semibold text-green-600">Free</span>
            </div>
            <div className="border-t border-gray-200 my-4" />
            <div className="flex justify-between mb-6">
              <span className="font-bold">Total</span>
              <span className="font-black text-xl">${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-black text-white py-4 rounded-full font-bold text-lg hover:bg-pink-500 transition-colors">
              Checkout
            </button>
            <Link href="/shop" className="block text-center mt-4 text-sm text-gray-400 hover:text-black transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

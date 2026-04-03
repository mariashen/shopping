"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/shop/${product.id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[3/4]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.trending && (
            <span className="bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              Trending
            </span>
          )}
          {product.newArrival && (
            <span className="bg-black text-white text-xs font-bold px-2 py-0.5 rounded-full">
              New In
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
              Sale
            </span>
          )}
        </div>
      </div>
      <div className="mt-3 px-1">
        <p className="text-xs text-gray-500 capitalize">{product.category}</p>
        <h3 className="font-semibold text-gray-900 group-hover:text-pink-500 transition-colors leading-tight mt-0.5">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
          )}
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {product.styles.map((style) => (
            <span key={style} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">
              {style}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

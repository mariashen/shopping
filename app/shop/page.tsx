"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { products, Category, Style } from "@/lib/products";

const categories: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "tops", label: "Tops" },
  { value: "bottoms", label: "Bottoms" },
  { value: "dresses", label: "Dresses" },
  { value: "outerwear", label: "Outerwear" },
  { value: "shoes", label: "Shoes" },
  { value: "accessories", label: "Accessories" },
];

const styles: { value: Style | "all"; label: string }[] = [
  { value: "all", label: "All Styles" },
  { value: "streetwear", label: "Streetwear" },
  { value: "y2k", label: "Y2K" },
  { value: "minimalist", label: "Minimalist" },
  { value: "cottagecore", label: "Cottagecore" },
  { value: "preppy", label: "Preppy" },
  { value: "grunge", label: "Grunge" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<Category | "all">("all");
  const [style, setStyle] = useState<Style | "all">("all");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const filterParam = searchParams.get("filter");
    const styleParam = searchParams.get("style") as Style | null;
    if (styleParam) setStyle(styleParam);
    if (filterParam === "trending" || filterParam === "newArrival") {
      // handled in filtered list
    }
  }, [searchParams]);

  const filterParam = searchParams.get("filter");

  let filtered = products;

  if (filterParam === "trending") {
    filtered = filtered.filter((p) => p.trending);
  } else if (filterParam === "newArrival") {
    filtered = filtered.filter((p) => p.newArrival);
  }

  if (category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (style !== "all") {
    filtered = filtered.filter((p) => p.styles.includes(style as Style));
  }

  if (sortBy === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  const pageTitle =
    filterParam === "trending"
      ? "Trending Now"
      : filterParam === "newArrival"
      ? "New Arrivals"
      : "Shop All";

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-black mb-2">{pageTitle}</h1>
      <p className="text-gray-500 mb-8">{filtered.length} items</p>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                category === cat.value
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-600 border-gray-200 hover:border-black"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2 md:ml-auto flex-wrap">
          {/* Style filter */}
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value as Style | "all")}
            className="border border-gray-200 rounded-full px-4 py-2 text-sm font-semibold bg-white appearance-none cursor-pointer hover:border-black transition-colors"
          >
            {styles.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-200 rounded-full px-4 py-2 text-sm font-semibold bg-white appearance-none cursor-pointer hover:border-black transition-colors"
          >
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl font-bold mb-2">No items found</p>
          <p className="text-gray-500">Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-10">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  { name: "الكل", slug: "all" },
  { name: "سفرة", slug: "dining" },
  { name: "انتريهات", slug: "sofas" },
  { name: "ترابيزات", slug: "tables" },
  { name: "كونسول", slug: "console" },
];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  const handleFilter = (slug: string) => {
    if (slug === "all") {
      router.push("/",{scroll:false});
    } else {
      router.push(`/?category=${slug}`,{scroll:false});
    }
  };

  return (
    <div className="w-full py-6">
      <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => handleFilter(cat.slug)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap border
              ${
                currentCategory === cat.slug
                  ? "bg-zinc-900 text-white border-zinc-900 shadow-md scale-105"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400"
              }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}

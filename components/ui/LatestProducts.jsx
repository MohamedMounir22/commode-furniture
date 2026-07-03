"use client";

import { useLanguage } from "@/lib/context/LanguageProvider";
import { LayoutGrid } from "lucide-react";
import { useState } from "react";
import ProductCard from "./ProductCard";

export default function LatestProducts({ products }) {
    const { t } = useLanguage();
    const [viewMode, setViewMode] = useState("list");

    if (!products || products.length === 0) {
        return (
            <section className="w-full py-20 bg-black border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center min-h-75">
                    <div className="flex flex-col items-center gap-3 text-center">
                        <h2 className="text-3xl font-extrabold text-primary tracking-[0.25em] uppercase animate-pulse">
                            COMMODE
                        </h2>
                        <p className="text-xs font-light text-primary/70 tracking-[0.3em] uppercase">
                            {t("latestProducts.loading")}
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-8 bg-transparent">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 px-4">

                <div className="flex items-center gap-2 justify-center w-full sm:w-auto sm:justify-start">
                    {/* زر عرض الشبكة (Grid) */}
                    <button
                        type="button"
                        onClick={() => setViewMode("grid")}
                        // 🎯 التعديل هنا: توحيد الحواف والألوان بالثيم الذهبي والزجاجي الشفاف
                        className={`rounded-xl border p-3 text-sm font-bold tracking-wide transition-all duration-300 ${viewMode === "grid"
                            ? "bg-primary text-black border-transparent shadow-[0_4px_15px_rgba(214,175,55,0.25)] scale-105"
                            : "bg-white/3 text-zinc-300 border-white/8 backdrop-blur-md hover:text-primary hover:border-primary/50"
                            }`}
                        aria-pressed={viewMode === "grid"}
                        aria-label={t("latestProducts.gridView")}
                    >
                        <LayoutGrid className="h-5 w-5" />
                    </button>

                    {/* زر عرض القائمة (List) */}
                    <button
                        type="button"
                        onClick={() => setViewMode("list")}
                        // 🎯 التعديل هنا: توحيد الحواف والألوان بالثيم الذهبي والزجاجي الشفاف
                        className={`rounded-xl border p-3 text-sm font-bold tracking-wide transition-all duration-300 ${viewMode === "list"
                            ? "bg-primary text-black border-transparent shadow-[0_4px_15px_rgba(214,175,55,0.25)] scale-105"
                            : "bg-white/3 text-zinc-300 border-white/8 backdrop-blur-md hover:text-primary hover:border-primary/50"
                            }`}
                        aria-pressed={viewMode === "list"}
                        aria-label={t("latestProducts.listView")}
                    >
                        <div className="grid grid-cols-1 gap-1 w-5 h-5 mx-auto">
                            <span className="block h-1.5 w-1.5 bg-current mx-auto" />
                            <span className="block h-1.5 w-1.5 bg-current mx-auto" />

                        </div>
                    </button>
                </div>
            </div>

            <div
                className={`grid gap-4 px-1 ${viewMode === "grid"
                    ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    : "grid-cols-1"
                    }`}
            >
                {products.map((item) => (
                    <ProductCard
                        key={item._id}
                        viewMode={viewMode}
                        {...item}
                    />
                ))}
            </div>
        </section>
    );
}

"use client";

import { useLanguage } from "@/lib/context/LanguageProvider";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

export default function LatestProducts({ products }: any) {
    const { t } = useLanguage();
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    if (!products || products.length === 0) {
        return <p className="text-center py-10">{t("latestProducts.loading")}</p>;
    }

    return (
        <section className="py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 px-4">
                <h2 className="text-2xl font-bold text-right">{t("home.latestArrivals")}</h2>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <button
                        type="button"
                        onClick={() => setViewMode("grid")}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${viewMode === "grid"
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                            }`}
                        aria-pressed={viewMode === "grid"}
                    >
                        {t("latestProducts.gridView")}
                    </button>
                    <button
                        type="button"
                        onClick={() => setViewMode("list")}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${viewMode === "list"
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                            }`}
                        aria-pressed={viewMode === "list"}
                    >
                        {t("latestProducts.listView")}
                    </button>
                </div>
            </div>

            <div
                className={`grid gap-2 px-1 ${viewMode === "grid"
                    ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" // هنا خليناه 2 على الموبايل
                    : "grid-cols-1" // هنا هيفضل كارد واحد كبير عمودي
                    }`}
            >
                {products.map((item: any) => (
                    <ProductCard
                        key={item._id}
                        viewMode={viewMode} // مررنا الـ mode هنا
                        {...item} // بدل ما نكتب كل الـ props نستخدم الـ spread
                    />
                ))}
            </div>
        </section>
    );
}

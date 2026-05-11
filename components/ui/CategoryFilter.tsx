"use client";

import { useLanguage } from "@/lib/context/LanguageProvider";
import { useRouter, useSearchParams } from "next/navigation";

const categories = [
    { key: "categories.all", slug: "all" },
    { key: "categories.dining", slug: "dining" },
    { key: "categories.sofas", slug: "sofas" },
    { key: "categories.tables", slug: "tables" },
    { key: "categories.console", slug: "console" },
];

export default function CategoryFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { t } = useLanguage();
    const currentCategory = searchParams.get("category") || "all";

    const handleFilter = (slug: string) => {
        if (slug === "all") {
            router.push("/", { scroll: false });
        } else {
            router.push(`/?category=${slug}`, { scroll: false });
        }
    };

    return (
        <div className="w-full ">
            <div className="flex flex-wrap justify-center gap-3 ">
                {categories.map((cat) => (
                    <button
                        key={cat.slug}
                        onClick={() => handleFilter(cat.slug)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap border
              ${currentCategory === cat.slug
                                ? "bg-zinc-900 text-white border-zinc-900 shadow-md scale-105"
                                : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400"
                            }`}
                    >
                        {t(cat.key)}
                    </button>
                ))}
            </div>
        </div>
    );
}

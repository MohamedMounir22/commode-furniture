"use client";

import { useLanguage } from "@/lib/context/LanguageProvider";
import { useRouter, useSearchParams } from "next/navigation";

const categories = [
    { key: "categories.all", slug: "all" },
    { key: "categories.dining", slug: "dining" },
    { key: "categories.sofas", slug: "sofas" },
     { key: "categories.lShapedSofa", slug: "L-Shaped Sofa" },
    { key: "categories.tables", slug: "tables" },
    { key: "categories.console", slug: "console" },

];

export default function CategoryFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { t } = useLanguage();
    const currentCategory = searchParams.get("category") || "all";

    const handleFilter = (slug) => {
        if (slug === "all") {
            router.push("/", { scroll: false });
        } else {
            router.push(`/?category=${slug}`, { scroll: false });
        }
    };

    return (
        <div className="w-full">
            <div className="flex flex-wrap justify-center gap-3">
                {categories.map((cat) => (
                    <button
                        key={cat.slug}
                        onClick={() => handleFilter(cat.slug)}
                        // ✨ هنا التعديل: تصفية الألوان القديمة واستبدالها بالثيم الأسود الشفاف والذهبي الملكي
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap border tracking-wide shadow-lg
                            ${currentCategory === cat.slug
                                ? "bg-primary text-black border-transparent scale-105 shadow-[0_4px_20px_rgba(214,175,55,0.3)]"
                                : "bg-white/[0.03] text-zinc-300 border-white/[0.08] backdrop-blur-md hover:border-primary/50 hover:text-primary"
                            }`}
                    >
                        {t(cat.key)}
                    </button>
                ))}
            </div>
        </div>
    );
}

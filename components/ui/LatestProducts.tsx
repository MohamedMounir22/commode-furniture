"use client";

import { useLanguage } from "@/lib/context/LanguageProvider";
import nextDynamic from "next/dynamic";

// الـ Lazy Loading لكارت المنتج
const ProductCard = nextDynamic(() => import("./ProductCard"), {
    loading: () => <div className="h-80 bg-gray-100 animate-pulse rounded-2xl" />, // Skeleton مريح للعين
    ssr: false,
});

export default function LatestProducts({ products }: any) {
    const { t } = useLanguage();

    if (!products || products.length === 0) {
        return <p className="text-center py-10">{t("latestProducts.loading")}</p>;
    }

    return (
        <section className="py-8">
            <h2 className="text-2xl font-bold mb-6 text-right px-4">{t("home.latestArrivals")}</h2>

            {/* Grid الموبايل (صف واحد) والكمبيوتر (3 صفوف) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                {products.map((item: any) => (
                    <ProductCard
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        price={item.price} // أو حسب مسمى الحقل عندك في الداتابيز
                        discount={item.discount || 0}
                        images={item.images} // أو حسب مسمى الحقل عندك في الداتابيز
                        description={item.description}
                    />
                ))}
            </div>
        </section>
    );
}

"use client";

import Hero from "@/components/Hero";
import LastDelivered from "@/components/LastDelivered";
import CategoryFilter from "@/components/ui/CategoryFilter";
import LatestProducts from "@/components/ui/LatestProducts";
import { useLanguage } from "@/lib/context/LanguageProvider";

export default function LocalizedHome({ products }) {
    const { t } = useLanguage();

    return (
        // 🎯 التعديل هنا وبس: حولنا الخلفيات لـ bg-transparent عشان الحرير والزوايا الذهبية تظهر ورا الكروت
        <div className="flex flex-col flex-1 bg-transparent text-white font-sans min-h-screen">
            <main className="flex flex-1 w-full flex-col items-center bg-transparent">

                {/* قسم الهيرو السينمائي */}
                <Hero />

                {/* قسم آخر المنتجات المسلمة */}
                <LastDel ivered />

                {/* قسم المعرض والمنتجات الأحدث */}
                <section className="w-full max-w-7xl py-16 px-4 sm:px-6 bg-transparent">

                    {/* ✨ العنوان الرئيسي بالذهبي الملكي الفخم */}
                    <h2 className="text-3xl md:text-4xl font-black text-primary text-center tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                        {t("home.latestArrivals")}
                    </h2>

                    {/* فلتر الفئات */}
                    <div className="w-full flex justify-center pt-8">
                        <div className="w-full max-w-7xl">
                            <CategoryFilter />
                        </div>
                    </div>

                    {/* شبكة المنتجات (الكومود، الصالونات, الطاولات) */}
                    <LatestProducts products={products} />
                </section>

            </main>
        </div>
    );
}

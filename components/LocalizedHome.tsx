"use client";

import Hero from "@/components/Hero";
import LastDelivered from "@/components/LastDelivered";
import CategoryFilter from "@/components/ui/CategoryFilter";
import LatestProducts from "@/components/ui/LatestProducts";
import { useLanguage } from "@/lib/context/LanguageProvider";

export default function LocalizedHome({ products }: { products: any[] }) {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full flex-col items-center">
                <Hero />

                <LastDelivered />

                <div className="w-full flex justify-center py-10">
                    <div className="w-full max-w-7xl">
                        <CategoryFilter />
                    </div>
                </div>

                <section className="w-full max-w-7xl py-20 px-4 sm:px-6">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                        {t("home.latestArrivals")}
                    </h2>
                    <LatestProducts products={products} />
                </section>

                {/* <section className="w-full max-w-7xl py-20 px-4 sm:px-6">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                        {t("home.featuredPieces")}
                    </h2>
                    <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="group relative bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800"
                            >
                                <div className="aspect-square w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800 mb-4" />
                                <h3 className="text-lg font-medium">Classic Commode {i}</h3>
                                <p className="text-zinc-500">$499.00</p>
                            </div>
                        ))}
                    </div>
                </section> */}
            </main>
        </div>
    );
}

"use client";

import Hero from "@/components/Hero";
import LastDelivered from "@/components/LastDelivered";
import CategoryFilter from "@/components/ui/CategoryFilter";
import LatestProducts from "@/components/ui/LatestProducts";
import { useLanguage } from "@/lib/context/LanguageProvider";

export default function LocalizedHome({ products }) {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col flex-1 bg-background font-sans">
            <main className="flex flex-1 w-full flex-col items-center">
                <Hero />

                <LastDelivered />



                <section className="w-full max-w-7xl py-10 sm:px-6">

                    <h2 className="text-3xl font-bold text-foreground text-center mx-auto">
                        {t("home.latestArrivals")}
                    </h2>

                    <div className="w-full flex justify-center pt-8">
                        <div className="w-full max-w-7xl">
                            <CategoryFilter />
                        </div>
                    </div>

                    <LatestProducts products={products} />
                </section>

            </main>
        </div>
    );
}

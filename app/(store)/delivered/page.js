"use client";

import { useLanguage } from "@/lib/context/LanguageProvider";
import { ArrowLeft, CheckCircle2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DeliveredPage() {
  const { t, locale } = useLanguage();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/last-delivered?isActive=true");
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch delivered items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-[#D4AF37] animate-pulse uppercase tracking-[0.2em]">
          COMMODE
        </h2>
        <p className="text-zinc-500 text-sm">{t("deliveredPage.loading")}</p>
      </div>
    );
  }

  return (
    <div
      className="bg-zinc-50 dark:bg-black min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-6 group"
          >
            <ArrowLeft
              size={20}
              className={locale === "ar" ? "rotate-180" : ""}
            />
            <span className="text-sm font-medium">
              {t("productDetail.backToProducts")}
            </span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">
            {t("deliveredPage.title")}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
              {t("deliveredPage.subtitle")}
            </p>
          </div>
        </div>

        {/* Delivered List */}
        <div className="flex flex-col gap-4 md:gap-8">
          {items.map((item, index) => (
            <div
              key={item._id}
              className="group bg-white dark:bg-zinc-900 overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 rounded-[2rem] hover:shadow-xl flex flex-col md:flex-row"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-80 w-full md:w-2/5 md:h-auto">
                <Image
                  src={item.image}
                  alt={locale === "ar" ? item.nameAr : item.nameEn}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1280px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-40" />

                {/* Location Badge */}
                <div
                  className={`absolute bottom-4 ${
                    locale === "ar" ? "right-4" : "left-4"
                  } flex items-center gap-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-white/20 z-10`}
                >
                  <MapPin size={14} className="text-amber-600" />
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    {locale === "ar" ? item.locationAr : item.locationEn}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 line-clamp-1">
                    {locale === "ar" ? item.nameAr : item.nameEn}
                  </h3>
                  <span className="text-xs font-medium text-zinc-400 whitespace-nowrap">
                    {locale === "ar" ? item.dateAr : item.dateEn}
                  </span>
                </div>

                <div className="h-px bg-zinc-100 dark:bg-zinc-800 mb-4" />

                <div className="flex items-center justify-between">
                  <div
                    className={`flex items-center gap-2 ${
                      locale === "ar" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-1.5 rounded-md">
                      <CheckCircle2
                        size={14}
                        className="text-amber-600 dark:text-amber-400"
                      />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-400">
                      {locale === "ar"
                        ? "تم التسليم بنجاح"
                        : "Successfully Delivered"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && !loading && (
          <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-[3rem] border border-dashed border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500">No delivered products found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

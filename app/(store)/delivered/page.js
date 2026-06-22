"use client";

import { useLanguage } from "@/lib/context/LanguageProvider";
import { ArrowLeft, CheckCircle2, MapPin, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DeliveredPage() {
  const { t, locale } = useLanguage();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);

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
      className="bg-black min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft
              size={20}
              className={locale === "ar" ? "rotate-180" : ""}
            />
            <span className="text-sm font-medium">
              {t("productDetail.backToProducts")}
            </span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {t("deliveredPage.title")}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
              {t("deliveredPage.subtitle")}
            </p>
          </div>
        </div>

        {/* Delivered List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, index) => (
            <div
              key={item._id}
              className="group h-full bg-zinc-900 rounded-3xl overflow-hidden border border-white/[0.06] shadow-2xl flex flex-col transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-72 w-full overflow-hidden bg-black">
                <button
                  type="button"
                  onClick={() => setPreviewImage(item.image)}
                  className="absolute inset-0 z-20 w-full h-full bg-transparent cursor-zoom-in border-none"
                  aria-label="Open image preview"
                />
                <Image
                  src={item.image}
                  alt={locale === "ar" ? item.nameAr : item.nameEn}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

                {/* Location Badge */}
                <div
                  className={`absolute bottom-4 ${
                    locale === "ar" ? "right-4" : "left-4"
                  } flex items-center gap-2 bg-zinc-950/80 backdrop-blur-md px-3 py-2 rounded-xl shadow-xl border border-white/[0.05]`}
                >
                  <div className="bg-[#d4af37] p-1.5 rounded-lg">
                    <MapPin size={12} className="text-black stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">
                      {locale === "ar" ? item.locationAr : item.locationEn}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content Container */}
              <div
                className={`flex-1 flex flex-col justify-between p-6 ${locale === "ar" ? "text-right" : "text-left"}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-bold text-white line-clamp-1 tracking-tight leading-none">
                    {locale === "ar" ? item.nameAr : item.nameEn}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div
                      className={`flex items-center gap-2 ${
                        locale === "ar" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div className="bg-[#d4af37]/10 p-1.5 rounded-lg">
                        <CheckCircle2 size={14} className="text-[#d4af37]" />
                      </div>
                      <span className="text-[10px] font-black text-[#d4af37] uppercase tracking-widest leading-none">
                        {locale === "ar"
                          ? "تم التسليم"
                          : "Delivered"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="my-4 h-px bg-white/[0.05]" />
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && !loading && (
          <div className="text-center py-20 bg-zinc-900 rounded-3xl border border-white/[0.06]">
            <p className="text-white/60">No delivered products found.</p>
          </div>
        )}
      </div>

      {/* Fullscreen Image Preview */}
      {previewImage && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm transition-all duration-300"
          role="dialog"
          aria-modal="true"
          onClick={() => setPreviewImage(null)}
        >
          {/* زر الإغلاق */}
          <button
            type="button"
            className="absolute top-6 right-6 z-50 rounded-full bg-white/10 p-3 text-white transition-all duration-200  cursor-pointer"
            onClick={(event) => {
              event.stopPropagation();
              setPreviewImage(null);
            }}
            aria-label="Close image preview"
          >
            <X size={24} />
          </button>

          {/* حاوية الصورة - تأكيد الأبعاد للعرض والارتفاع الكامل */}
          <div
            className="relative w-full h-full max-w-5xl max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={previewImage}
              alt="Fullscreen Preview"
              fill
              className="object-contain select-none pointer-events-none"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { useLanguage } from "@/lib/context/LanguageProvider";
  import { ArrowRight, CheckCircle2, MapPin, ShieldCheck, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function LastDelivered() {
  const { locale, t } = useLanguage();
  const isRtl = locale === "ar";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/last-delivered?isActive=true");
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch last delivered items:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="w-full py-20 bg-black border-y border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center min-h-[300px]">
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="text-3xl font-extrabold text-primary tracking-[0.25em] uppercase animate-pulse">
              COMMODE
            </h2>
            <p className="text-xs font-light text-primary/70 tracking-[0.3em] uppercase">
              {t("deliveredPage.loading")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      // 🖤 تعديل ألوان السكشن: أسود فاحم صامت مدمج بالكامل مع خلفية الموقع مع حدود مخفية ناعمة
      className="w-full py-20 bg-black border-y border-white/[0.05]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 ${isRtl ? "md:flex-row-reverse" : ""}`}
        >
          <div className={isRtl ? "text-right" : "text-left"}>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {/* العنوان الرئيسي بالأبيض الناصع */}
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight whitespace-nowrap">
                {t("deliveredPage.recentlyDelivered")}
              </h2>
              {/* شارة الضمان منورة بالذهبي الملكي صريح */}
              <div className="flex items-center gap-2 text-xs text-primary font-bold tracking-widest uppercase">
                <ShieldCheck size={18} className="text-primary" />
                {t("deliveredPage.qualityGuaranteed")}
              </div>
            </div>

            {/* زرار "عرض الكل" واخد الذهبي الملكي الفخم */}
            <Link
              href="/delivered"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-bold transition-colors group text-sm"
            >
              <span>{t("deliveredPage.viewAllDeliveries")}</span>
              <ArrowRight
                size={16}
                className={`transition-transform group-hover:translate-x-1 ${isRtl ? "rotate-180 group-hover:-translate-x-1" : ""}`}
              />
            </Link>
          </div>
        </div>

        <Swiper
          key={locale}
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          dir={isRtl ? "rtl" : "ltr"}
          className="last-delivered-swiper !pb-20"
        >
          {items.map((item) => (
            <SwiperSlide key={item._id}>
              {/* 🎯 كارد المنتج المسلم: تحول لرمادي داكن فاخر (bg-zinc-900) عشان يفصل بشياكة والحدود ناعمة جداً */}
              <div className="group h-full bg-zinc-900 rounded-3xl overflow-hidden border border-white/[0.06] shadow-2xl flex flex-col">
                {/* Image Container */}
                <div className="relative h-72 w-full overflow-hidden bg-black">
                  <button
                    type="button"
                    onClick={() => setPreviewImage(item.image)}
                    className="absolute inset-0 z-20 w-full h-full bg-transparent cursor-zoom-in border-none"
                    aria-label="Open image preview"
                  />
                  <Image
                    src={item.image}
                    alt={isRtl ? item.nameAr : item.nameEn}
                    fill
                    className="object-cover transition-transform duration-500 "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

                  {/* شارة الموقع: اتعدلت لتصبح زجاجية داكنة شفافة تتماشى مع التصميم */}
                  <div
                    className={`absolute bottom-4 ${isRtl ? "right-4" : "left-4"} flex items-center gap-2 bg-zinc-950/80 backdrop-blur-md px-3 py-2 rounded-xl shadow-xl border border-white/[0.05]`}
                  >
                    <div className="bg-primary p-1.5 rounded-lg">
                      <MapPin size={12} className="text-black stroke-[2.5]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">
                        {isRtl ? item.locationAr : item.locationEn}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content Container */}
                <div
                  className={`flex-1 flex flex-col justify-between p-6 ${isRtl ? "text-right" : "text-left"}`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    {/* اسم المنتج بالأبيض الفخم */}
                    <h3 className="text-lg font-bold text-white line-clamp-1 tracking-tight">
                      {isRtl ? item.nameAr : item.nameEn}
                    </h3>
                    {/* التاريخ بلون هادئ */}
                    <p className="text-xs text-zinc-500 font-medium shrink-0">
                      {isRtl ? item.dateAr : item.dateEn}
                    </p>
                  </div>

                  <div className="my-4 h-px bg-white/[0.05]" />

                  {/* حالة التسليم: منورة بالذهبي بالكامل */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}
                    >
                      <div className="bg-primary/10 p-1.5 rounded-lg">
                        <CheckCircle2 size={14} className="text-primary" />
                      </div>
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                        {t("deliveredPage.deliveredStatus")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Fullscreen Image Preview */}
        {previewImage && (
          <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm transition-all duration-300"
            role="dialog"
            aria-modal="true"
            onClick={() => setPreviewImage(null)}
          >
            {/* Close Button */}
            <button
              type="button"
              className="absolute top-6 right-6 z-50 rounded-full bg-white/10 p-3 text-white transition-all duration-200 cursor-pointer hover:bg-white/20"
              onClick={(event) => {
                event.stopPropagation();
                setPreviewImage(null);
              }}
              aria-label="Close image preview"
            >
              <X size={24} />
            </button>

            {/* Image Container */}
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

        {/* 🎨 تعديل ألوان نقاط السوايب للذهبي الفخم بدلاً من الأسود */}
        <style jsx global>{`
          .last-delivered-swiper {
            --swiper-pagination-bottom: 0;
          }

          .last-delivered-swiper .swiper-pagination {
            bottom: 0 !important;
            padding-bottom: 10px;
          }

          .last-delivered-swiper .swiper-pagination-bullet {
            background: var(--color-primary, #D4AF37) !important;
            opacity: 0.2;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            margin: 0 6px !important;
          }

          .last-delivered-swiper .swiper-pagination-bullet-active {
            background: var(--color-primary, #D4AF37) !important;
            opacity: 1 !important;
            width: 28px;
            border-radius: 12px;
            box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
            animation: active-pill-glow 3s infinite ease-in-out;
          }

          @keyframes active-pill-glow {
            0%,
            100% {
              box-shadow: 0 0 12px rgba(212, 175, 55, 0.3);
              transform: scale(1);
            }
            50% {
              box-shadow: 0 0 20px rgba(212, 175, 55, 0.6);
              transform: scale(1.05);
            }
          }
        `}</style>
      </div>
    </section>
  );
}

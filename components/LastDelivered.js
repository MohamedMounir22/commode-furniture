"use client";
import { useLanguage } from "@/lib/context/LanguageProvider";
import { ArrowRight, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function LastDelivered() {
  const { locale, t } = useLanguage();
  const isRtl = locale === "ar";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <section className="w-full py-20 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center min-h-[300px]">
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="text-3xl font-extrabold text-[#D4AF37] tracking-[0.25em] uppercase animate-pulse">
              COMMODE
            </h2>
            <p className="text-xs font-light text-[#D4AF37]/70 tracking-[0.3em] uppercase">
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
      className="w-full py-50 bg-zinc-50/50 dark:bg-zinc-950/50 border-y border-zinc-200/50 dark:border-zinc-800/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 ${isRtl ? "md:flex-row-reverse" : ""}`}
        >
          <div className={isRtl ? "text-right" : "text-left"}>
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight whitespace-nowrap">
                {t("deliveredPage.recentlyDelivered")}
              </h2>
              <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 font-bold tracking-widest uppercase">
                <ShieldCheck size={18} />
                {t("deliveredPage.qualityGuaranteed")}
              </div>
            </div>

            <Link
              href="/delivered"
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-bold transition-colors group"
            >
              <span>{t("deliveredPage.viewAllDeliveries")}</span>
              <ArrowRight
                size={18}
                className={`transition-transform group-hover:translate-x-1 ${isRtl ? "rotate-180 group-hover:-translate-x-1" : ""}`}
              />
            </Link>
          </div>
          {/* <p
            className={`text-lg text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed ${locale === "ar" ? "text-right" : "text-left"}`}
          >
            {locale === "ar"
              ? "انظر كيف تحولت منازل عملائنا بقطعنا الفنية. تسليم آمن وتركيب محترف في جميع أنحاء مصر."
              : "See how our artisanal pieces elevate real homes. Expert delivery and installation nationwide."}
          </p> */}
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
              <div className="group h-full bg-card rounded-3xl overflow-hidden border border-border shadow-lg flex flex-col">
                {/* Image Container */}
                <div className="relative h-72 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={item.image}
                    alt={isRtl ? item.nameAr : item.nameEn}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />

                  {/* Location Badge */}
                  <div
                    className={`absolute bottom-4 ${isRtl ? "right-4" : "left-4"} flex items-center gap-2 bg-card/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg border border-border`}
                  >
                    <div className="bg-primary p-1.5 rounded-lg">
                      <MapPin size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {isRtl ? item.locationAr : item.locationEn}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content Container */}
                <div
                  className={`flex-1 flex flex-col justify-between p-6 sm:p-7 ${isRtl ? "text-right" : "text-left"}`}
                >
                  {/* Product Info */}
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-xl font-bold text-foreground line-clamp-1 tracking-tight leading-tight">
                      {isRtl ? item.nameAr : item.nameEn}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium shrink-0">
                      {isRtl ? item.dateAr : item.dateEn}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="my-4 h-px bg-border" />

                  {/* Delivery Status */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}
                    >
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <CheckCircle2 size={16} className="text-primary" />
                      </div>
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">
                        {t("deliveredPage.deliveredStatus")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <style jsx global>{`
          .last-delivered-swiper {
            --swiper-pagination-bottom: 0;
          }

          .last-delivered-swiper .swiper-pagination {
            bottom: 0 !important;
            padding-bottom: 10px;
            color: black;
          }

          .last-delivered-swiper .swiper-pagination-bullet {
            background: black !important;
            opacity: 0.5;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            margin: 0 6px !important;
          }

          .last-delivered-swiper .swiper-pagination-bullet-active {
            background: black !important;
            opacity: 1 !important;
            width: 28px;
            border-radius: 12px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
            animation: active-pill-glow 3s infinite ease-in-out;
          }

          @keyframes active-pill-glow {
            0%,
            100% {
              box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
              transform: scale(1);
            }
            50% {
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
              transform: scale(1.05);
            }
          }
        `}</style>
      </div>
    </section>
  );
}

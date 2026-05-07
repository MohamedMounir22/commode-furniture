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
  const { locale } = useLanguage();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/last-delivered?isActive=true");
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
      <section className="w-full py-20 bg-zinc-50/50 dark:bg-zinc-950/50 border-y border-zinc-200/50 dark:border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center min-h-[300px]">
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="text-3xl font-extrabold text-[#D4AF37] tracking-[0.25em] uppercase animate-pulse">
              COMMODE
            </h2>
            <p className="text-xs font-light text-[#D4AF37]/70 tracking-[0.3em] uppercase">
              {locale === "ar" ? "جاري تجهيز اخر الاعمال ..." : "last delivered ..."}
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
    <section className="w-full py-20 bg-zinc-50/50 dark:bg-zinc-950/50 border-y border-zinc-200/50 dark:border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 ${locale === "ar" ? "md:flex-row-reverse" : ""}`}
        >
          <div className={locale === "ar" ? "text-right" : "text-left"}>
            <div
              className={`flex items-center gap-2 mb-3 text-amber-600 dark:text-amber-400 font-bold tracking-widest text-xs uppercase ${locale === "ar" ? "flex-row-reverse" : ""}`}
            >
              <ShieldCheck size={16} />
              {locale === "ar" ? "ضمان الجودة" : "Quality Guaranteed"}
            </div>
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight mb-4">
              {locale === "ar" ? "أحدث التسليمات" : "Recently Delivered"}
            </h2>
            <Link
              href="/delivered"
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-bold transition-colors group"
            >
              <span>{locale === "ar" ? "عرض جميع التسليمات" : "View All Deliveries"}</span>
              <ArrowRight size={18} className={`transition-transform group-hover:translate-x-1 ${locale === "ar" ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
            </Link>
          </div>
          <p
            className={`text-lg text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed ${locale === "ar" ? "text-right" : "text-left"}`}
          >
            {locale === "ar"
              ? "انظر كيف تحولت منازل عملائنا بقطعنا الفنية. تسليم آمن وتركيب محترف في جميع أنحاء مصر."
              : "See how our artisanal pieces elevate real homes. Expert delivery and installation nationwide."}
          </p>
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
          dir={locale === "ar" ? "rtl" : "ltr"}
          className="last-delivered-swiper !pb-20"
        >
          {items.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="group h-full bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 rounded-3xl overflow-hidden border border-zinc-100/80 dark:border-zinc-800/80 shadow-lg flex flex-col">
                {/* Image Container */}
                <div className="relative h-72 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={item.image}
                    alt={locale === "ar" ? item.nameAr : item.nameEn}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />

                  {/* Location Badge */}
                  <div
                    className={`absolute bottom-4 ${locale === "ar" ? "right-4" : "left-4"} flex items-center gap-2 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg border border-white/20 dark:border-zinc-700/20`}
                  >
                    <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-1.5 rounded-lg">
                      <MapPin size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {locale === "ar" ? item.locationAr : item.locationEn}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content Container */}
                <div
                  className={`flex-1 flex flex-col justify-between p-6 sm:p-7 ${locale === "ar" ? "text-right" : "text-left"}`}
                >
                  {/* Product Info */}
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 line-clamp-1 tracking-tight leading-tight">
                      {locale === "ar" ? item.nameAr : item.nameEn}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium shrink-0">
                      {locale === "ar" ? item.dateAr : item.dateEn}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="my-4 h-px bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 dark:from-amber-900/30 dark:via-amber-800/30 dark:to-amber-900/30" />

                  {/* Delivery Status */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex items-center gap-2 ${locale === "ar" ? "flex-row-reverse" : ""}`}
                    >
                      <div className="bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/20 dark:to-amber-800/10 p-2 rounded-lg">
                        <CheckCircle2
                          size={16}
                          className="text-amber-600 dark:text-amber-400"
                        />
                      </div>
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
                        {locale === "ar" ? "تم التسليم" : "Delivered"}
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
          }

          .last-delivered-swiper .swiper-pagination-bullet {
            background: #d4d4d8;
            opacity: 0.5;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            margin: 0 6px !important;
          }

          .last-delivered-swiper .swiper-pagination-bullet-active {
            background: linear-gradient(135deg, #27272a 0%, #000000 100%);
            color: black;
            width: 28px;
            opacity: 1;
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

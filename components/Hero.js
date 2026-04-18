"use client"; // مهم جداً لأن Swiper بيعتمد على الـ Client-side
import { useLanguage } from "@/lib/context/LanguageProvider";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// استيراد استايلات Swiper
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    title: "Artisanal Elegance for Modern Living",
    desc: "Discover our latest collection of handcrafted furniture pieces designed to elevate your home.",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2070",
  },
  {
    id: 2,
    title: "Modern Golden Accents",
    desc: "Add a touch of luxury to your space with our exclusive gold-finished artisanal collection.",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=2158",
  },
  {
    id: 3,
    title: "Timeless Craftsmanship",
    desc: "Premium materials and precise execution come together in every unique piece we create.",
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=2070",
  },
];

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full h-[85vh] relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect={"fade"}
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="h-full w-full group"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* الصورة الخلفية */}
            <div className="absolute inset-0">
              <Image
                src={slide.img}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />
              {/* Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex h-full items-center justify-center text-center text-white px-4">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl text-slate-200 mb-10 leading-relaxed font-light">
                  {slide.desc}
                </p>
                <Link
                  href="/products"
                  className="inline-block bg-white text-black hover:bg-zinc-200 px-12 py-5 rounded-full text-lg font-bold transition-all transform hover:scale-105 active:scale-95 shadow-2xl"
                >
                  {t("hero.button")}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .group:hover .swiper-button-next,
        .group:hover .swiper-button-prev {
          opacity: 0.7;
        }
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: white !important;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default Hero;

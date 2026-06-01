"use client"; // مهم جداً لأن Swiper بيعتمد على الـ Client-side
import { useLanguage } from "@/lib/context/LanguageProvider";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// import hero images from public folder as fallback
import amod from "../public/hero/hero-3amod-table.jpg";
import moving from "../public/hero/hero-moving-table.jpg";
import be2zaz from "../public/hero/hero-table-be2zaz.jpg";

// استيراد استايلات Swiper
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = () => {
  const { t, locale } = useLanguage();
  const defaultSlides = [
    {
      id: 1,
      title: "Artisanal Elegance for Modern Living",
      description:
        "Discover our latest collection of handcrafted furniture pieces designed to elevate your home.",
      image: amod,
      buttonText: t("hero.button"),
      buttonLink: "/products",
    },
    {
      id: 2,
      title: "Modern Golden Accents",
      description:
        "Add a touch of luxury to your space with our exclusive gold-finished artisanal collection.",
      image: moving,
      buttonText: t("hero.button"),
      buttonLink: "/products",
    },
    {
      id: 3,
      title: "Timeless Craftsmanship",
      description:
        "Premium materials and precise execution come together in every unique piece we create.",
      image: be2zaz,
      buttonText: t("hero.button"),
      buttonLink: "/products",
    },
  ];
  const [slides, setSlides] = useState(defaultSlides);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch("/api/hero");
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          setSlides(data.data);
        } else {
          setSlides(defaultSlides);
        }
      } catch (error) {
        console.error("Error fetching hero slides:", error);
        setSlides(defaultSlides);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, [locale]);

  return (
    <section className="w-full h-[60vh] md:h-[85vh] relative bg-black overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect={"fade"}
        speed={1200}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="h-full w-full group"
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide._id || slide.id}
            className="relative w-full h-full"
          >
            {/* 1. حلفية الصورة مع عمل تدرج غامق سينمائي يحمي النصوص ويبرز تفاصيل المنتج */}
            <div className="absolute inset-0 z-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover object-center scale-105 animate-luxury-fade"
                priority
                sizes="100vw"
              />
              {/* التدرج السينمائي الأسود الفخم الداكن من الأسفل ومن الخلف */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
            </div>

            {/* 2. حاوي المحتوى والنصوص والزرار الذهبي */}
            <div className="relative z-10 flex h-full items-center justify-center text-center text-white px-4">
              <div className="max-w-4xl space-y-6">
                {/* العنوان بالذهبي الملكي الفخم وتأثير الظل الناعم */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-primary drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
                  {slide.title}
                </h1>

                {/* الوصف بالرمادي الفاتح الفاخر المريح للعين */}
                <p className="text-base md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-[0_3px_5px_rgba(0,0,0,0.6)]">
                  {slide.description}
                </p>

                {/* 3. الزرار الرئيسي: أسود مطفأ بحدود ذهبية خفيفة ويقلب ذهبي كامل عند الـ Hover */}
                <div className="pt-4">
                  <Link
                    href={slide.buttonLink || "/products"}
                    className="inline-block bg-zinc-900 text-primary border border-primary/40 hover:bg-primary hover:text-black hover:border-transparent px-10 py-4 rounded-xl text-base font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                  >
                    {slide.buttonText || t("hero.button")}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 4. استايلات Swiper المخصصة باللون الذهبي المطابق للصورة */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #d4af37 !important; /* السهم يقلب ذهبي ملكي */
          opacity: 0;
          transition: all 0.3s ease;
        }
        .group:hover .swiper-button-next,
        .group:hover .swiper-button-prev {
          opacity: 0.8;
        }
        .swiper-pagination-bullet {
          background: #zinc-500 !important;
          opacity: 0.4;
        }
        /* كبسولة الـ Pagination النشطة تنور بالذهبي الفخم المتوهج */
        .swiper-pagination-bullet-active {
          background: linear-gradient(90deg, #d4af37 0%, #aa8416 100%) !important;
          opacity: 1 !important;
          width: 40px !important;
          border-radius: 8px !important;
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.6);
          animation: hero-active-pill 3s infinite ease-in-out;
        }

        @keyframes hero-active-pill {
          0%, 100% {
            box-shadow: 0 0 8px rgba(212, 175, 55, 0.4);
          }
          50% {
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.8);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;

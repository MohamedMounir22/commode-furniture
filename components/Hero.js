"use client"; // مهم جداً لأن Swiper بيعتمد على الـ Client-side
import { useLanguage } from "@/lib/context/LanguageProvider";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// استيراد استايلات Swiper
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = () => {
  const { t, locale } = useLanguage();

  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      setLoading(true);

      try {
        const response = await fetch("/api/hero");
        const data = await response.json();

        if (data.success && Array.isArray(data.data)) {
          const validHeroSlides = data.data.filter(
            (slide) => slide.image && slide.buttonLink,
          );
          setSlides(validHeroSlides);
        } else {
          setSlides([]);
        }
      } catch (error) {
        console.error("Error fetching hero slides:", error);
        setSlides([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, [locale]);

  if (loading) {
    return (
      <section className="w-full py-20 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center min-h-75">
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="text-3xl font-extrabold text-primary tracking-[0.25em] uppercase animate-pulse">
              COMMODE
            </h2>
            <p className="text-xs font-light text-primary/70 tracking-[0.3em] uppercase">
              {t("hero.loading")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!slides.length) {
    return null;
  }

  return (
    // غيّر سطر الـ section ليكون بارتفاع مرن يعتمد على أبعاد الصورة على الموبايل
    <section className="w-full aspect-3/2 md:h-[85vh] md:aspect-auto relative bg-black overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect={"fade"}
        speed={1200}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={false}
        loop={true}
        className="h-full w-full group"
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide._id || slide.id}
            className="relative w-full h-full"
          >
            <Link
              href={slide.buttonLink}
              className="absolute inset-0 z-0 block"
            >
              {/* رجعنا الـ object-cover هنا لأن السكشن نفسه خلاص بقى متناسق مع أبعاد الصورة ومفيش حاجة هتتقطع */}
              <Image
                src={slide.image}
                alt={slide.title || t("hero.button")}
                fill
                className="object-fit object-center animate-luxury-fade"
                priority
                sizes="100vw"
              />
              {/* عدل السطر ده وخليه يضيف تظليل غامق من فوق لتحت (from-black/50) */}
              <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/10 to-transparent z-10 pointer-events-none" />{" "}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* استايلات Swiper المخصصة */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
        }

        .swiper-pagination-bullet-active {
          background: var(--color-primary);
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default Hero;

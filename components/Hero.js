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

      // image from public folder as fallback
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
          // Fallback to default slides if no data
          setSlides(defaultSlides);
        }
      } catch (error) {
        console.error("Error fetching hero slides:", error);
        // Fallback to default slides
        setSlides(defaultSlides);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, [locale]);

  return (
    <section className="w-full h-[50vh] md:h-[85vh] relative">
      {/* {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="mt-4 text-white">Loading...</p>
          </div>
        </div>
      )} */}
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
          <SwiperSlide
            key={slide._id || slide.id}
            className="relative w-full h-full"
          >
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                // className="object-cover object-center min-h-full min-w-full"
                priority
                sizes="100vw"
              />
              {/* Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-foreground/40" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex h-full items-center justify-center text-center text-white px-4">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl text-slate-200 mb-10 leading-relaxed font-light">
                  {slide.description}
                </p>
                <Link
                  href={slide.buttonLink || "/products"}
                  className="inline-block bg-white text-black hover:bg-zinc-200 px-12 py-5 rounded-full text-lg font-bold transition-all transform hover:scale-105 active:scale-95 shadow-2xl"
                >
                  {slide.buttonText || t("hero.button")}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #fff !important;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .group:hover .swiper-button-next,
        .group:hover .swiper-button-prev {
          opacity: 0.7;
        }
        .swiper-pagination-bullet {
          background: #fff !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: linear-gradient(90deg, #fff 0%, #cbd5e1 100%) !important;
          opacity: 1 !important;
          width: 36px !important;
          border-radius: 12px !important;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
          animation: hero-active-pill 2.5s infinite ease-in-out;
        }

        @keyframes hero-active-pill {
          0%,
          100% {
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
            filter: brightness(1);
          }
          50% {
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.6);
            filter: brightness(1.2);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;

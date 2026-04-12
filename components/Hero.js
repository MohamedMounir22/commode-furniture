"use client"; // مهم جداً لأن Swiper بيعتمد على الـ Client-side
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

// استيراد استايلات Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    id: 1,
    title: "أناقة منزلك تبدأ من هنا",
    desc: "اكتشف أحدث تشكيلة من قطع الأثاث المودرن المصممة خصيصاً لذوقك.",
    img: "https://res.cloudinary.com/your-cloud-name/image/upload/v1/99241.jpg", // الترابيزة المودرن
  },
  {
    id: 2,
    title: "لمسات ذهبية عصرية",
    desc: "أضف بريقاً خاصاً لغرفة المعيشة مع قطعنا الذهبية الحصرية.",
    img: "https://res.cloudinary.com/your-cloud-name/image/upload/v1/92284.jpg", // الترابيزة الجولد
  },
  {
    id: 3,
    title: "تصاميم تسبق الزمن",
    desc: "جودة الخامات ودقة التنفيذ في كل قطعة أثاث.",
    img: "https://res.cloudinary.com/your-cloud-name/image/upload/v1/88924.jpg", // القطعة الثالثة
  }
];

const Hero = () => {
  return (
    <section className="w-full h-[85vh] relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect={'fade'} // تأثير التلاشي بيخلي السلايدر فخم جداً
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* الصورة الخلفية */}
            <div className="absolute inset-0">
              <Image
                src={slide.img}
                alt={slide.title}
                fill
                className="object-cover brightness-50"
                priority
              />
            </div>

            {/* المحتوى */}
            <div className="relative z-10 flex h-full items-center justify-center text-center text-white px-4">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-7xl font-bold mb-6 animate-fade-up">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl text-slate-200 mb-8">
                  {slide.desc}
                </p>
                <Link
                  href="/products"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-full text-lg font-bold transition-all"
                >
                  تسوق الآن
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* تنسيق بسيط عشان نغير لون نقط الـ Pagination وأزرار الـ Navigation */}
      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev { color: #d97706 !important; }
        .swiper-pagination-bullet-active { background: #d97706 !important; }
      `}</style>
    </section>
  );
};

export default Hero;

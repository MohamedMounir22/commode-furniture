"use client";
import { useLanguage } from "@/lib/context/LanguageProvider";
import { MapPin, CheckCircle2, ShieldCheck } from "lucide-react";
import Image from "next/image";

// Mock data for recently delivered items
const deliveredItems = [
  {
    id: 1,
    name: "Artisanal Oak Dining Table",
    location: "Maadi, Cairo",
    date: "2 days ago",
    img: "https://images.unsplash.com/photo-1577144334882-6cf97996a6ca?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 2,
    name: "Modern Velvet Sofa",
    location: "New Cairo",
    date: "5 days ago",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 3,
    name: "Golden Accent Console",
    location: "Zayed City",
    date: "1 week ago",
    img: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=1000",
  },
];

export default function LastDelivered() {
  const { locale } = useLanguage();

  return (
    <section className="w-full py-20 bg-zinc-50/50 dark:bg-zinc-950/50 border-y border-zinc-200/50 dark:border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 ${locale === 'ar' ? 'md:flex-row-reverse' : ''}`}>
          <div className={locale === "ar" ? "text-right" : "text-left"}>
            <div className={`flex items-center gap-2 mb-3 text-emerald-600 dark:text-emerald-400 font-bold tracking-widest text-xs uppercase ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <ShieldCheck size={16} />
              {locale === "ar" ? "ضمان الجودة" : "Quality Guaranteed"}
            </div>
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight mb-4">
              {locale === "ar" ? "أحدث التسليمات" : "Recently Delivered"}
            </h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
              {locale === "ar"
                ? "انظر كيف تحولت منازل عملائنا بقطعنا الفنية. تسليم آمن وتركيب محترف في جميع أنحاء مصر."
                : "See how our artisanal pieces elevate real homes. Expert delivery and installation nationwide."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
          {deliveredItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />

                <div className={`absolute bottom-6 ${locale === 'ar' ? 'right-6' : 'left-6'} flex items-center gap-3 text-white`}>
                  <div className="bg-emerald-500 p-2 rounded-xl shadow-lg">
                    <MapPin size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-300 font-medium">{locale === 'ar' ? 'الموقع' : 'Location'}</p>
                    <p className="text-sm font-bold">{item.location}</p>
                  </div>
                </div>
              </div>

              <div className={`p-8 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
                  {item.name}
                </h3>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{locale === 'ar' ? 'تم التسليم' : 'Delivered'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import CartCounter from "@/components/CartCounter";
import LanguageToggle from "@/components/LanguageToggle";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageProvider";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react"; // استيراد الـ Hooks المطلوبة

export default function HeaderNav() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false); // حالة مراقبة السكرول

  useEffect(() => {
    const handleScroll = () => {
      // لو المستخدم نزل أكتر من 40 بكسل، اقلب الحالة لـ true
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    // 1. الكونتينر الخارجي العايم والمثبت في منتصف الشاشة بدقة
    // أضفنا له transition وقمنا بتغيير الـ top-4 إلى top-0 لما يعمل سكرول لو حابب يلتصق بالسقف، أو سيبه top-4 زي ما تحب
    <header className={`fixed left-0 right-0 z-50 w-full px-2 sm:px-2 md:px-2 flex justify-center pointer-events-none transition-all duration-300 ${
      isScrolled ? "top-2" : "top-4"
    }`}>

      {/* 2. جسم الـ Navbar الديناميكي (Floating Glassmorphic) */}
      {/* هنا غيّرنا الـ bg-zinc-950/60 والـ backdrop لتتغير الشفافية ديناميكياً بناءً على الـ Scroll */}
      <nav className={`w-full max-w-5xl border flex items-center justify-between pointer-events-auto transition-all duration-500 rounded-2xl md:rounded-3xl px-6 py-3 md:py-4 ${
        isScrolled
          ? "bg-zinc-950/90 backdrop-blur-xl border-white/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.8)]" // الشكل الغامق الواضح عند السكرول لأسفل
          : "bg-transparent backdrop-blur-xs border-transparent shadow-none" // شفاف تماماً وبدون حدود عند التوب فوق البانر
      }`}>

        {/* 🪑 اللوجو: كلمة COMMODE وعلى يمينها أيقونة الكرسي الأصلية المطابقة للصورة بالملي */}
        <Link
          href="/"
          className="flex items-center gap-3 text-xl md:text-2xl font-black text-primary tracking-wider uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] group"
        >
          {/* اسم الموقع */}
          <span>COMMODE</span>
        </Link>

        {/* لينكات المنيو اللي في النص - أبيض مطفأ ويقلب ذهبي عند المرور */}
        <div className="hidden gap-x-8 md:flex items-center">
          <Link href="/products" className="text-sm font-bold text-zinc-300 hover:text-primary transition-colors duration-300 tracking-wide">
            {t("nav.shop") || "Products"}
          </Link>
        </div>

        {/* الزراير الطرفية (تغيير اللغة + زر السلة المطور) */}
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <CartCounter />
        </div>

      </nav>
    </header>
  );
}

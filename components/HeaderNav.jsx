"use client";
import CartCounter from "@/components/CartCounter";
import LanguageToggle from "@/components/LanguageToggle";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageProvider";

export default function HeaderNav() {
  const { t } = useLanguage();

  return (
    // 1. الكونتينر الخارجي العايم والمثبت في منتصف الشاشة بدقة
    <header className="fixed top-4 left-0 right-0 z-50 w-full px-2 sm:px-2 md:px-2 flex justify-center pointer-events-none">

      {/* 2. جسم الـ Navbar الزجاجي (Floating Glassmorphic) بالانحناءات المطلوبة */}
      <nav className="w-full max-w-5xl bg-zinc-950/60 backdrop-blur-xl border border-white/[0.08] rounded-2xl md:rounded-3xl px-6 py-3 md:py-4 flex items-center justify-between shadow-[0_10px_40px_rgba(0,0,0,0.7)] pointer-events-auto transition-all duration-300">

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

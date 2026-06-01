"use client";

import { useLanguage } from "@/lib/context/LanguageProvider";

export default function LanguageToggle() {
  const { t, locale, setLocale } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
      // ✨ هنا التعديل: حولناه لستايل الكريستال الداكن الشفاف ببرواز خفيف جداً ونص ذهبي ملكي يطابق السلة بالملي
      className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md px-4 py-2 text-sm font-bold text-primary transition-all duration-300 hover:bg-primary hover:text-black hover:border-transparent shadow-lg"
    >
      {t("nav.switchLanguage")}
    </button>
  );
}

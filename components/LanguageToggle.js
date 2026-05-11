"use client";

import { useLanguage } from "@/lib/context/LanguageProvider";

export default function LanguageToggle() {
  const { t, locale, setLocale } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
      className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
    >
      {t("nav.switchLanguage")}
    </button>
  );
}

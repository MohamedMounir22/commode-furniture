"use client";

import { defaultLocale, translate } from "@/lib/language";
import { createContext, useContext, useEffect, useState } from "react";





// 1. عمل الـ Context بدون تعريف أنواع معقدة
const LanguageContext = createContext({
    locale: defaultLocale,
    setLocale: () => { },
    t: (path) => "",
});

// 2. Custom Hook لاستخدام السياق بسهولة
export function useLanguage() {
    return useContext(LanguageContext);
}

// 3. الـ Provider الأساسي
export default function LanguageProvider({ children }) {
    const [locale, setLocaleState] = useState(defaultLocale);

    // تحميل اللغة المحفوظة من المتصفح عند البداية
    useEffect(() => {
        const storedLocale = window.localStorage.getItem("locale");
        // التأكد إن القيمة المخزنة صحيحة (ar أو en)
        if (storedLocale === "ar" || storedLocale === "en") {
            setLocaleState(storedLocale);
        }

        document.documentElement.dir = storedLocale === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = storedLocale;
    }, []);

    // دالة تغيير اللغة وحفظها في الـ LocalStorage
    const setLocale = (value) => {
        setLocaleState(value);
        window.localStorage.setItem("locale", value);
        document.documentElement.dir = value === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = value;
    };

    // تجهيز القيم اللي هتتبعت لأي Component في الموقع
    const value = {
        locale,
        setLocale,
        t: (path) => translate(path, locale),
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

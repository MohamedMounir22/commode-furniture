"use client";

import { defaultLocale, translate } from "@/lib/language";
import { createContext, useContext, useEffect, useState } from "react";



const LanguageContext = createContext({
    locale: defaultLocale,
    setLocale: () => { },
    t: (path) => "",
});

export function useLanguage() {
    return useContext(LanguageContext);
}

export default function LanguageProvider({ children }) {
    const [locale, setLocaleState] = useState(defaultLocale);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const storedLocale = window.localStorage.getItem("locale");
        if (storedLocale === "ar" || storedLocale === "en") {
            setLocaleState(storedLocale);
            document.documentElement.dir = storedLocale === "ar" ? "rtl" : "ltr";
            document.documentElement.lang = storedLocale;
        } else {
            document.documentElement.dir = defaultLocale === "ar" ? "rtl" : "ltr";
            document.documentElement.lang = defaultLocale;
        }
        setIsMounted(true);
    }, []);

    const setLocale = (value) => {
        setLocaleState(value);
        window.localStorage.setItem("locale", value);
        document.documentElement.dir = value === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = value;
    };

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





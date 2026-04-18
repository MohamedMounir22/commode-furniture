"use client";

import CartCounter from "@/components/CartCounter";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/lib/context/LanguageProvider";
import Link from "next/link";

export default function HeaderNav() {
    const { t } = useLanguage();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-md">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 text-2xl font-bold tracking-tighter">
                        COMMODE
                    </Link>
                </div>

                <div className="hidden gap-x-8 md:flex">
                    <Link href="/products" className="text-sm font-semibold hover:text-zinc-500 transition">
                        {t("nav.shop")}
                    </Link>
                    <Link href="/about" className="text-sm font-semibold hover:text-zinc-500 transition">
                        {t("nav.about")}
                    </Link>
                    <Link href="/admin/dashboard" className="text-sm font-semibold hover:text-zinc-500 transition">
                        {t("nav.admin")}
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <LanguageToggle />
                    <CartCounter />
                </div>
            </nav>
        </header>
    );
}

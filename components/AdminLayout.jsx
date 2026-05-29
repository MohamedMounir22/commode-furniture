"use client";

import { useLanguage } from "@/lib/context/LanguageProvider";
import { Home, Package, Plus, Settings, ShoppingCart, Truck, Users, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminLayout({ children }) {
    const { t, locale } = useLanguage();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isRtl = locale === "ar";

    const sidebarItems = [
        { name: t("admin.sidebar.dashboard"), href: "/admin/dashboard", icon: Home },
        { name: t("admin.sidebar.products"), href: "/admin/dashboard/products", icon: Package },
        { name: "Last Delivered", href: "/admin/dashboard/last-delivered", icon: Truck },
        { name: t("admin.sidebar.orders"), href: "/admin/dashboard/orders", icon: ShoppingCart },
        { name: t("admin.sidebar.customers"), href: "/admin/dashboard/customers", icon: Users },
        { name: t("admin.sidebar.settings"), href: "/admin/dashboard/settings", icon: Settings },
        // hero section
        { name: t("admin.sidebar.hero"), href: "/admin/dashboard/hero", icon: Package }

    ];

    return (
        <div className="flex h-screen bg-gray-100" dir={isRtl ? "rtl" : "ltr"}>

            {/* الخلفية المظلمة عند فتح السايدبار في الموبايل */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar - متجاوب */}
            <div className={`
                fixed inset-y-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto
                ${isSidebarOpen ? "translate-x-0" : isRtl ? "translate-x-full lg:translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}>
                <div className="p-6 flex items-center justify-between border-b lg:border-none">
                    <h1 className="text-xl font-bold text-gray-800">{t("admin.header.title")}</h1>
                    {/* زرار الإغلاق في الموبايل فقط */}
                    <button
                        className="lg:hidden p-1 text-gray-500 hover:bg-gray-100 rounded"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <nav className="mt-6 space-y-1">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsSidebarOpen(false)} // يقفل السايدبار بعد الضغط في الموبايل
                            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors ${isRtl ? "space-x-reverse" : ""}`}
                        >
                            <item.icon className={`w-5 h-5 ${isRtl ? "ml-3" : "mr-3"}`} />
                            <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                    ))}
                    <div className="px-6 py-4">
                        <Link
                            href="/admin/add-product"
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors ${isRtl ? "space-x-reverse" : ""}`}
                        >
                            <Plus className={`w-4 h-4 ${isRtl ? "ml-2" : "mr-2"}`} />
                            {t("admin.sidebar.addProduct")}
                        </Link>
                    </div>
                </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden w-full">
                {/* Header */}
                <header className="bg-white shadow-sm border-b h-16 flex items-center">
                    <div className="px-4 md:px-6 flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                            {/* زرار الهامبرغر يظهر في الموبايل فقط */}
                            <button
                                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={() => setIsSidebarOpen(true)}
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                                {t("admin.header.title")}
                            </h2>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

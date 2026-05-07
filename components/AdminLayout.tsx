"use client";

import { useLanguage } from "@/lib/context/LanguageProvider";
import { Home, Package, Plus, Settings, ShoppingCart, Truck, Users } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
    const { t } = useLanguage();

    const sidebarItems = [
        { name: t("admin.sidebar.dashboard"), href: "/admin/dashboard", icon: Home },
        { name: t("admin.sidebar.products"), href: "/admin/dashboard/products", icon: Package },
        { name: "Last Delivered", href: "/admin/dashboard/last-delivered", icon: Truck },
        { name: t("admin.sidebar.orders"), href: "/admin/dashboard/orders", icon: ShoppingCart },
        { name: t("admin.sidebar.customers"), href: "/admin/dashboard/customers", icon: Users },
        { name: t("admin.sidebar.settings"), href: "/admin/dashboard/settings", icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-800">{t("admin.header.title")}</h1>
                </div>
                <nav className="mt-6">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.name}
                        </Link>
                    ))}
                    <div className="px-6 py-3">
                        <Link
                            href="/admin/add-product"
                            className="flex items-center w-full px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-md hover:bg-amber-700 transition-colors"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            {t("admin.sidebar.addProduct")}
                        </Link>
                    </div>
                </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="px-6 py-4">
                        <h2 className="text-xl font-semibold text-gray-800">{t("admin.header.title")}</h2>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

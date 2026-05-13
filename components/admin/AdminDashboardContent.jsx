"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/context/LanguageProvider";

export default function AdminDashboardContent({
    totalProducts,
    totalOrders,
    totalRevenue,
    totalCustomers,
    products,
}) {
    const { t } = useLanguage();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">{t("admin.dashboard.overview")}</h1>
                <p className="text-gray-600 mt-2">{t("admin.dashboard.welcome")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("admin.dashboard.totalProducts")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalProducts}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("admin.dashboard.totalOrders")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalOrders}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("admin.dashboard.totalRevenue")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("admin.dashboard.totalCustomers")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalCustomers}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{t("admin.dashboard.recentOrders")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">{t("admin.dashboard.noRecentOrders")}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>{t("admin.dashboard.recentProducts")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {products.length === 0 ? (
                            <p className="text-gray-600">{t("admin.dashboard.noProductsYet")}</p>
                        ) : (
                            <div className="space-y-2">
                                {products.slice(0, 5).map((product) => (
                                    <div key={product._id} className="flex items-center space-x-2 rtl:space-x-reverse">
                                        <img
                                            src={product.images?.[0] || "/placeholder.png"}
                                            alt={product.name}
                                            className="w-8 h-8 object-cover rounded"
                                        />
                                        <div>
                                            <p className="text-sm font-medium">{product.name}</p>
                                            <p className="text-xs text-gray-500">${product.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

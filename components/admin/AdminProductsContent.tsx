"use client";

import ProductActions from "@/components/ProductActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/context/LanguageProvider";
import Link from "next/link";

export default function AdminProductsContent({
    products,
}: {
    products: Array<{ _id: string; name: string; price: number; category: string; images?: string[]; stock?: number }>;
}) {
    const { t } = useLanguage();
    const currency = t("cart.currency");

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{t("admin.products.management")}</h1>
                    <p className="text-gray-600 mt-2">{t("admin.products.subtitle")}</p>
                </div>
                <Link href="/admin/add-product">
                    <Button>{t("admin.products.addProduct")}</Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        {t("admin.products.allProducts")} ({products.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {products.length === 0 ? (
                        <p className="text-gray-600">{t("admin.products.noProductsFound")}</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-4 font-medium">{t("admin.products.table.image")}</th>
                                        <th className="text-left py-3 px-4 font-medium">{t("admin.products.table.name")}</th>
                                        <th className="text-left py-3 px-4 font-medium">{t("admin.products.table.category")}</th>
                                        <th className="text-left py-3 px-4 font-medium">{t("admin.products.table.price")}</th>
                                        <th className="text-left py-3 px-4 font-medium">{t("admin.products.table.actions")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product._id} className="border-b hover:bg-gray-50">
                                            <td className="py-3 px-4">
                                                <img
                                                    src={product.images?.[0] || "/placeholder.png"}
                                                    alt={product.name}
                                                    className="w-12 h-12 object-cover rounded"
                                                />
                                            </td>
                                            <td className="py-3 px-4 font-medium">{product.name}</td>
                                            <td className="py-3 px-4 text-sm text-gray-600 uppercase tracking-wide">
                                                {t(`categories.${product.category}`) || product.category}
                                            </td>
                                            <td className="py-3 px-4">{product.price} {currency}</td>
                                            <td className="py-3 px-4">
                                                <ProductActions productId={product._id} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

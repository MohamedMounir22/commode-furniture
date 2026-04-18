"use client";

import AdminLayout from "@/components/AdminLayout";
import { useLanguage } from "@/components/LanguageProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomersPage() {
    const { t } = useLanguage();

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{t("admin.customers.management")}</h1>
                    <p className="text-gray-600 mt-2">{t("admin.customers.subtitle")}</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{t("admin.customers.allCustomers")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">{t("admin.customers.comingSoon")}</p>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}

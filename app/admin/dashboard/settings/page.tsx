"use client";

import AdminLayout from "@/components/AdminLayout";
import { useLanguage } from "@/components/LanguageProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
    const { t } = useLanguage();
    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{t("admin.settings.title")}</h1>
                    <p className="text-gray-600 mt-2">{t("admin.settings.subtitle")}</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{t("admin.settings.storeSettings")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">{t("admin.settings.comingSoon")}</p>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}

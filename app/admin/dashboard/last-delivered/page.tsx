"use client";

import LastDeliveredForm from "@/components/admin/LastDeliveredForm";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/LanguageProvider";
import { ArrowLeft, Edit2, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LastDeliveredPage() {
    const router = useRouter();
    const { locale } = useLanguage();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await fetch("/api/last-delivered");
            const data = await res.json();
            setItems(data);
        } catch (error) {
            console.error("Failed to fetch items:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this item?")) {
            try {
                const res = await fetch(`/api/last-delivered?id=${id}`, {
                    method: "DELETE",
                });
                if (res.ok) {
                    setItems(items.filter((item: any) => item._id !== id));
                }
            } catch (error) {
                console.error("Failed to delete item:", error);
            }
        }
    };

    const handleFormSubmit = async (data: any) => {
        await fetchItems();
        setShowForm(false);
        setEditingItem(null);
    };

    if (showForm) {
        return (
            <div>
                <button
                    onClick={() => {
                        setShowForm(false);
                        setEditingItem(null);
                    }}
                    className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 hover:from-amber-100 hover:to-amber-200 transition-all duration-300 shadow-sm hover:shadow-md group"
                >
                    <ArrowLeft size={20} />
                    Back to List
                </button>
                <LastDeliveredForm
                    initialData={editingItem}
                    onSubmit={handleFormSubmit}
                />
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                    {locale === "ar" ? "آخر التسليمات" : "Last Delivered Items"}
                </h1>
                <Button
                    onClick={() => {
                        setEditingItem(null);
                        setShowForm(true);
                    }}
                    className="bg-amber-600 hover:bg-amber-700"
                >
                    <Plus size={20} className="mr-2" />
                    Add Item
                </Button>
            </div>

            {loading ? (
                <div className="text-center py-12">Loading...</div>
            ) : items.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    No items yet. Create your first last delivered item!
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                                    Image
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                                    Name (EN)
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                                    Name (AR)
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                                    Location
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item: any) => (
                                <tr
                                    key={item._id}
                                    className="border-b hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <img
                                            src={item.image}
                                            alt={item.nameEn}
                                            className="w-12 h-12 rounded object-cover"
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {item.nameEn}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900" dir="rtl">
                                        {item.nameAr}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {item.locationEn}
                                    </td>
                                    <td className="px-6 py-4 flex gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingItem(item);
                                                setShowForm(true);
                                            }}
                                            className="inline-flex items-center gap-2 px-3 py-2 rounded bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors text-sm"
                                        >
                                            <Edit2 size={16} />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="inline-flex items-center gap-2 px-3 py-2 rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors text-sm"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

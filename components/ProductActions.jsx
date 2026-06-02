"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/context/LanguageProvider"
import { Edit, Loader2, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ProductActions({ productId }) {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)
    const { t } = useLanguage()

    const handleEdit = () => {
        router.push(`/admin/edit-product?id=${productId}`)
    }

    const handleDelete = async () => {
        if (!confirm(t("admin.actions.confirmDelete"))) {
            return
        }

        setIsDeleting(true)
        try {
            const response = await fetch(`/api/test-db?id=${productId}`, {
                method: "DELETE",
            })

            if (response.ok) {
                alert(t("admin.actions.deleted"))
                router.refresh() // Refresh the page to update the list
            } else {
                alert(t("admin.actions.deleteFailed"))
            }
        } catch (error) {
            console.error("Error:", error)
            alert(t("admin.actions.deleteError"))
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        // تم استخدام gap-2 لضبط المسافات في اللغتين (RTL / LTR) بدلاً من space-x-2 اللي بتبوظ في العربي
        <div className="flex items-center gap-2">

            {/* 📝 زر التعديل (Edit): ذهبي زجاجي منور كحالة طبيعية ثابتة */}
            <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                className="bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/60 hover:text-amber-300 transition-all duration-300 rounded-xl"
            >
                <Edit className="w-4 h-4 drop-shadow-[0_0_6px_rgba(214,175,55,0.3)]" />
            </Button>

            {/* 🗑️ زر الحذف (Delete): أحمر زجاجي تحذيري منور كحالة طبيعية ثابتة */}
            <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/60 hover:text-red-300 transition-all duration-300 rounded-xl disabled:opacity-40"
            >
                {isDeleting ? (
                    <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
                ) : (
                    <Trash2 className="w-4 h-4 drop-shadow-[0_0_6px_rgba(239,68,68,0.3)]" />
                )}
            </Button>

        </div>
    )
}

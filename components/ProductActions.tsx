"use client"

import { Button } from "@/components/ui/button"
import { Edit, Loader2, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ProductActions({ productId }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleEdit = () => {
    router.push(`/admin/edit-product?id=${productId}`)
  }

  const handleDelete = async () => {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/test-db?id=${productId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        alert("✅ المنتج اتمسح بنجاح!")
        router.refresh() // Refresh the page to update the list
      } else {
        alert("❌ فشل في حذف المنتج")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("⚠️ حدث خطأ أثناء الحذف")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="sm" onClick={handleEdit}>
        <Edit className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="text-red-600 hover:text-red-700"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
      </Button>
    </div>
  )
}

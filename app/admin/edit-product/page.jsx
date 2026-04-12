"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, ImagePlus, Loader2, Trash2 } from "lucide-react"
import { CldUploadWidget } from 'next-cloudinary'
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const categoryOptions = [
  { value: "dining", label: "سفرة" },
  { value: "sofas", label: "انتريهات" },
  { value: "tables", label: "ترابيزات" },
  { value: "console", label: "كونسول" },
]

const formSchema = z.object({
  name: z.string().min(2, { message: "اسم المنتج لازم يكون حرفين على الأقل" }),
  price: z.coerce.number().min(1, { message: "السعر لازم يكون أكبر من صفر" }),
  description: z.string().min(10, { message: "الوصف لازم يكون مفصل شوية" }),
  stock: z.coerce.number().min(0, { message: "المخزون لازم يكون صفر أو أكبر" }),
  discount: z.coerce.number().min(0, { message: "الخصم لازم يكون 0 أو أكبر" }).max(100, { message: "الخصم مينفعش يكون أكبر من 100%" }),
  category: z.enum(["dining", "sofas", "tables", "console"], { errorMap: () => ({ message: "اختر فئة مناسبة للمنتج" }) }),
})

export default function EditProductPage() {
  const [images, setImages] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const productId = searchParams.get("id")

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      stock: 1,
      discount: 0,
      category: "sofas",
    },
  })

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/test-db?id=${productId}`)
      if (response.ok) {
        const product = await response.json()
        form.reset({
          name: product.name,
          price: product.price,
          description: product.description,
          stock: product.stock || 1,
          discount: product.discount || 0,
          category: product.category || "sofas",
        })
        setImages(product.images || [])
      }
    } catch (error) {
      console.error("Error fetching product:", error)
      alert("فشل في تحميل بيانات المنتج")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!productId) return
    fetchProduct()
  }, [productId])

  const removeImage = (urlToRemove) => {
    setImages(images.filter((url) => url !== urlToRemove))
  }

  async function onSubmit(values) {
    if (images.length === 0) {
      alert("⚠️ يا هندسة لازم ترفع صورة واحدة على الأقل للمنتج!")
      return
    }

    setIsSubmitting(true)
    const finalData = {
      ...values,
      images: images,
    }

    try {
      const response = await fetch(`/api/test-db?id=${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      })

      if (response.ok) {
        alert("✅ المنتج اتعدل بنجاح!")
        router.push("/admin/dashboard/products")
      } else {
        alert("❌ حصلت مشكلة وأنا بعدل البيانات")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("⚠️ السيرفر مش بيرد")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-10">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-10 bg-white shadow-lg rounded-xl mt-10">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/dashboard/products">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">تعديل المنتج</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-right" dir="rtl">

          {/* اسم المنتج */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم المنتج</FormLabel>
                <FormControl><Input placeholder="مثلاً: صالون كلاسيك" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* السعر */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>السعر (جنية)</FormLabel>
                <FormControl><Input type="number" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* فئة المنتج */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>فئة المنتج</FormLabel>
                <FormControl>
                  <select {...field} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500">
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* المخزون */}
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>المخزون</FormLabel>
                <FormControl><Input type="number" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* الخصم */}
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نسبة الخصم (%)</FormLabel>
                <FormControl><Input type="number" placeholder="0" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* الوصف */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الوصف</FormLabel>
                <FormControl><Textarea placeholder="وصف مفصل للمنتج..." {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* رفع الصور */}
          <div>
            <FormLabel>الصور ({images.length})</FormLabel>
            <div className="mt-2">
              <CldUploadWidget
                uploadPreset="ml_default"
                config={{ cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME } }}
                onError={(error) => {
                  console.error("Cloudinary upload failed:", error);
                }}
                onSuccess={(result) => {
                  if (result.info && result.info.secure_url) {
                    setImages((prev) => [...prev, result.info.secure_url]);
                  }
                }}
              >
                {({ open }) => (
                  <Button type="button" variant="outline" onClick={open}>
                    <ImagePlus className="w-4 h-4 mr-2" />
                    رفع صورة جديدة
                  </Button>
                )}
              </CldUploadWidget>
            </div>

            {/* عرض الصور المرفوعة */}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {images.map((url, index) => (
                  <div key={index} className="relative">
                    <img src={url} alt={`صورة ${index + 1}`} className="w-full h-24 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => removeImage(url)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* زرار الحفظ */}
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                جاري التعديل...
              </>
            ) : (
              "حفظ التعديلات"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

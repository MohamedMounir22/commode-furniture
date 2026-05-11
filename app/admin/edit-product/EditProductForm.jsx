"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/lib/context/LanguageProvider"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, ImagePlus, Loader2, Trash2 } from "lucide-react"
import { CldImage, CldUploadWidget } from 'next-cloudinary'
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const categoryOptions = [
  { value: "dining" },
  { value: "sofas" },
  { value: "tables" },
  { value: "console" },
]

const getFormSchema = (t) =>
  z.object({
    nameAr: z.string().min(2, { message: t("admin.form.errors.nameMin") }),
    nameEn: z.string().min(2, { message: t("admin.form.errors.nameMin") }),
    price: z.coerce.number().min(1, { message: t("admin.form.errors.priceMin") }),
    descriptionAr: z.string().min(10, { message: t("admin.form.errors.descriptionMin") }),
    descriptionEn: z.string().min(10, { message: t("admin.form.errors.descriptionMin") }),
    stock: z.coerce.number().min(0, { message: t("admin.form.errors.stockMin") }),
    discount: z.coerce.number()
      .min(0, { message: t("admin.form.errors.discountMin") })
      .max(100, { message: t("admin.form.errors.discountMax") }),
    category: z.enum(["dining", "sofas", "tables", "console"], {
      errorMap: () => ({ message: t("admin.form.errors.categoryRequired") }),
    }),
    bestSeller: z.boolean().default(false),
  })

export default function EditProductForm() {
  const [images, setImages] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const productId = searchParams.get("id")
  const { t, locale } = useLanguage()
  const formSchema = getFormSchema(t)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameAr: "",
      nameEn: "",
      price: 0,
      descriptionAr: "",
      descriptionEn: "",
      stock: 1,
      discount: 0,
      category: "sofas",
      bestSeller: false,
    },
  })

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/test-db?id=${productId}`)
      if (response.ok) {
        const product = await response.json()
        form.reset({
          nameAr: product.nameAr || product.name || "",
          nameEn: product.nameEn || "",
          price: product.price,
          descriptionAr: product.descriptionAr || product.description || "",
          descriptionEn: product.descriptionEn || "",
          stock: product.stock || 1,
          discount: product.discount || 0,
          category: product.category || "sofas",
          bestSeller: product.bestSeller || false,
        })
        setImages(product.images || [])
      }
    } catch (error) {
      console.error("Error fetching product:", error)
      alert(t("admin.form.fetchError"))
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
      alert(t("admin.form.requireImage"))
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
        alert(t("admin.form.editSuccess"))
        router.push("/admin/dashboard/products")
        console.log("Sent data for updatenet :", finalData)
      } else {
        alert(t("admin.form.failedSend"))
      }
    } catch (error) {
      console.error("Error:", error)
      alert(t("admin.form.serverError"))
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
      <div className={`flex items-center gap-4 mb-6 ${locale === "ar" ? "text-right" : "text-left"}`}>
        <Link href="/admin/dashboard/products">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("admin.form.backToProducts")}
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{t("admin.form.editProductTitle")}</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" dir={locale === "ar" ? "rtl" : "ltr"}>

          {/* اسم المنتج - عربي */}
          <FormField
            control={form.control}
            name="nameAr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("admin.form.productNameAr")}</FormLabel>
                <FormControl><Input placeholder="أدخل اسم المنتج بالعربية" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* اسم المنتج - English */}
          <FormField
            control={form.control}
            name="nameEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("admin.form.productNameEn")}</FormLabel>
                <FormControl><Input placeholder="Enter product name in English" {...field} /></FormControl>
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
                <FormLabel>{t("admin.form.price")}</FormLabel>
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
                <FormLabel>{t("admin.form.category")}</FormLabel>
                <FormControl>
                  <select {...field} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500">
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {t(`categories.${option.value}`)}
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
                <FormLabel>{t("admin.form.stock")}</FormLabel>
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
                <FormLabel>{t("admin.form.discount")}</FormLabel>
                <FormControl><Input type="number" placeholder="0" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* أفضل بائع */}
          <FormField
            control={form.control}
            name="bestSeller"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{t("admin.form.bestSeller")}</FormLabel>
                  <p className="text-sm text-gray-500">{t("admin.form.bestSellerDescription")}</p>
                </div>
              </FormItem>
            )}
          />

          {/* الوصف - عربي */}
          <FormField
            control={form.control}
            name="descriptionAr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("admin.form.descriptionAr")}</FormLabel>
                <FormControl><Textarea placeholder="أدخل وصف المنتج بالعربية" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* الوصف - English */}
          <FormField
            control={form.control}
            name="descriptionEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("admin.form.descriptionEn")}</FormLabel>
                <FormControl><Textarea placeholder="Enter product description in English" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* رفع الصور */}
          <div>
            <FormLabel>{`${t("admin.form.uploadImages")} (${images.length})`}</FormLabel>
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
                    {t("admin.form.uploadNewImage")}
                  </Button>
                )}
              </CldUploadWidget>
            </div>

            {/* عرض الصور المرفوعة */}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {images.map((url, index) => (
                  <div key={index} className="relative">
                    <CldImage
                      width="300"
                      height="300"
                      src={url}
                      alt={`${t("admin.form.uploadImages")} ${index + 1}`}
                      className="w-full h-24 object-cover rounded"
                    />
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
                {t("admin.form.saveChanges")}...
              </>
            ) : (
              t("admin.form.saveChanges")
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

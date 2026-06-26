"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/lib/context/LanguageProvider"
import { zodResolver } from "@hookform/resolvers/zod"
import imageCompression from "browser-image-compression"
import { ArrowLeft, Loader2, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const categoryOptions = [
  { value: "dining" },
  { value: "sofas" },
  { value: "tables" },
  { value: "console" },
  { value: "L-Shaped Sofa" },
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
    category: z.enum(["dining", "sofas", "tables", "console", "L-Shaped Sofa"], {
      errorMap: () => ({ message: t("admin.form.errors.categoryRequired") }),
    }),
    bestSeller: z.boolean().default(false),
  })

function EditProductContent() {
  const [images, setImages] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()
  const fileInputRef = useRef(null)
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

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    const simulateProgress = (start, end, duration) => {
      let current = start
      const interval = setInterval(() => {
        current += 1
        if (current >= end) {
          clearInterval(interval)
        } else {
          setUploadProgress(current)
        }
      }, duration / (end - start))
      return interval
    }

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: false,
    }

    for (let i = 0; i < files.length; i += 1) {
      const interval = simulateProgress(
        Math.round((i / files.length) * 100),
        Math.round(((i + 0.9) / files.length) * 100),
        2000
      )

      try {
        const file = files[i]
        const compressedFile = await imageCompression(file, options)
        const fileName = file.name || `image-${Date.now()}.jpg`
        const safeFile = new File([compressedFile], fileName, {
          type: compressedFile.type || "image/jpeg",
        })

        const formData = new FormData()
        formData.append("file", safeFile)
        formData.append("upload_preset", "commode_present")

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        )

        const data = await response.json()
        clearInterval(interval)

        if (data.secure_url) {
          setImages((prev) => [...prev, data.secure_url])
          setUploadProgress(Math.round(((i + 1) / files.length) * 100))
        }
      } catch (error) {
        clearInterval(interval)
        console.error("Image upload failed:", error)
      }
    }

    setTimeout(() => {
      setIsUploading(false)
    }, 1000)
  }

  const triggerFileInput = (event) => {
    event.preventDefault()
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
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
      <div className="flex min-h-[60vh] items-center justify-center bg-black px-4 py-10">
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#d4af37]" />
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto mt-8 max-w-4xl rounded-[2rem] border border-white/10 bg-zinc-900 p-6 shadow-2xl sm:p-8 lg:p-10">
      <div className={`mb-8 flex flex-wrap items-center justify-between gap-4 ${locale === "ar" ? "text-right" : "text-left"}`}>
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard/products">
            <Button variant="outline" size="sm" className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("admin.form.backToProducts")}
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">{t("admin.form.editProductTitle")}</h1>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" dir={locale === "ar" ? "rtl" : "ltr"}>

          {/* اسم المنتج - عربي */}
          <FormField
            control={form.control}
            name="nameAr"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-white/80">{t("admin.form.productNameAr")}</FormLabel>
                <FormControl><Input className="border-white/10 bg-zinc-950/70 text-white placeholder:text-white/40 focus:border-[#d4af37] focus:ring-[#d4af37]/40" placeholder="أدخل اسم المنتج بالعربية" {...field} /></FormControl>
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
                <FormLabel className="text-sm font-semibold text-white/80">{t("admin.form.productNameEn")}</FormLabel>
                <FormControl><Input className="border-white/10 bg-zinc-950/70 text-white placeholder:text-white/40 focus:border-[#d4af37] focus:ring-[#d4af37]/40" placeholder="Enter product name in English" {...field} /></FormControl>
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
                <FormLabel className="text-sm font-semibold text-white/80">{t("admin.form.price")}</FormLabel>
                <FormControl><Input className="border-white/10 bg-zinc-950/70 text-white placeholder:text-white/40 focus:border-[#d4af37] focus:ring-[#d4af37]/40" type="number" {...field} /></FormControl>
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
                <FormLabel className="text-sm font-semibold text-white/80">{t("admin.form.category")}</FormLabel>
                <FormControl>
                  <select {...field} className="w-full rounded-lg border border-white/10 bg-zinc-950/70 px-3 py-2 text-sm text-white focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]/40">
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
                <FormLabel className="text-sm font-semibold text-white/80">{t("admin.form.stock")}</FormLabel>
                <FormControl><Input className="border-white/10 bg-zinc-950/70 text-white placeholder:text-white/40 focus:border-[#d4af37] focus:ring-[#d4af37]/40" type="number" {...field} /></FormControl>
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
                <FormLabel className="text-sm font-semibold text-white/80">{t("admin.form.discount")}</FormLabel>
                <FormControl><Input className="border-white/10 bg-zinc-950/70 text-white placeholder:text-white/40 focus:border-[#d4af37] focus:ring-[#d4af37]/40" type="number" placeholder="0" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* أفضل بائع */}
          <FormField
            control={form.control}
            name="bestSeller"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-xl border border-white/10 bg-white/5 p-4">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    className="h-4 w-4 rounded border-white/20 bg-zinc-950 text-[#d4af37] focus:ring-[#d4af37]"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-semibold text-white/80">{t("admin.form.bestSeller")}</FormLabel>
                  <p className="text-sm text-white/60">{t("admin.form.bestSellerDescription")}</p>
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
                <FormLabel className="text-sm font-semibold text-white/80">{t("admin.form.descriptionAr")}</FormLabel>
                <FormControl><Textarea className="min-h-32 border-white/10 bg-zinc-950/70 text-white placeholder:text-white/40 focus:border-[#d4af37] focus:ring-[#d4af37]/40" placeholder="أدخل وصف المنتج بالعربية" {...field} /></FormControl>
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
                <FormLabel className="text-sm font-semibold text-white/80">{t("admin.form.descriptionEn")}</FormLabel>
                <FormControl><Textarea className="min-h-32 border-white/10 bg-zinc-950/70 text-white placeholder:text-white/40 focus:border-[#d4af37] focus:ring-[#d4af37]/40" placeholder="Enter product description in English" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* رفع الصور */}
          <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <FormLabel className="text-sm font-semibold text-white/80">{`${t("admin.form.uploadImages")} (${images.length})`}</FormLabel>

            <div className="mb-4 grid grid-cols-3 gap-4">
              {images.map((url, index) => (
                <div key={index} className="group relative aspect-square overflow-hidden rounded-lg border border-white/10">
                  <Image fill src={url} alt="product" className="object-cover" />
                  <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/40" />
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition hover:bg-red-600"
                    aria-label="Remove image"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {isUploading && (
              <div className="mb-4 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-2.5 rounded-full bg-[#d4af37] transition-all duration-300 ease-in-out"
                  style={{ width: `${uploadProgress}%` }}
                />
                <p className="mt-1 text-center text-xs font-medium text-[#d4af37]">
                  {uploadProgress === 100 ? "تم الرفع بنجاح!" : `جاري رفع الصور... ${uploadProgress}%`}
                </p>
              </div>
            )}

            <div className="block">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                className="hidden"
                disabled={isUploading}
              />

              <button
                type="button"
                onClick={triggerFileInput}
                className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold shadow-lg transition-all active:scale-95 select-none touch-manipulation ${
                  isUploading ? "cursor-not-allowed bg-white/20 text-white/60" : "bg-[#d4af37] text-black hover:bg-[#f2d46d]"
                }`}
                disabled={isUploading}
              >
                <span>{isUploading ? "جاري المعالجة..." : `${t("admin.form.uploadNewImage")} 📸`}</span>
              </button>
            </div>
          </div>

          {/* زرار الحفظ */}
          <Button type="submit" disabled={isSubmitting} className="w-full bg-[#d4af37] text-black hover:bg-[#f2d46d]">
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

export default function EditProductPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-2xl mx-auto p-10 flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      }
    >
      <EditProductContent />
    </Suspense>
  )
}

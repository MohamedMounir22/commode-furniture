"use client"

export const dynamic = 'force-dynamic'

import { useLanguage } from "@/lib/context/LanguageProvider"

import { Button } from "@/components/ui/button"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { Input } from "@/components/ui/input"

import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import imageCompression from 'browser-image-compression'

import { ArrowLeft, Loader2, Trash2 } from "lucide-react"

import { useRouter } from "next/navigation"

import { useState } from "react"

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
        discount: z.coerce.number()
            .min(0, { message: t("admin.form.errors.discountMin") })
            .max(100, { message: t("admin.form.errors.discountMax") }),
        category: z.enum(["dining", "sofas", "tables", "console"], {
            errorMap: () => ({ message: t("admin.form.errors.categoryRequired") }),
        }),
        stock: z.coerce.number().min(0, { message: t("admin.form.errors.stockMin") }),
        bestSeller: z.boolean().default(false),
    })




export default function AddProductPage() {
    const router = useRouter()
    const { t, locale } = useLanguage();
    const [images, setImages] = useState([]); // مصفوفة الروابط اللي هتيجي من Cloudinary
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState({ visible: false, type: "success", message: "" });


    const [uploadProgress, setUploadProgress] = useState(0); // نسبة التحميل من 0 لـ 100
    const [isUploading, setIsUploading] = useState(false); // هل فيه رفع شغال دلوقتي؟


    // const [previewImage, setPreviewImage] = useState(null); // حالة لصورة المعاينة

    // const [filetoUpload, setFileToUpload] = useState(null); //الملف اللي عيروح لـ Cloudinary




    //     const handleImageUpload = async (event) => {
    //     // 1. تحويل الـ FileList لمصفوفة عادية
    //     const files = Array.from(event.target.files);
    //     if (files.length === 0) return;

    //     // حالة تحميل (Loading) عشان نعرف إننا شغالين

    //     const options = {
    //         maxSizeMB: 1,
    //         maxWidthOrHeight: 1920,
    //         useWebWorker: true,
    //     };

    //     // نستخدم Loop عشان نعالج الصور بالترتيب
    //     for (const file of files) {
    //         try {
    //             // 2. ضغط الصورة الحالية
    //             const compressedFile = await imageCompression(file, options);

    //             // 3. تجهيز الـ FormData للرفع
    //             const formData = new FormData();
    //             formData.append("file", compressedFile);
    //             formData.append("upload_preset", "commode_present");

    //             // 4. الرفع لـ Cloudinary
    //             const response = await fetch(
    //                 `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    //                 { method: "POST", body: formData }
    //             );

    //             const data = await response.json();

    //             if (data.secure_url) {
    //                 // 5. إضافة رابط الصورة الجديد للمصفوفة الأصلية
    //                 setImages((prev) => [...prev, data.secure_url]);

    //                 // لو حابب تسجل الحجم عشان تراقبه
    //             }
    //         } catch (error) {
    //             console.error(`فشل في معالجة الصورة ${file.name}:`, error);
    //         }
    //     }
    // };


    const handleImageUpload = async (event) => {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;

        setIsUploading(true);
        setUploadProgress(0);

        // دالة داخلية لتحريك الشريط ببطء وهمي
        const simulateProgress = (start, end, duration) => {
            let current = start;
            const interval = setInterval(() => {
                current += 1;
                if (current >= end) {
                    clearInterval(interval);
                } else {
                    setUploadProgress(current);
                }
            }, duration / (end - start));
            return interval;
        };

        const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };

        for (let i = 0; i < files.length; i++) {
            // حرك الشريط وهمياً من بداية الصورة لحد 90% من وقت رفعها المتوقع
            const interval = simulateProgress(
                Math.round((i / files.length) * 100),
                Math.round(((i + 0.9) / files.length) * 100),
                2000 // افترض أن الصورة تأخذ ثانيتين
            );

            try {
                const file = files[i];
                const compressedFile = await imageCompression(file, options);
                const formData = new FormData();
                formData.append("file", compressedFile);
                formData.append("upload_preset", "commode_present");

                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    { method: "POST", body: formData }
                );

                const data = await response.json();
                clearInterval(interval); // وقف الوهمي أول ما الرد ييجي

                if (data.secure_url) {
                    setImages((prev) => [...prev, data.secure_url]);
                    setUploadProgress(Math.round(((i + 1) / files.length) * 100)); // قفزة للنسبة الحقيقية
                }
            } catch (error) {
                clearInterval(interval);
                console.error(`فشل الرفع:`, error);
            }
        }

        setTimeout(() => { setIsUploading(false); }, 1000);
    };


    const formSchema = getFormSchema(t);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { nameAr: "", nameEn: "", price: 0, descriptionAr: "", descriptionEn: "", stock: 1, discount: 0, category: "sofas", bestSeller: false },
    })

    const showToast = (type, message) => {
        setToast({ visible: true, type, message });
        setTimeout(() => {
            setToast((current) => ({ ...current, visible: false }));
        }, 3000);
    }

    // دالة لحذف صورة بعد رفعها
    const removeImage = (urlToRemove) => {
        setImages(images.filter((url) => url !== urlToRemove));
    };

    async function onSubmit(values) {
        if (images.length === 0) {
            showToast("error", t("admin.form.requireImage"));
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = { ...values, images: images };

            const response = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const responseData = await response.json();

            if (response.ok) {
                showToast("success", t("admin.form.addSuccess"));
                form.reset();
                setImages([]); // نصفر الصور بعد النجاح
                setTimeout(() => {
                    router.push("/admin/dashboard/products");
                }, 1500);
            } else {
                const errorMsg = responseData.error || responseData.message || "Failed to save item";
                console.error("API error:", errorMsg);
                showToast("error", errorMsg);
            }
        } catch (error) {
            console.error("Submit error:", error);
            showToast("error", error.message || "Error saving item");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="relative max-w-2xl mx-auto p-10 bg-white shadow-lg rounded-xl mt-10">
            {toast.visible && (
                <div
                    className={`fixed top-6 right-6 z-50 max-w-sm rounded-2xl px-4 py-3 text-white shadow-xl transition-opacity duration-300 ${toast.type === "success" ? "bg-amber-600" : "bg-rose-600"
                        }`}
                    role="status"
                    aria-live="polite"
                >
                    {toast.message}
                </div>
            )}

            <div className={`flex items-center justify-between mb-6 ${locale === "ar" ? "text-right" : "text-left"}`}>
                <div>
                    <h1 className="text-2xl font-bold">{t("admin.form.addProductTitle")}</h1>
                    <p className="text-sm text-gray-500 mt-2">{t("admin.form.addProductSubtitle")}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => router.back()}>
                    <ArrowLeft className="w-4 h-4 ml-2" />
                    {t("admin.form.back")}
                </Button>
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

                    {/* قسم رفع الصور من Cloudinary */}
                    <div className="space-y-3">
                        <FormLabel>{t("admin.form.uploadImages")}</FormLabel>

                        {/* عرض الصور اللي اترفعت (Preview) - خليه زي ما هو */}
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            {images.map((url, index) => (
                                <div key={index} className="relative aspect-square border rounded-lg overflow-hidden group">
                                    <img src={url} alt="product" className="object-cover w-full h-full" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(url)}
                                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Input الرفع المخفي والزرار الشيك */}
                        {/* Progress Bar Component */}
                        {isUploading && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 overflow-hidden">
                                <div
                                    className="bg-amber-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                                <p className="text-xs text-amber-600 mt-1 text-center font-medium">
                                    {uploadProgress === 100 ? "تم الرفع بنجاح!" : `جاري رفع الصور... ${uploadProgress}%`}
                                </p>
                            </div>
                        )}

                        {/* زرار الرفع اللي كان عندك */}
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="imageInput"
                            disabled={isUploading} // تعطيل الزرار أثناء الرفع
                        />
                        <label
                            htmlFor="imageInput"
                            className={`cursor-pointer inline-flex items-center gap-2 font-bold py-3 px-6 rounded-xl shadow-lg transition-all active:scale-95 ${isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-amber-600 hover:bg-amber-700 text-white"
                                }`}
                        >
                            <span>{isUploading ? "جاري المعالجة..." : `${t("admin.form.uploadNewImage")} 📸`}</span>
                        </label>
                    </div>

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

                    <Button type="submit" disabled={isSubmitting} className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                {t("admin.form.saveProduct")}...
                            </>
                        ) : (
                            t("admin.form.saveProduct")
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

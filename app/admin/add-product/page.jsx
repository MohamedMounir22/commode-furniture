"use client"

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
    name: z.string().min(2, { message: t("admin.form.errors.nameMin") }),
    price: z.coerce.number().min(1, { message: t("admin.form.errors.priceMin") }),
    description: z.string().min(10, { message: t("admin.form.errors.descriptionMin") }),
    discount: z.coerce.number()
      .min(0, { message: t("admin.form.errors.discountMin") })
      .max(100, { message: t("admin.form.errors.discountMax") }),
    category: z.enum(["dining", "sofas", "tables", "console"], {
      errorMap: () => ({ message: t("admin.form.errors.categoryRequired") }),
    }),
  })

export default function AddProductPage() {
    const router = useRouter()
    const { t, locale } = useLanguage();
    const [images, setImages] = useState([]); // مصفوفة الروابط اللي هتيجي من Cloudinary
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState({ visible: false, type: "success", message: "" });


    const [previewImage, setPreviewImage] = useState(null); // حالة لصورة المعاينة

    const [filetoUpload, setFileToUpload] = useState(null); //الملف اللي عيروح لـ Cloudinary


    // const handleImageUpload = async (event) => {
    //     const files = Array.from(event.target.files);

    //     files.forEach(async (file) => {
    //         // 1. الضغط (نفس الكود اللي فات)
    //         const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
    //         const compressedFile = await imageCompression(file, options);

    //         // طباعة الحجم في الـ Console
    //         console.log(`اسم الملف: ${compressedFile.name}`);
    //         console.log(`الحجم قبل الضغط: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
    //         console.log(`الحجم بعد الضغط: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);

    //         // 2. الرفع اليدوي لـ Cloudinary
    //         const formData = new FormData();
    //         formData.append("file", compressedFile);
    //         formData.append("upload_preset", "commode_present"); // الـ Preset بتاعك

    //         const response = await fetch(
    //             `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    //             { method: "POST", body: formData }
    //         );

    //         const data = await response.json();
    //         if (data.secure_url) {
    //             setImages((prev) => [...prev, data.secure_url]);
    //         }
    //     });
    // };
    const handleImageUpload = async (event) => {
    // 1. تحويل الـ FileList لمصفوفة عادية
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    // حالة تحميل (Loading) عشان نعرف إننا شغالين
    console.log(`بدأنا نضغط ونرفع ${files.length} صور...`);

    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    };

    // نستخدم Loop عشان نعالج الصور بالترتيب
    for (const file of files) {
        try {
            // 2. ضغط الصورة الحالية
            const compressedFile = await imageCompression(file, options);

            // 3. تجهيز الـ FormData للرفع
            const formData = new FormData();
            formData.append("file", compressedFile);
            formData.append("upload_preset", "commode_present");

            // 4. الرفع لـ Cloudinary
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                { method: "POST", body: formData }
            );

            const data = await response.json();

            if (data.secure_url) {
                // 5. إضافة رابط الصورة الجديد للمصفوفة الأصلية
                setImages((prev) => [...prev, data.secure_url]);

                // لو حابب تسجل الحجم عشان تراقبه
                console.log(`تم رفع ${file.name} بنجاح. الحجم: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);
            }
        } catch (error) {
            console.error(`فشل في معالجة الصورة ${file.name}:`, error);
        }
    }
};


    const formSchema = getFormSchema(t);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "", price: 0, description: "", discount: 0, category: "sofas" },
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
        const finalData = {
            ...values,
            images: images, // نبعت الروابط اللي اترفعت فعلاً
        };

        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalData),
            });

            if (response.ok) {
                showToast("success", t("admin.form.addSuccess"));
                form.reset();
                setImages([]); // نصفر الصور بعد النجاح
                setTimeout(() => {
                    router.push("/admin/dashboard/products");
                }, 700);
            } else {
                showToast("error", t("admin.form.failedSend"));
            }
        } catch (error) {
            console.error("Error:", error);
            showToast("error", t("admin.form.serverError"));
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="relative max-w-2xl mx-auto p-10 bg-white shadow-lg rounded-xl mt-10">
            {toast.visible && (
                <div
                    className={`fixed top-6 right-6 z-50 max-w-sm rounded-2xl px-4 py-3 text-white shadow-xl transition-opacity duration-300 ${toast.type === "success" ? "bg-emerald-600" : "bg-rose-600"
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

                    {/* اسم المنتج */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("admin.form.productName")}</FormLabel>
                                <FormControl><Input placeholder={t("admin.form.productNamePlaceholder")} {...field} /></FormControl>
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
                                    <select {...field} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500">
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
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="imageInput"
                        />
                        <label
                            htmlFor="imageInput"
                            className="cursor-pointer inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all active:scale-95"
                        >
                            <span>{t("admin.form.uploadNewImage")} 📸</span>
                        </label>
                    </div>

                    {/* الوصف */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("admin.form.description")}</FormLabel>
                                <FormControl><Textarea placeholder={t("admin.form.descriptionPlaceholder")} {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
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

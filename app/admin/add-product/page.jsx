"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, ImagePlus, Loader2, Trash2 } from "lucide-react"
import { CldUploadWidget } from 'next-cloudinary'; // ضفنا مكتبة الرفع
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
    name: z.string().min(2, { message: "اسم المنتج لازم يكون حرفين على الأقل" }),
    price: z.coerce.number().min(1, { message: "السعر لازم يكون أكبر من صفر" }),
    description: z.string().min(10, { message: "الوصف لازم يكون مفصل شوية" }),
    discount: z.coerce.number().min(0, { message: "الخصم لازم يكون 0 أو أكبر" }).max(100, { message: "الخصم مينفعش يكون أكبر من 100%" }),
    category: z.string().optional(),
})

export default function AddProductPage() {
    const router = useRouter()
    const [images, setImages] = useState([]); // مصفوفة الروابط اللي هتيجي من Cloudinary
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState({ visible: false, type: "success", message: "" });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "", price: 0, description: "", discount: 0, category: "furniture" },
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
            showToast("error", "⚠️ يا هندسة لازم ترفع صورة واحدة على الأقل للمنتج!");
            return;
        }

        setIsSubmitting(true);
        const finalData = {
            ...values,
            images: images, // نبعت الروابط اللي اترفعت فعلاً
        };

        try {
            const response = await fetch("/api/test-db", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalData),
            });

            if (response.ok) {
                showToast("success", "🎉 المنتج اتسيف بنجاح!");
                form.reset();
                setImages([]); // نصفر الصور بعد النجاح
                setTimeout(() => {
                    router.push("/admin/dashboard/products");
                }, 700);
            } else {
                showToast("error", "❌ حصلت مشكلة وأنا ببعت البيانات");
            }
        } catch (error) {
            console.error("Error:", error);
            showToast("error", "⚠️ السيرفر مش بيرد");
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

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-right">إضافة منتج جديد لـ "كومود" 🛋️</h1>
                    <p className="text-sm text-gray-500 mt-2 text-right">أضف منتج جديد وسيتم تحويلك إلى صفحة المنتجات بعد الحفظ.</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => router.back()}>
                    <ArrowLeft className="w-4 h-4 ml-2" />
                    رجوع
                </Button>
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

                    {/* قسم رفع الصور من Cloudinary */}
                    <div className="space-y-3">
                        <FormLabel>صور المنتج (ارفع من جهازك)</FormLabel>

                        {/* عرض صور الـ Preview */}
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

                        {/* الزرار السحري */}
                        <CldUploadWidget
                            uploadPreset="commode_present"
                            options={{
                                // 1. افتح الحجم للآخر (20 ميجا مثلاً)
                                maxFileSize: 20000000,

                                // 2. اسمح بأي نوع ملفات (صور، جيف، أي حاجة)
                                clientAllowedFormats: null,

                                // 3. اسمح برفع كذا صورة مع بعض (لحد 10 مثلاً)
                                multiple: true,
                                maxFiles: 10,

                                // 4. دي أهم واحدة: بتخلي السيرفر يقبل الملف "خام" من غير فحص
                                resourceType: "auto",

                                // 5. بتضيف الزراير اللي بتسهل الرفع (من الجهاز أو برابط)
                                sources: ['local', 'url', 'camera'],
                            }}
                            onSuccess={(result) => {
                                if (result.info && result.info.secure_url) {
                                    setImages((prev) => [...prev, result.info.secure_url]);
                                }
                            }}
                        >
                            {({ open }) => (
                                <button
                                    type="button"
                                    className="bg-slate-900 text-white px-4 py-2 rounded-lg"
                                    onClick={() => open()}
                                >
                                    ارفع أي صورة يا بطل 🚀
                                </button>
                            )}
                        </CldUploadWidget>
                    </div>

                    {/* الوصف */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>وصف المنتج</FormLabel>
                                <FormControl><Textarea placeholder="اكتب تفاصيل الخشب والقماش..." {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                جاري حفظ المنتج...
                            </>
                        ) : (
                            "حفظ المنتج في المخزن"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

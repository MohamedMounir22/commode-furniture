"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/context/LanguageProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import imageCompression from "browser-image-compression";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const getFormSchema = (locale) =>
  z.object({
    nameEn: z.string().min(2, locale === "ar" ? "الاسم الإنجليزي مطلوب" : "English name is required"),
    nameAr: z.string().min(2, locale === "ar" ? "الاسم العربي مطلوب" : "Arabic name is required"),
    locationEn: z.string().min(2, locale === "ar" ? "الموقع بالإنجليزي مطلوب" : "English location is required"),
    locationAr: z.string().min(2, locale === "ar" ? "الموقع بالعربي مطلوب" : "Arabic location is required"),
    dateEn: z.string().min(2, locale === "ar" ? "التاريخ بالإنجليزي مطلوب" : "English date is required"),
    dateAr: z.string().min(2, locale === "ar" ? "التاريخ بالعربي مطلوب" : "Arabic date is required"),
    image: z.string().min(1, locale === "ar" ? "يرجى رفع صورة" : "Please upload an image").url(),
  });

export default function LastDeliveredForm({ initialData = null, onSubmit }) {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    type: "success",
    message: "",
  });
  const [previewImage, setPreviewImage] = useState(initialData?.image || null);
  const [fileToUpload, setFileToUpload] = useState(null);


  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm({
    resolver: zodResolver(getFormSchema(locale)),
    defaultValues: initialData || {
      nameEn: "",
      nameAr: "",
      locationEn: "",
      locationAr: "",
      dateEn: "",
      dateAr: "",
      image: "",
    },
  });

// const handleImageChange = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setIsUploading(true);
//     setUploadProgress(0);

//     // دالة المحاكاة لجعل الشريط سلساً
//     const simulateProgress = (start, end, duration) => {
//         let current = start;
//         const interval = setInterval(() => {
//             current += 1;
//             if (current >= end) clearInterval(interval);
//             else setUploadProgress(current);
//         }, duration / (end - start));
//         return interval;
//     };

//     const interval = simulateProgress(0, 90, 1500);

//     try {
//         // 1. الضغط
//         const compressedFile = await imageCompression(file, {
//             maxSizeMB: 1,
//             maxWidthOrHeight: 1920,
//             useWebWorker: true,
//         });

//         // 2. تجهيز الـ FormData
//         const formData = new FormData();
//         formData.append("file", compressedFile);
//         formData.append("upload_preset", "commode_furniture");
//         formData.append("folder", "last-delivered");

//         // 3. الرفع
//         const res = await fetch(
//             `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//             { method: "POST", body: formData }
//         );

//         const data = await res.json();
//         clearInterval(interval);

//         if (data.secure_url) {
//             setUploadProgress(100);
//             form.setValue("image", data.secure_url);
//             setPreviewImage(data.secure_url);
//             showToast("success", "تم رفع الصورة بنجاح");
//         } else {
//             throw new Error(data.error?.message || "فشل الرفع");
//         }
//     } catch (error) {
//         clearInterval(interval);
//         showToast("error", error.message);
//     } finally {
//         setTimeout(() => {
//             setIsUploading(false);
//             setUploadProgress(0);
//         }, 1000);
//     }
// };


 const handleImageUpload = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            // Compress the image before uploading
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            };

            const compressedFile = await imageCompression(file, options);

            const formDataUpload = new FormData();
            formDataUpload.append("file", compressedFile);
            formDataUpload.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "commode_present");

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                { method: "POST", body: formDataUpload }
            );

            const data = await response.json();
            if (data.secure_url) {
                form.setValue("image", data.secure_url);
                setPreviewImage(data.secure_url);
                showToast("success", "تم رفع الصورة بنجاح");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setIsUploading(false);
        }
    };



  const showToast = (type, message) => {
    setToast({ visible: true, type, message });
    setTimeout(() => setToast({ visible: false, type: "", message: "" }), 3000);
  };




  const handleSubmit = async (data) => {
    // If we reach here, Zod has already validated the data

    setIsSubmitting(true);
    try {
      const payload = initialData ? { ...data, _id: initialData._id } : data;

      const response = await fetch("/api/last-delivered", {
        method: initialData ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (response.ok) {
        showToast(
          "success",
          initialData
            ? "Item updated successfully"
            : "Item added successfully"
        );
        setTimeout(() => {
          router.push("/admin/dashboard/last-delivered");
          router.refresh();
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
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Toast Notification */}
      {toast.visible && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            toast.type === "success"
              ? "bg-amber-100 text-amber-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Submission Checklist */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-semibold text-yellow-900 mb-3">Before you submit:</h3>
        <ul className="space-y-2 text-sm text-yellow-800">
          <li className={`flex items-center gap-2 ${form.watch("image") ? "text-amber-700" : ""}`}>
            <span>{form.watch("image") ? "✓" : "○"}</span> Upload image to Cloudinary
          </li>
          <li className={`flex items-center gap-2 ${form.watch("nameEn") && form.watch("nameAr") ? "text-amber-700" : ""}`}>
            <span>{form.watch("nameEn") && form.watch("nameAr") ? "✓" : "○"}</span> Fill English & Arabic names
          </li>
          <li className={`flex items-center gap-2 ${form.watch("locationEn") && form.watch("locationAr") ? "text-amber-700" : ""}`}>
            <span>{form.watch("locationEn") && form.watch("locationAr") ? "✓" : "○"}</span> Fill English & Arabic locations
          </li>
          <li className={`flex items-center gap-2 ${form.watch("dateEn") && form.watch("dateAr") ? "text-amber-700" : ""}`}>
            <span>{form.watch("dateEn") && form.watch("dateAr") ? "✓" : "○"}</span> Fill English & Arabic dates
          </li>
        </ul>
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 hover:from-amber-100 hover:to-amber-200 transition-all duration-300 shadow-sm hover:shadow-md group"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Image Upload */}
          {/* <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <div className="space-y-4 p-4 border border-dashed rounded-lg">
                  {previewImage && (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      {fileToUpload && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={handleUploadImage}
                            disabled={isSubmitting}
                            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded"
                          >
                            {isSubmitting ? "Uploading..." : "Upload"}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  <FormControl>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={isSubmitting}
                      className="block w-full text-sm text-gray-600"
                    />
                  </FormControl>
                  {field.value && !fileToUpload && (
                    <p className="text-xs text-amber-600">✓ Image uploaded successfully</p>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
  control={form.control}
  name="image"
  render={({ field }) => (
    <FormItem>
      <FormLabel>الصورة</FormLabel>
      <div className="space-y-4 p-4 border border-dashed rounded-lg bg-white">
        {/* شريط التحميل */}
        {isUploading && (
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden mb-2">
            <div
              className="bg-amber-600 h-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

        {previewImage && (
          <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-50 border">
            <Image
              fill
              src={previewImage}
              alt="Preview"
              className="object-cover"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-amber-600 animate-spin" />
              </div>
            )}
          </div>
        )}

        <FormControl>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 cursor-pointer"
          />
        </FormControl>
        {field.value && !isUploading && (
          <p className="text-xs text-amber-600 font-medium">✓ تم تحديث رابط الصورة بنجاح</p>
        )}
      </div>
      <FormMessage />
    </FormItem>
  )}
/>

          {/* English Inputs */}
          <div className="space-y-4 p-4 border rounded-lg bg-amber-50">
            <h3 className="font-semibold text-gray-900">English (EN)</h3>

            <FormField
              control={form.control}
              name="nameEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name (English)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name in English" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="locationEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location (English)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Maadi, Cairo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date (English)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 2 days ago" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Arabic Inputs */}
          <div className="space-y-4 p-4 border rounded-lg bg-amber-50">
            <h3 className="font-semibold text-gray-900">Arabic (AR)</h3>

            <FormField
              control={form.control}
              name="nameAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name (Arabic)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="أدخل اسم المنتج بالعربية"
                      dir="rtl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="locationAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location (Arabic)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="مثال: المعادي، القاهرة"
                      dir="rtl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date (Arabic)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="مثال: قبل يومين"
                      dir="rtl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-amber-600 hover:bg-amber-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : initialData ? (
                "Update Item"
              ) : (
                "Add Item"
              )}
            </Button>
            <Button
              type="button"
              onClick={() => router.back()}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
